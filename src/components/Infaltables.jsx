import React from 'react';
import ProductList from './ProductList';

const Infaltables = () => {
  return (
    <div className="container" style={{ backgroundColor: "#f3ce88ff", color: "black", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", lineHeight: "2" }}>Infaltables</h1>
      <ProductList category="jewelery" />
    </div>
  );
};

export default Infaltables;