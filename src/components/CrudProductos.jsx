import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal, Row, Col } from 'react-bootstrap';
import ScrollToTopButton from './ScrollToTopButton';

const API_URL = 'https://692c695dc829d464006f7fad.mockapi.io/products';

const CrudProductos = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', price: '', stock: '', category: '', image: '' });
  const [editId, setEditId] = useState(null);

  // Filtros
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Ordenamiento
  const [sortBy, setSortBy] = useState(""); // "priceAsc", "priceDesc", "stockAsc", "stockDesc"

  const getProductos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProducts(data);
  };

  const handleClose = () => {
    setShow(false);
    setForm({ title: '', description: '', price: '', stock: '', category: '', image: '' });
    setEditId(null);
  };

  const handleShow = (product) => {
    setShow(true);
    if (product) {
      setForm({
        ...product,
        price: Number(product.price),
        stock: Number(product.stock)
      });
      setEditId(product.id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock)
    };

    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });

    handleClose();
    getProductos();
  };

  const eliminarProducto = async (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      getProductos();
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  // Filtrar por texto y categoría
  let filteredProducts = products.filter(prod =>
    prod.title.toLowerCase().includes(search.toLowerCase()) &&
    (categoryFilter === "" || prod.category === categoryFilter)
  );

  // Ordenar según opción seleccionada
  if (sortBy === "priceAsc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "priceDesc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "stockAsc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.stock - b.stock);
  } else if (sortBy === "stockDesc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.stock - a.stock);
  }

  // Categorías dinámicas
  const categorias = [...new Set(products.map(p => p.category))];

  return (
    <div className="container mt-4">

      {/* TÍTULO CENTRADO */}
      <h2 className="text-center mb-4">CRUD de Productos</h2>

      {/* BOTÓN AGREGAR */}
      <div className="text-center mb-3">
        <Button onClick={() => handleShow()}>Agregar Producto</Button>
      </div>

      {/* FILTROS CENTRADOS */}
      <Row className="justify-content-center mb-4">

        {/* Búsqueda */}
        <Col xs={12} md={6} lg={4} className="mb-2">
          <Form.Control
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-center"
          />
        </Col>

        {/* Categoría */}
        <Col xs={12} md={4} lg={3} className="mb-2">
          <Form.Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Col>

        {/* Ordenamiento */}
        <Col xs={12} md={4} lg={3} className="mb-2">
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Ordenar por...</option>
            <option value="priceAsc">Precio: menor a mayor</option>
            <option value="priceDesc">Precio: mayor a menor</option>
            <option value="stockAsc">Stock: menor a mayor</option>
            <option value="stockDesc">Stock: mayor a menor</option>
          </Form.Select>
        </Col>

      </Row>

      {/* TABLA */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map(prod => (
            <tr key={prod.id}>
              <td>{prod.title}</td>
              <td>{prod.description}</td>
              <td>${Number(prod.price).toFixed(2)}</td>
              <td>{prod.stock}</td>
              <td>{prod.category}</td>
              <td>
                {prod.image?.startsWith('http') ? (
                  <img src={prod.image} alt={prod.title} width={50} />
                ) : (
                  <span>{prod.image}</span>
                )}
              </td>
              <td>
                <Button size="sm" onClick={() => handleShow(prod)}>Editar</Button>{' '}
                <Button size="sm" variant="danger" onClick={() => eliminarProducto(prod.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>

      </Table>

      {/* MODAL */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Editar' : 'Agregar'} Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-2">
              <Form.Label>Título</Form.Label>
              <Form.Control
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={form.price}
                onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={form.stock}
                onChange={e => setForm({ ...form, stock: Number(e.target.value) })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Imagen (URL)</Form.Label>
              <Form.Control
                value={form.image}
                onChange={e => setForm({ ...form, image: e.target.value })}
                required
              />
            </Form.Group>

            <Button type="submit" className="mt-2">Guardar</Button>

          </Form>
        </Modal.Body>
      </Modal>

      <ScrollToTopButton />
    </div>
  );
};

export default CrudProductos;


