import React from 'react';

const BookCard = ({ book, onDelete, canDelete }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb', borderRadius: 10, padding: 16, border: '1px solid #e5e7eb' }}>
      <div>
        <div style={{ fontWeight: 700 }}>{book.name}</div>
        <div style={{ color: '#6b7280', fontSize: 14 }}>by {book.author}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontWeight: 700 }}>${book.price}</div>
        {canDelete && (
          <button onClick={() => onDelete(book.bookid)} style={{ background: '#ef4444', color: '#fff', border: 0, padding: '0.4rem 0.75rem', borderRadius: 8, cursor: 'pointer' }}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
