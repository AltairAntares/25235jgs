import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product, agregarAlCarrito }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="h-100 d-flex flex-column border-2 border-warning"
      style={{ 
        height: '200px',
        width: '300px', 
        objectFit: 'cover',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.3s ease, box-shadow 3s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        className="card-img-top img-fluid" 
        style={{ height: '200px', objectFit: 'cover' }} 
      />
      
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.title}</Card.Title>
        <Card.Text className="mt-auto">
          {product.description.slice(0, 100)}...
        </Card.Text>

        <Button
          onClick={() => agregarAlCarrito(product)}
          className="mt-auto d-flex justify-content-between align-items-center"
          style={{
            backgroundColor: "#f3ce88ff",
            borderColor: "#f3ce88ff",
            color: "black",
            gap: "10px"
          }}
        >
          <span>Agregar al carrito</span>
          <span style={{ fontWeight: "bold" }}>${product.price}</span>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;