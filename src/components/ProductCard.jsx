import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// 🚀 Aceptamos las props: product, agregarAlCarrito, cantidadEnCarrito, restarDelCarrito
const ProductCard = ({ product, agregarAlCarrito, cantidadEnCarrito = 0, restarDelCarrito }) => {
    const [isHovered, setIsHovered] = useState(false);

    // 🚀 LÓGICA DE MANEJO DE STOCK
    // Convertimos a número para seguridad, asumiendo 0 si es nulo
    const stockTotal = Number(product.stock) || 0; 
    
    // 1. Condición: No queda más stock ni en carrito ni en la tienda
    const noHayStockDisponible = stockTotal <= 0;
    
    // 2. Condición: Se alcanzó el límite del stock total
    const stockAlcanzado = cantidadEnCarrito >= stockTotal;
    
    // NOTA: Las variables de color existentes ya no son necesarias y se han omitido en la revisión.

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

            {/* Imagen, Título y Texto (sin cambios) */}
            <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                style={{ height: "210px", objectFit: "cover" }}
            />

            <Card.Body className="d-flex flex-column" style={{ padding: "1rem" }}>
                <Card.Title
                    style={{ color: "var(--color-accent)", fontWeight: "700", fontSize: "1.2rem" }}
                >
                    {product.title}
                </Card.Title>

                <Card.Text
                    style={{ flexGrow: 1, color: "var(--color-text)", fontSize: "0.95rem" }}
                >
                    {product.description.slice(0, 100)}...
                </Card.Text>

                {/* 🚨 INDICADOR VISUAL DE STOCK */}
                {noHayStockDisponible && cantidadEnCarrito === 0 && (
                    <div className="mb-2 text-center" style={{ color: "red", fontWeight: "bold", fontSize: "1.05rem" }}>
                        ¡PRODUCTO AGOTADO! 😭
                    </div>
                )}
                
                {/* 🔄 LÓGICA CONDICIONAL DE BOTONES Y CONTADOR */}
                {cantidadEnCarrito === 0 ? (
                    // Opción 1: No hay unidades en el carrito
                    <Button
                        onClick={() => agregarAlCarrito(product)}
                        className="mt-auto"
                        // 🔑 DESHABILITAR si el stock total es 0
                        disabled={noHayStockDisponible} 
                        style={{
                            backgroundColor: "var(--color-primary)",
                            borderColor: "var(--color-primary)",
                            color: "var(--color-accent)",
                            borderRadius: "10px",
                            fontWeight: "600",
                            padding: "0.65rem 1rem",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            // Opcional: Estilo visual para deshabilitado
                            opacity: noHayStockDisponible ? 0.6 : 1, 
                            cursor: noHayStockDisponible ? 'not-allowed' : 'pointer'
                        }}
                    >
                        <span style={{ fontWeight: "700", fontSize: "1.1rem", color: "var(--color-accent)" }}>
                            <FontAwesomeIcon        
                                icon={faShoppingCart} 
                                size="sm" 
                                style={{ marginRight: '8px', color: 'var(--color-text)' }}
                            />
                            {/* 🚀 Mostrar texto condicional */}
                            {noHayStockDisponible ? 'AGOTADO' : 'Agregar al carrito'}
                        </span>
                        <span style={{ fontWeight: "700" }}>${product.price}</span>
                    </Button>
                ) : (
                    // Opción 2: Ya hay unidades, mostrar control de cantidad
                    <div className="d-flex align-items-center justify-content-between mt-auto">
                        
                        {/* ➖ BOTÓN RESTAR */}
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
                        <span 
                            style={{ 
                                fontWeight: "700", 
                                fontSize: "1.1rem", 
                                // 🚨 Resaltar en rojo si se alcanzó el stock máximo
                                color: stockAlcanzado ? "red" : "var(--color-accent)"
                            }}
                        >
                            <FontAwesomeIcon        
                                icon={faShoppingCart} 
                                size="sm" 
                                style={{ marginRight: '8px', color: 'var(--color-text)' }}
                            />
                            {cantidadEnCarrito} {stockAlcanzado ? '¡MÁXIMO!' : 'en carrito'}
                        </span>
                            
                        {/* ➕ BOTÓN AGREGAR MÁS */}
                        <Button 
                            onClick={() => agregarAlCarrito(product)}
                            // 🔑 DESHABILITAR si se alcanzó el stock (cantidad en carrito igual al stock total)
                            disabled={stockAlcanzado}
                            style={{ 
                                backgroundColor: "var(--color-primary)",
                                borderColor: "var(--color-secondary)",
                                color: "var(--color-accent)",
                                borderRadius: "10px", 
                                padding: "0.5rem 1rem", 
                                fontWeight: "700",
                                fontSize: "1.2rem",
                                // Opcional: Estilo visual para deshabilitado
                                opacity: stockAlcanzado ? 0.6 : 1,
                                cursor: stockAlcanzado ? 'not-allowed' : 'pointer'
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