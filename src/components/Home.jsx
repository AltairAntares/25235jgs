import React, { useContext } from 'react';
import ProductList from './ProductList';
import { SearchContext } from './SearchContext';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import VideoChoco from "../assets/videos/choco (7).mp4";

const Home = () => {
  const { search, setSearch } = useContext(SearchContext);

  return (
    <div
      className="container py-4"
      style={{ backgroundColor: "#f3ce88ff", color: "black", position: "relative" }}
    >

      {/* TÍTULO CENTRADO */}
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
          width: "300px",
          background: "white",
          borderRadius: "40px",
          padding: "5px 15px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          transition: "width 0.3s ease"
        }}
      >
        <FontAwesomeIcon icon={faSearch} style={{ color: "#887645ff" }} />

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
      <div style={{ height: "20px" }}></div>

      {/* LISTA DE PRODUCTOS */}
      <ProductList />

            {/* VIDEO AL PIE */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "80px",
                  marginTop: "30px",
                  borderRadius: "18px",
                  overflow: "hidden",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.22)"
                }}
              >
                {/* VIDEO DE FONDO */}
                <video
                  src={VideoChoco}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1
                  }}
                ></video>
      
              </div>

    </div>
  );
};

export default Home;

