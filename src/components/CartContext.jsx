import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

// URL de tu MockAPI (AJUSTAR si es necesario)
const API_URL_PRODUCTS = 'https://692c695dc829d464006f7fad.mockapi.io/products';

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

      // Aseguramos que el producto se agrega con la cantidad 1 y todas sus propiedades (incluyendo 'stock')
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };
    
  // 🚀 FUNCIÓN: Restar una unidad del carrito
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
      return prevCarrito;
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // 🚀 NUEVA FUNCIÓN: PROCESAR COMPRA Y ACTUALIZAR STOCK EN LA API
  const procesarCompra = async () => {
    if (carrito.length === 0) return true;

    const updatePromises = carrito.map(async (item) => {
        const url = `${API_URL_PRODUCTS}/${item.id}`;
        
        // Calcular el nuevo stock. Usamos Number() para asegurar el tipo.
        const stockActual = Number(item.stock) || 0; 
        const nuevoStock = stockActual - item.cantidad;

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stock: nuevoStock }), // Solo actualizamos el stock
            });

            if (!response.ok) {
                throw new Error(`Fallo al actualizar stock para ${item.title}`);
            }
            return response.json();
        } catch (error) {
            console.error("Error al procesar el producto:", error);
            return { error: true, message: error.message };
        }
    });

    const results = await Promise.all(updatePromises);
    const hasError = results.some(result => result.error);

    if (!hasError) {
        console.log("Stock actualizado y compra procesada.");
        vaciarCarrito();
        return true; // Éxito
    } else {
        console.error("La compra falló debido a errores en la actualización de stock.");
        return false; // Fallo
    }
  };


  return (
    <CartContext.Provider
      value={{
        carrito,
        setCarrito,
        agregarAlCarrito,
        restarDelCarrito, // 👈 EXPONER FUNCIÓN DE RESTA
        eliminarDelCarrito,
        vaciarCarrito,
        procesarCompra // 👈 EXPONER FUNCIÓN DE STOCK/COMPRA
      }}
    >
      {children}
    </CartContext.Provider>
  );
};