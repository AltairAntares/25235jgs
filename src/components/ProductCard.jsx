import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product, agregarAlCarrito }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="h-100 d-flex flex-column shadow-sm"
      style={{
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "var(--color-bg)",
        border: "1px solid rgba(0,0,0,0.08)",
        transform: isHovered ? "translateY(-6px) scale(1.02)" : "scale(1)",
        boxShadow: isHovered
          ? "0 8px 22px rgba(0,0,0,0.18)"
          : "0 2px 10px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* Imagen */}
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        style={{
          height: "210px",
          objectFit: "cover"
        }}
      />

      {/* Contenido */}
      <Card.Body className="d-flex flex-column" style={{ padding: "1rem" }}>
        <Card.Title
          style={{
            color: "var(--color-accent)",
            fontWeight: "700",
            fontSize: "1.2rem"
          }}
        >
          {product.title}
        </Card.Title>

        <Card.Text
          style={{
            flexGrow: 1,
            color: "var(--color-text)",
            fontSize: "0.95rem"
          }}
        >
          {product.description.slice(0, 100)}...
        </Card.Text>

        {/* Botón */}
        <Button
          onClick={() => agregarAlCarrito(product)}
          className="mt-auto"
          style={{
            backgroundColor: "var(--color-primary)",
            borderColor: "var(--color-primary)",
            color: "var(--color-accent)",
            borderRadius: "10px",
            fontWeight: "600",
            padding: "0.65rem 1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <span>Agregar al carrito</span>
          <span style={{ fontWeight: "700" }}>${product.price}</span>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;

