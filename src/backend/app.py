# src/backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os
from datetime import datetime
import redis
import jwt
from functools import wraps

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379')
    JWT_SECRET = os.getenv('JWT_SECRET', 'jwt-secret')
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_USER = os.getenv('DB_USER', 'user')
    DB_PASSWORD = os.getenv('DB_PASSWORD', 'password')
    DB_NAME = os.getenv('DB_NAME', 'bookdb')
    DB_PORT = int(os.getenv('DB_PORT', '3306'))

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Redis
redis_client = redis.from_url(app.config['REDIS_URL'])

def get_db_connection():
    return mysql.connector.connect(
        host=app.config['DB_HOST'],
        user=app.config['DB_USER'],
        password=app.config['DB_PASSWORD'],
        database=app.config['DB_NAME'],
        port=app.config['DB_PORT']
    )

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        try:
            scheme, j = token.split()
            data = jwt.decode(j, app.config['JWT_SECRET'], algorithms=['HS256'])
        except Exception as e:
            return jsonify({'message': 'Token is invalid', 'error': str(e)}), 401
        return f(*args, **kwargs)
    return decorated

@app.route('/health', methods=['GET'])
def health_check():
    try:
        conn = get_db_connection()
        conn.close()
        return jsonify({'status': 'healthy', 'timestamp': datetime.utcnow().isoformat()}), 200
    except Exception as e:
        return jsonify({'status': 'unhealthy', 'error': str(e)}), 500

@app.route('/api/books', methods=['GET'])
def get_books():
    cache_key = 'all_books'
    cached_books = redis_client.get(cache_key)
    if cached_books:
        import json
        return jsonify({'books': json.loads(cached_books), 'source': 'cache'}), 200
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM book")
        books = cursor.fetchall()
        conn.close()
        import json
        redis_client.setex(cache_key, 300, json.dumps(books))
        return jsonify({'books': books, 'source': 'database'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/books', methods=['POST'])
@token_required
def add_book():
    data = request.json or {}
    for f in ['name', 'author', 'price']:
        if f not in data:
            return jsonify({'error': f'Missing required field: {f}'}), 400
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO book (name, author, price) VALUES (%s, %s, %s)",
            (data['name'], data['author'], data['price'])
        )
        conn.commit()
        book_id = cursor.lastrowid
        conn.close()
        redis_client.delete('all_books')
        return jsonify({'message': 'Book added successfully', 'id': book_id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/books/<int:book_id>', methods=['DELETE'])
@token_required
def delete_book(book_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM book WHERE bookid=%s", (book_id,))
        conn.commit()
        conn.close()
        redis_client.delete('all_books')
        return jsonify({'message': 'Book deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/books/<int:book_id>', methods=['PUT'])
@token_required
def update_book(book_id):
    data = request.json or {}
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE book SET name=%s, author=%s, price=%s WHERE bookid=%s",
            (data.get('name'), data.get('author'), data.get('price'), book_id)
        )
        conn.commit()
        conn.close()
        redis_client.delete('all_books')
        return jsonify({'message': 'Book updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json or {}
    if data.get('username') == 'admin' and data.get('password') == 'password':
        token = jwt.encode({'user': 'admin'}, app.config['JWT_SECRET'], algorithm='HS256')
        return jsonify({'token': token}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
