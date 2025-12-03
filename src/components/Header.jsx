import React, { useContext } from 'react'; // <--- 1. Faltaba importar useContext
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap'; // <--- 2. Faltaba importar Badge
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from './CartContext'; // <--- 3. Faltaba importar el Contexto

const Header = () => {
  // 4. ESTO ES LO QUE TE FALTA: Conectar con el carrito y calcular totalItems
  const { carrito } = useContext(CartContext);
  
  // Calculamos la suma de cantidades. Si no pones esto, "totalItems" no existe.
  const totalItems = carrito ? carrito.reduce((acc, item) => acc + item.cantidad, 0) : 0;

  return (
    <Navbar expand="lg" className="mb-4" style={{ backgroundColor: "#f3ce88ff", color: "white" }}>
      <Container>       
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="../src/assets/pictures/Logo.png"
            alt="Logo"
            style={{ width: "150px", height: "auto", marginRight: "30px" }}
          />
          <span style={{ fontSize: "3rem", lineHeight: "2" }}> Snakear Argentina</span>
        </Navbar.Brand>

        <Nav className="ms-auto align-items-center">
          <Nav.Link as={Link} to="/carousel" className="me-3">Home</Nav.Link>
          <Nav.Link as={Link} to="/" className="me-3">Productos</Nav.Link>
          <Nav.Link as={Link} to="/frutos-secos" className="me-3">Frutos Secos</Nav.Link>
          <Nav.Link as={Link} to="/frutos-rojos" className="me-3">Frutos Rojos</Nav.Link>
          <Nav.Link as={Link} to="/chocolates" className="me-3">Chocolates</Nav.Link>

          <div className="d-flex align-items-center">
            <Button variant="outline-dark" as={Link} to="/administracion" className="me-2">
              Administración
            </Button>
            <Link to="/carrito" className="text-white position-relative">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              
              {/* Aquí es donde te daba el error (Línea 74), ahora ya funcionará */}
              {totalItems > 0 && (
                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;