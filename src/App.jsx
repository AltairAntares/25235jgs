import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Productos from './components/Products';
import FrutosSecos from './components/FrutosSecos';
import Login from './components/Login'; 
import Footer from './components/Footer';
import Home from './components/Home';
import CrudProductos from './components/CrudProductos';
import FrutosRojos from './components/FrutosRojos';
import Chocolates from './components/Chocolates';
import { CartProvider } from './components/CartContext';
import Carrito from './components/Carrito';

// IMPORTACIÓN NUEVA PARA LA BÚSQUEDA GLOBAL
import { SearchProvider } from './components/SearchContext';

function App() {
  return (
    <SearchProvider>
      <CartProvider>
        
        {/* NOTA: el BrowserRouter con basename debe estar en main.jsx */}
        
        <Router>
          <Header />

          <Routes>

            {/* ⭐ HOME PARA GITHUB PAGES */}
            <Route index element={<Home />} />

            {/* OTRAS RUTAS SIN "/" AL INICIO */}
            <Route path="administracion" element={<Login />} />
            <Route path="productos" element={<Productos />} />
            <Route path="frutos-secos" element={<FrutosSecos />} />
            <Route path="frutos-rojos" element={<FrutosRojos />} />
            <Route path="chocolates" element={<Chocolates />} />
            <Route path="crud" element={<CrudProductos />} />
            <Route path="carrito" element={<Carrito />} />

            {/* CATCH-ALL */}
            <Route path="*" element={<Home />} />

          </Routes>

          <Footer />
        </Router>

      </CartProvider>
    </SearchProvider>
  );
}

export default App;


