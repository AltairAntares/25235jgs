import React, { useEffect, useState, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { CartContext } from './CartContext';

const ProductList = ({ category = null }) =>  {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 ESTA ES LA FUNCIÓN VERDADERA DEL CARRITO
  const { agregarAlCarrito } = useContext(CartContext);

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

  return (
    <Row>
      {products.map((product) => (
        <Col md={4} key={product.id} className="mb-4">
          <ProductCard 
            product={product} 
            agregarAlCarrito={agregarAlCarrito}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
