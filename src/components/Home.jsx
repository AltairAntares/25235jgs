import React from 'react';
import ProductList from './ProductList';

const Home = () => {
  return (
    <div className="container" style={{ backgroundColor: "#f3ce88ff", color: "black", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", lineHeight: "2" }}>Nuestros productos</h1>
      <ProductList />
    </div>
  );
};

export default Home;