import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import FrutosSecos from './components/FrutosSecos';
import Login from './components/Login'; 
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import CrudProductos from './components/CrudProductos';
import FrutosRojos from './components/FrutosRojos';
import Chocolates from './components/Chocolates';
import { CartProvider } from './components/CartContext';
import Carrito from './components/Carrito';

// 🔥 IMPORTACIÓN NUEVA PARA LA BÚSQUEDA GLOBAL
import { SearchProvider } from './components/SearchContext';

function App() {
  return (
    <SearchProvider>       {/* 🔥 Envolvemos toda la app */}
      <CartProvider>       {/* Mantiene el carrito funcionando */}
        <Router>
          <Header />
          <Routes >         
            <Route path="/administracion" element={<Login />} />
            <Route path="/carousel" element={<Carousel />} />
            <Route path="/" element={<Home />} />
            <Route path="/frutos-secos" element={<FrutosSecos />} />
            <Route path="/frutos-rojos" element={<FrutosRojos />} />
            <Route path="/Chocolates" element={<Chocolates />} />
            <Route path="/crud" element={<CrudProductos />} />
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </SearchProvider>
  );
}

export default App;

