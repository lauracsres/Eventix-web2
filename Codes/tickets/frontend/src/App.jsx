import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home, Calendar, ShoppingCart, PlusCircle, Users as UsersIcon } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Sales from './pages/Sales';
import CreateSale from './pages/CreateSale';
import Users from './pages/Users';

function Layout({ children }) {
  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">
          <ShoppingCart color="#58a6ff" />
          <span className="gradient-text">Eventix</span>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-item"><Home size={18} /> Dashboard</Link>
          <Link to="/events" className="nav-item"><Calendar size={18} /> Eventos</Link>
          <Link to="/users" className="nav-item"><UsersIcon size={18} /> Usuários</Link>
          <Link to="/sales" className="nav-item"><ShoppingCart size={18} /> Vendas</Link>
          <Link to="/sales/new" className="nav-item"><PlusCircle size={18} /> Nova Venda</Link>
        </div>
      </nav>
      <main className="container">
        {children}
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/users" element={<Users />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/sales/new" element={<CreateSale />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
