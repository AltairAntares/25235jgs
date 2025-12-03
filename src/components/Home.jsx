import React, { useContext } from 'react';
import ProductList from './ProductList';
import { SearchContext } from './SearchContext';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const { search, setSearch } = useContext(SearchContext);

  return (
    <div
      className="container py-4"
      style={{ backgroundColor: "#f3ce88ff", color: "black", position: "relative" }}
    >

      {/* 🟡 TÍTULO CENTRADO */}
      <h1
        className="text-center mb-5"
        style={{
          fontSize: "2rem",
          lineHeight: 1.2,
          marginBottom: "3rem"
        }}
      >
        Nuestros productos
      </h1>

      {/* 🔍 BARRA DE BÚSQUEDA */}
      <div
        className="search-wrapper shadow-lg"
        style={{
          position: "absolute",
          top: "70px",           // debajo del título sin tocarlo
          left: "50%",
          transform: "translateX(-50%)",
          width: "260px",
          background: "white",
          borderRadius: "40px",
          padding: "5px 15px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          transition: "width 0.3s ease"
        }}
      >
        <FontAwesomeIcon icon={faSearch} style={{ color: "#555" }} />

        <Form.Control
          type="search"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            border: "none",
            boxShadow: "none",
            paddingLeft: "10px"
          }}
        />
      </div>

      {/* SEPARADOR PARA QUE EL BUSCADOR NO SE SUPERPONGA A PRODUCTOS */}
      <div style={{ height: "80px" }}></div>

      {/* LISTA DE PRODUCTOS */}
      <ProductList />
    </div>
  );
};

export default Home;

