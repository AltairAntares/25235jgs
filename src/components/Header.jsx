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
            style={{ width: "100px", height: "auto", marginRight: "20px" }}
          />
          <span style={{ fontSize:"2rem"}}>SNACKEAR</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Aplicamos d-flex y flex-wrap a la Nav para que envuelva los elementos */}
          <Nav className="ms-auto align-items-lg-center d-flex flex-wrap p-2 p-lg-0"> 
            
            {/* 1. Botones de Navegación (Mejorados con Flexbox) */}
            {/* m-1: Margen pequeño para que los botones no se peguen entre sí al envolver. */}
            {/* me-lg-3: Mantener margen a la derecha en escritorio. */}
            <Nav.Item className="m-1 me-lg-3">
              <Button className="btn-custom-color" as={Link} to="/">Home</Button>
            </Nav.Item>
            <Nav.Item className="m-1 me-lg-3">
              <Button className="btn-custom-color" as={Link} to="/productos">Productos</Button>
            </Nav.Item>
            <Nav.Item className="m-1 me-lg-3">
              <Button className="btn-custom-color" as={Link} to="/frutos-secos">Frutos Secos</Button>
            </Nav.Item>
            <Nav.Item className="m-1 me-lg-3">
              <Button className="btn-custom-color" as={Link} to="/frutos-rojos">Frutos Rojos</Button>
            </Nav.Item>
            <Nav.Item className="m-1 me-lg-3">
              <Button className="btn-custom-color" as={Link} to="/chocolates">Chocolates</Button>
            </Nav.Item>
            <Nav.Item className="m-1 me-lg-2">
              <Button className="btn-custom-color" as={Link} to="/administracion">Administración </Button>
            </Nav.Item>

            {/* 2. Ícono del Carrito */}
            {/* mx-1: margen horizontal pequeño en móvil para separación. */}
            <Nav.Item className="mx-1 my-1 me-lg-0">
              <Link to="/carrito" className="text-dark position-relative p-2">
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                {totalItems > 0 && (
                  <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                    {totalItems}
                  </Badge>
                )}
              </Link>
            </Nav.Item>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default Header;