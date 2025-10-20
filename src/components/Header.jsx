import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <Navbar expand="lg" className="mb-4" style={{ backgroundColor: "#f3ce88ff", color: "white" }}>
      <Container>       
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-encter">
          <img
            src="../src/assets/pictures/Logo.png"
            alt="Logo"
            style={{ width: "150px", height: "auto", marginRight: "30px" }}
          />
          <span style={{ fontSize: "3rem", lineHeight: "2" }}>  Snakear Argentina</span>
          
        </Navbar.Brand>

        <Nav className="ms-auto align-items-center">
          <Nav.Link as={Link} to="/carousel" className="me-3">Home</Nav.Link>
          <Nav.Link as={Link} to="/" className="me-3">Productos</Nav.Link>
          <Nav.Link as={Link} to="/ofertas" className="me-3">Ofertas</Nav.Link>
          <Nav.Link as={Link} to="/infaltables" className="me-3">Infaltables</Nav.Link>

          <div className="d-flex align-items-center">
            <Button variant="outline-dark" as={Link} to="/administracion" className="me-2">
              Administración
            </Button>
            <Link to="/carrito" className="text-black">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </Link>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;