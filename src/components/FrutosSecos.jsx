import React from 'react';
import ProductList from './ProductList';

const FrutosSecos = () => {
  return (
    <div className="container" style={{ backgroundColor: "#f3ce88ff", color: "black", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", lineHeight: "2" }}>Frutos Secos</h1>
      <ProductList category="Secos" />
    </div>
  );
};

export default FrutosSecos;