import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css'; 

const Footer = () => {
  return (
    <footer className="text-black text-center py-4 mt-4"
    style={{ backgroundColor: "#f3ce88ff", color: "white" }}>
      <Container>
        <Row>
          <Col md={6}>
            <p className="mb-0">@ Snackear Argentina - 2025</p>
            <p className="mb-0">Derechos reservados</p>
          </Col>
          <Col md={6}>
            <div>
              <a href="#" className="text-black me-3">
                <i className="fa fa-facebook fa-2x"></i>
              </a>
              <a href="#" className="text-black me-3">
                <i className="fa fa-twitter fa-2x"></i>
              </a>
              <a href="#" className="text-black me-3">
                <i className="fa fa-instagram fa-2x"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;