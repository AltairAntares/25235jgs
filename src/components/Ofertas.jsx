import React from 'react';
import ProductList from './ProductList';

const Ofertas = () => {
  return (
    <div className="container" style={{ backgroundColor: "#f3ce88ff", color: "black", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", lineHeight: "2" }}>Ofertas</h1>
      <ProductList category="men's clothing" />
    </div>
  );
};

export default Ofertas;