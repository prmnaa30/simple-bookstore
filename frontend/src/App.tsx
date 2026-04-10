// frontend/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookCatalog } from './components/BookCatalog';
import { Login } from './pages/Login';
import { AdminLayout } from './components/AdminLayout';
import { BookForm } from './pages/BookForm';

function App() {
  return (
    <Router>
      <Routes>
        {/* feat/fe-book-catalog-ui & integration */}
        <Route path="/" element={<BookCatalog />} />
        
        {/* feat/fe-auth-ui & integration */}
        <Route path="/login" element={<Login />} />

        {/* feat/fe-admin-dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<div style={{ padding: '30px' }}><h2>Selamat datang di Dashboard Admin</h2></div>} />
          {/* feat/fe-book-form-ui & fe-book-crud-integration */}
          <Route path="books/add" element={<BookForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;