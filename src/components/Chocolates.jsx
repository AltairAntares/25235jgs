import React from 'react';
import ProductList from './ProductList';

const Chocolates = () => {
  return (
    <div className="container" style={{ backgroundColor: "#f3ce88ff", color: "black", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", lineHeight: "2" }}>Chocolates</h1>
      <ProductList category="Chocolates" />
    </div>
  );
};

export default Chocolates;