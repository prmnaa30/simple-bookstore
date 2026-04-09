// frontend/src/components/BookCatalog.tsx
import React, { useState, useEffect } from 'react';
import type { Book } from '../types';

const MOCK_BOOKS: Book[] = [
  {
    id: 1,
    title: "The TypeScript Handbook",
    author: "Microsoft",
    price: 150000,
    coverImage: "https://via.placeholder.com/150",
    description: "Panduan lengkap untuk belajar TypeScript."
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 250000,
    coverImage: "https://via.placeholder.com/150",
    description: "A Handbook of Agile Software Craftsmanship."
  }
];

export const BookCatalog: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setBooks(MOCK_BOOKS);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>📚 Katalog Buku Simple Bookstore</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {books.map((book) => (
          <div key={book.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', textAlign: 'center' }}>
            <img src={book.coverImage} alt={book.title} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
            <h3 style={{ margin: '10px 0' }}>{book.title}</h3>
            <p style={{ color: '#555', margin: '5px 0' }}>{book.author}</p>
            <p style={{ fontWeight: 'bold', margin: '10px 0' }}>
              Rp {book.price.toLocaleString('id-ID')}
            </p>
            <button style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Lihat Detail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};