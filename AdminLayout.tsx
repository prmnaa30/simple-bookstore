import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Tendang ke halaman login jika tidak ada token
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', background: '#2c3e50', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', fontSize: '20px', fontWeight: 'bold', borderBottom: '1px solid #34495e' }}>
          Simple Bookstore
        </div>
        <nav style={{ flex: 1, padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link to="/admin" style={{ color: 'white', textDecoration: 'none', padding: '10px 20px', display: 'block' }}>Dashboard</Link>
          <Link to="/admin/books/add" style={{ color: 'white', textDecoration: 'none', padding: '10px 20px', display: 'block' }}>Tambah Buku</Link>
          <Link to="/" style={{ color: '#bdc3c7', textDecoration: 'none', padding: '10px 20px', display: 'block' }}>Katalog Publik</Link>
        </nav>
        <button onClick={handleLogout} style={{ margin: '20px', padding: '10px', background: '#e74c3c', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
          Logout
        </button>
      </div>

      {/* Konten Utama */}
      <div style={{ flex: 1, background: '#f5f6fa', overflowY: 'auto' }}>
        <Outlet />
      </div>
    </div>
  );
};