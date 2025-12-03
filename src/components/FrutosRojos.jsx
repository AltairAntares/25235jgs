import React from 'react';
import ProductList from './ProductList';

const FrutosRojos = () => {
  return (
    <div className="container" style={{ backgroundColor: "#f3ce88ff", color: "black", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", lineHeight: "2" }}>Frutos Rojos</h1>
      <ProductList category="Frutos" />
    </div>
  );
};

export default FrutosRojos;