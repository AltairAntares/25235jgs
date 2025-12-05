import React, { useEffect, useState, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { CartContext } from './CartContext';
import { SearchContext } from './SearchContext'; 


const ProductList = ({ category = null }) =>  {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { agregarAlCarrito } = useContext(CartContext);

  // 🔥 OBTENER VALOR BUSCADO DESDE EL HEADER
  const { search } = useContext(SearchContext);

  useEffect(() => {
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

  // 🔍 FILTRAR PRODUCTOS SEGÚN BÚSQUEDA
  const productosFiltrados = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase()) ||
    product.description.toLowerCase().includes(search.toLowerCase()) // 🔥 también busca en descripción
  );

  return (
    <Row>
      {productosFiltrados.length > 0 ? (
        productosFiltrados.map((product) => (
          <Col md={4} key={product.id} className="mb-4">
            <ProductCard 
              product={product} 
              agregarAlCarrito={agregarAlCarrito}
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
