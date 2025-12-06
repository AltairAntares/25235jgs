import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import Logo from '../assets/pictures/logo_blanc.jpg';
import VideoChoco from "../assets/videos/choco_7.mp4"; 

const Login = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === 'admin' && pass === '1234') {
      navigate('/crud');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };


  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-90">
      
      {/* 1. CONTENEDOR DEL FORMULARIO (LIMITADO) */}
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card 
            className="shadow-lg p-4"
            style={{ 
              backgroundColor: "#f5e2beff", 
              borderRadius: "14px"
            }}
          >
            <Card.Body>
              {/* ... Contenido del Formulario ... */}
              <div className="d-flex align-items-center justify-content-center mb-4">
                <img 
                  src={Logo}
                  alt="Logo"
                  style={{ width: "100px", height: "auto", marginRight: "12px", borderRadius: "8px" }}
                />
                <h2 className="m-0">Iniciar Sesión</h2>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control type="text" value={user} onChange={e => setUser(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" value={pass} onChange={e => setPass(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Ingresar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      ---
      
      {/* 2. CONTENEDOR DEL VIDEO (ANCHO COMPLETO) */}
      <div className="w-100"> {/* w-100 asegura que ocupe el 100% del Container */}
        <div
          style={{
            position: "relative",
            width: "100%", // Ocupa el 100% del div padre (w-100)
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
              objectFit: "cover", // Esto asegura que el video cubra el área sin estirarse
              transform: "translate(-50%, -50%)",
              zIndex: 1
            }}
          ></video>
        </div>
      </div>
    </Container>
  );
};

export default Login;