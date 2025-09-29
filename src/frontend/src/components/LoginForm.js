import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(form);
  };

  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Admin Login</h3>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} style={inp} />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} style={inp} />
        <button type="submit" style={{ background: '#3b82f6', color: '#fff', border: 0, padding: '0.6rem 1rem', borderRadius: 8, cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  );
};

const inp = { border: '1px solid #e5e7eb', borderRadius: 8, padding: '0.6rem 0.8rem' };

export default LoginForm;
