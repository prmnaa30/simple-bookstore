import React, { useState, useEffect } from 'react';
import type { Book } from '../types';

export const BookCatalog: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books');
        if (!response.ok) throw new Error('Gagal mengambil data buku');
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError('Belum bisa memuat buku. Pastikan backend sudah menyala.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Loading katalog buku...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>📚 Katalog Buku Simple Bookstore</h1>
      {books.length === 0 ? (
        <p>Belum ada buku di katalog.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {books.map((book) => (
            <div key={book.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', textAlign: 'center', background: 'white' }}>
              <img 
                src={book.coverImage || 'https://via.placeholder.com/150?text=No+Cover'} 
                alt={book.title} 
                style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '4px' }} 
              />
              <h3 style={{ margin: '10px 0' }}>{book.title}</h3>
              <p style={{ color: '#555', margin: '5px 0' }}>{book.author}</p>
              <p style={{ fontWeight: 'bold', margin: '10px 0', color: '#27ae60' }}>
                Rp {book.price.toLocaleString('id-ID')}
              </p>
              <p style={{ fontSize: '12px', color: '#7f8c8d' }}>{book.description.substring(0, 50)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};