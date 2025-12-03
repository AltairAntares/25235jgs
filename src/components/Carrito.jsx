import React, { useContext, useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Toast, ToastContainer } from 'react-bootstrap';
import { CartContext } from './CartContext';

const Carrito = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CartContext);
  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Función de confirmación + envío del formulario
  const confirmarCompra = (e) => {
    e.preventDefault();

    const confirmado = window.confirm("¿Deseas confirmar la compra?");
    if (!confirmado) return;

    const form = e.target;

    fetch("https://formspree.io/f/meogblkq", {
      method: "POST",
      body: new FormData(form),
      headers: { "Accept": "application/json" }
    })
      .then(() => {
        vaciarCarrito();
        setShowForm(false);
        setShowToast(true); // Mostrar el toast elegante
      })
      .catch(() => {
        alert("Hubo un error al enviar la compra.");
      });
  };

  const total = carrito.reduce(
    (acc, item) => acc + Number(item.price) * item.cantidad,
    0
  );

  if (carrito.length === 0) {
    return (
      <>
        <Container className="mt-4">
          <h3>Tu carrito está vacío</h3>
        </Container>

        {/* Toast afuera del container */}
        <ToastContainer position="top-center" className="p-3 toast-elevated">
          <Toast
            className="elegant-toast text-center"
            show={showToast}
            onClose={() => setShowToast(false)}
            delay={3000}
            autohide
          >
            <div className="toast-icon">🛒✨</div>
            <strong style={{ fontSize: "1.4rem" }}>¡Gracias por su compra!</strong>
            <div>Su pedido fue enviado correctamente.</div>
          </Toast>
        </ToastContainer>
      </>
    );
  }

  return (
    <>
      <Container className="mt-4">
        <h3>Carrito de compras</h3>

        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio unitario</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>${Number(item.price).toFixed(2)}</td>
                <td>{item.cantidad}</td>
                <td>${(Number(item.price) * item.cantidad).toFixed(2)}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => eliminarDelCarrito(item.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h5 className="text-end">Total a pagar: ${total.toFixed(2)}</h5>

        <div className="text-end mt-3">
          <Button variant="success" onClick={() => setShowForm(true)}>
            Comprar
          </Button>
        </div>

        {/* Modal con formulario Formspree */}
        <Modal show={showForm} onHide={() => setShowForm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Completar compra</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={confirmarCompra}>
              <div className="d-flex gap-3">
                <div className="form-group w-100">
                  <label>Nombre:</label>
                  <input className="form-control" type="text" name="Nombre" required />
                </div>

                <div className="form-group w-100">
                  <label>Apellido:</label>
                  <input className="form-control" type="text" name="Apellido" required />
                </div>
              </div>

              <div className="d-flex gap-3 mt-3">
                <div className="form-group w-100">
                  <label>Teléfono:</label>
                  <input className="form-control" type="text" name="Telefono" required />
                </div>

                <div className="form-group w-100">
                  <label>Correo electrónico:</label>
                  <input className="form-control" type="email" name="email" required />
                </div>
              </div>

              <div className="form-group mt-3">
                <label>Mensaje:</label>
                <textarea className="form-control" name="Mensaje" rows="3"></textarea>
              </div>

              {/* Campos ocultos con datos del pedido */}
              <input
                type="hidden"
                name="Pedido"
                value={carrito
                  .map(
                    (item) =>
                      `${item.title} x ${item.cantidad} = $${
                        item.price * item.cantidad
                      }`
                  )
                  .join(" | ")}
              />

              <input type="hidden" name="Total" value={total} />

              <Button className="w-100 mt-3" variant="primary" type="submit">
                Confirmar Compra
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </Container>

      {/* Toast SIEMPRE afuera del layout */}
      <ToastContainer position="top-center" className="p-3 toast-elevated">
        <Toast
          className="elegant-toast text-center"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <div className="toast-icon">🛒✨</div>
          <strong style={{ fontSize: "1.4rem" }}>¡Gracias por su compra!</strong>
          <div>Su pedido fue enviado correctamente.</div>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default Carrito;

