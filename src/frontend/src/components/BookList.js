import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, loading, onDeleteBook, isLoggedIn }) => {
  if (loading) {
    return (
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <div>Loading…</div>
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
        Book Collection ({books.length} books)
      </h2>
      {books.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>No books found. Add some books to get started!</div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {books.map((book) => (
            <BookCard key={book.bookid} book={book} onDelete={onDeleteBook} canDelete={isLoggedIn} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
