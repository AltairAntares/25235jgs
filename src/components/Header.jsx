import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from './CartContext';
import Logo from '../assets/pictures/logo.jpg'; 
import '../index.css';

const Header = () => {
  const { carrito } = useContext(CartContext);
  const totalItems = carrito ? carrito.reduce((acc, item) => acc + item.cantidad, 0) : 0;

  return (
    <Navbar expand="lg" className="mb-4 header-bg">
      <Container>

        {/* LOGO */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img 
            src={Logo}
            alt="Logo"
            style={{ width: "150px", height: "auto", marginRight: "30px" }}
          />
          <span style={{ fontSize:"3rem"}}>SNACKEAR</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">

            {/* LINKS */}
            <div className="d-flex align-items-center flex-wrap nav-buttons">
              <Button variant="outline-dark" as={Link} to="/" className="me-3">Home</Button>
              <Button variant="outline-dark" as={Link} to="/productos" className="me-3">Productos</Button>
              <Button variant="outline-dark" as={Link} to="/frutos-secos" className="me-3">Frutos Secos</Button>
              <Button variant="outline-dark" as={Link} to="/frutos-rojos" className="me-3">Frutos Rojos</Button>
              <Button variant="outline-dark" as={Link} to="/chocolates" className="me-3">Chocolates</Button>
              <Button variant="outline-dark" as={Link} to="/administracion" className="me-2">Administración </Button>
              <Link to="/carrito" className="text-dark position-relative">
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                {totalItems > 0 && (
                  <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                    {totalItems}
                  </Badge>
                )}
              </Link>
            </div>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default Header;
