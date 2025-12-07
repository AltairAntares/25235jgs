import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // Cargar carrito desde localStorage al iniciar
  const [carrito, setCarrito] = useState(() => {
    const storedCart = localStorage.getItem("carrito");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find(item => item.id === producto.id);

      if (existe) {
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  // 🚀 NUEVA FUNCIÓN: Restar una unidad del carrito
  const restarDelCarrito = (id) => {
    setCarrito((prevCarrito) => {
      const itemAfectado = prevCarrito.find(item => item.id === id);

      if (itemAfectado) {
        if (itemAfectado.cantidad > 1) {
          // Restar 1 unidad
          return prevCarrito.map(item =>
            item.id === id
              ? { ...item, cantidad: item.cantidad - 1 }
              : item
          );
        } else {
          // Si la cantidad es 1, eliminar completamente el producto
          return prevCarrito.filter(item => item.id !== id);
        }
      }
      return prevCarrito; // No hacer nada si no se encuentra
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        setCarrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        restarDelCarrito // 👈 EXPONER LA NUEVA FUNCIÓN
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
