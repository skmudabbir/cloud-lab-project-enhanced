import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';
import LoginForm from './components/LoginForm';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [books, setBooks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/books`);
      setBooks(response.data.books);
    } catch (error) {
      toast.error('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE}/login`, credentials);
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setIsLoggedIn(true);
      toast.success('Login successful');
    } catch (error) {
      toast.error('Login failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setIsLoggedIn(false);
    toast.info('Logged out');
  };

  const handleAddBook = async (bookData) => {
    try {
      await axios.post(`${API_BASE}/books`, bookData);
      toast.success('Book added successfully');
      fetchBooks();
    } catch (error) {
      toast.error('Failed to add book');
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`${API_BASE}/books/${bookId}`);
        toast.success('Book deleted successfully');
        fetchBooks();
      } catch (error) {
        toast.error('Failed to delete book');
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
        <header style={{ background: '#fff', borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111827' }}>📚 Book Library</h1>
            {isLoggedIn && (
              <button onClick={handleLogout} style={{ background: '#ef4444', color: '#fff', border: 0, padding: '0.5rem 1rem', borderRadius: 8, cursor: 'pointer' }}>
                Logout
              </button>
            )}
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
          <div>
            <BookList books={books} loading={loading} onDeleteBook={handleDeleteBook} isLoggedIn={isLoggedIn} />
          </div>
          <div>
            {!isLoggedIn ? (
              <LoginForm onLogin={handleLogin} />
            ) : (
              <AddBookForm onAddBook={handleAddBook} />
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
