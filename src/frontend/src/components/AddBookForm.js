import React, { useState } from 'react';

const AddBookForm = ({ onAddBook }) => {
  const [form, setForm] = useState({ name: '', author: '', price: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.author || !form.price) return;
    const payload = { ...form, price: parseFloat(form.price) };
    onAddBook(payload);
    setForm({ name: '', author: '', price: '' });
  };

  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Add a new book</h3>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <input name="name" placeholder="Book name" value={form.name} onChange={handleChange} style={inp} />
        <input name="author" placeholder="Author" value={form.author} onChange={handleChange} style={inp} />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} style={inp} />
        <button type="submit" style={{ background: '#10b981', color: '#fff', border: 0, padding: '0.6rem 1rem', borderRadius: 8, cursor: 'pointer' }}>Add Book</button>
      </form>
    </div>
  );
};

const inp = { border: '1px solid #e5e7eb', borderRadius: 8, padding: '0.6rem 0.8rem' };

export default AddBookForm;
