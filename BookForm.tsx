import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const BookForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', author: '', price: '', description: '', coverImage: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ ...formData, price: Number(formData.price) })
      });

      if (response.ok) {
        alert('Buku berhasil ditambahkan!');
        navigate('/admin');
      } else {
        const errorData = await response.json();
        alert(`Gagal: ${errorData.message}`);
      }
    } catch (error) {
      alert('Gagal terhubung ke server backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Tambah Buku Baru</h2>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px', maxWidth: '500px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Judul Buku</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '8px' }} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Penulis</label>
            <input type="text" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} style={{ width: '100%', padding: '8px' }} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Harga (Rp)</label>
            <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} style={{ width: '100%', padding: '8px' }} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>URL Cover Buku (Opsional)</label>
            <input type="text" value={formData.coverImage} onChange={(e) => setFormData({...formData, coverImage: e.target.value})} style={{ width: '100%', padding: '8px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Deskripsi</label>
            <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '8px', minHeight: '100px' }} required />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '10px 20px', background: loading ? '#95a5a6' : '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', alignSelf: 'flex-start' }}>
            {loading ? 'Menyimpan...' : 'Simpan Buku'}
          </button>
        </form>
      </div>
    </div>
  );
};