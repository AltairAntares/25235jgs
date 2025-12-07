import React, { useEffect, useState, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { CartContext } from './CartContext';
import { SearchContext } from './SearchContext'; 


const ProductList = ({ category = null }) =>  {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. OBTENER EL ESTADO 'carrito', 'agregarAlCarrito' Y AHORA 'restarDelCarrito' DEL CONTEXTO
  const { carrito, agregarAlCarrito, restarDelCarrito } = useContext(CartContext); 

  // Obtener valor de búsqueda (sin cambios)
  const { search } = useContext(SearchContext);

  useEffect(() => {
    // ... (Lógica de fetch sin cambios)
    let url = 'https://692c695dc829d464006f7fad.mockapi.io/products';

    if (category) {
      url += `?category=${category}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [category]);

  if (loading) return <div>Loading...</div>;

  // 🔍 FILTRAR PRODUCTOS SEGÚN BÚSQUEDA (sin cambios)
  const productosFiltrados = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase()) ||
    product.description.toLowerCase().includes(search.toLowerCase()) 
  );
  
  // 2. FUNCIÓN PARA OBTENER LA CANTIDAD ESPECÍFICA (sin cambios)
  const obtenerCantidadEnCarrito = (productId) => {
    // Busca el producto por ID dentro del array 'carrito'
    const itemEnCarrito = carrito.find(item => item.id === productId);
    // Devuelve la cantidad, o 0 si el producto no está en el carrito
    return itemEnCarrito ? itemEnCarrito.cantidad : 0;
  };

  return (
    <Row>
      {productosFiltrados.length > 0 ? (
        productosFiltrados.map((product) => (
          <Col md={4} key={product.id} className="mb-4">
            {/* 3. PASAR LAS PROPS NECESARIAS AL PRODUCT CARD */}
            <ProductCard 
              product={product} 
              agregarAlCarrito={agregarAlCarrito}
              restarDelCarrito={restarDelCarrito} // 👈 ¡CORRECCIÓN! Pasar la función de resta
              cantidadEnCarrito={obtenerCantidadEnCarrito(product.id)}
            />
          </Col>
        ))
      ) : (
        <h4 className="text-center mt-5">No se encontraron productos 😢</h4>
      )}
    </Row>
  );
};

export default ProductList;