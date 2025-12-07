import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// 🚀 Aceptamos la nueva prop: restarDelCarrito
const ProductCard = ({ product, agregarAlCarrito, cantidadEnCarrito = 0, restarDelCarrito }) => {
  const [isHovered, setIsHovered] = useState(false);

  // ... (Variables de estilo, se vuelven opcionales con el cambio de estructura)
  const buttonBgColor = cantidadEnCarrito > 0 
    ? "var(--color-secondary)" // Ya no se usa directamente el color de fondo para el botón principal
    : "var(--color-primary)";

  const buttonBorderColor = cantidadEnCarrito > 0 
    ? "var(--color-secondary)" 
    : "var(--color-primary)";

  return (
    <Card
      // ... (Estilos de Card sin cambios)
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

      {/* Imagen (sin cambios) */}
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
        
        {/* 🔄 LÓGICA CONDICIONAL DE BOTONES Y CONTADOR */}
        {cantidadEnCarrito === 0 ? (
            // Opción 1: No hay unidades en el carrito
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
                              <span style={{ fontWeight: "700", fontSize: "1.1rem", color: "var(--color-accent)" }}>
                    {/* 🚀 ÍCONO AÑADIDO JUSTO ANTES DEL TEXTO */}
                    <FontAwesomeIcon        
                      icon={faShoppingCart} 
                      size="sm" 
                      style={{ 
                          marginRight: '8px', 
                          // 🚀 CAMBIO APLICADO AQUÍ
                          color: 'var(--color-text)' 
                      }}
                    />
                    Agregar al carrito
                  </span>
              <span style={{ fontWeight: "700" }}>${product.price}</span>
            </Button>
        ) : (
            // Opción 2: Ya hay unidades, mostrar control de cantidad
            <div className="d-flex align-items-center justify-content-between mt-auto">
                {/* ➖ BOTÓN RESTAR (Nuevo) */}
                <Button 
                    onClick={() => restarDelCarrito(product.id)}
                    style={{ 
                        backgroundColor: "var(--color-rest)",
                        borderColor: "var(--color-secondary)",
                        color: "var(--color-accent)",
                        borderRadius: "10px", 
                        padding: "0.5rem 1rem", 
                        fontWeight: "700",
                        fontSize: "1.2rem"
                    }}
                >
                    -
                </Button>
                
                {/* Indicador de Cantidad */}
                <span style={{ fontWeight: "700", fontSize: "1.1rem", color: "var(--color-accent)" }}>
                    {/* 🚀 ÍCONO AÑADIDO JUSTO ANTES DEL TEXTO */}
                    <FontAwesomeIcon        
                      icon={faShoppingCart} 
                      size="sm" 
                      style={{ 
                          marginRight: '8px', 
                          // 🚀 CAMBIO APLICADO AQUÍ
                          color: 'var(--color-text)' 
                      }}
                    />
                    {cantidadEnCarrito} en carrito
                  </span>
                    
                {/* ➕ BOTÓN AGREGAR MÁS (Usamos el color primario/secundario) */}
                <Button 
                    onClick={() => agregarAlCarrito(product)}
                    style={{ 
                        backgroundColor: "var(--color-primary)",
                        borderColor: "var(--color-secondary)",
                        color: "var(--color-accent)",
                        borderRadius: "10px", 
                        padding: "0.5rem 1rem", 
                        fontWeight: "700",
                        fontSize: "1.2rem"
                    }}
                >
                  +
                </Button>
            </div>
        )}

      </Card.Body>
    </Card>
  );
};

export default ProductCard;