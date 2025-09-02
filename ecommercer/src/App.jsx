import React, { useState } from 'react';
import Header from './components/header';
import Producto from './components/Producto';
import Login from './components/Login';
import PagoSimulado from './components/PagoSimulado';
import Inventario from './components/Inventario';
import Contactanos from './components/Contactanos';
import './App.css';
import db from "./data/db";

function App() {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [productoPago, setProductoPago] = useState(null);
  const [mostrarInventario, setMostrarInventario] = useState(false);
  const [pagoCarrito, setPagoCarrito] = useState(false);
  const [productos, setProductos] = useState(db);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [busqueda, setBusqueda] = useState('');

  // Agregar producto al carrito (máximo 10 por producto)
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        // Solo permite agregar si no supera el stock
        if (existe.cantidad < producto.stocks) {
          return prev.map(item =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          );
        }
        return prev;
      }
      // Si no existe, agrega solo si hay stock
      if (producto.stocks > 0) {
        return [...prev, { ...producto, cantidad: 1 }];
      }
      return prev;
    });
  };

  // Sumar uno al producto
  const sumarProducto = (id) => {
    setCarrito(prev =>
      prev.map(item =>
        item.id === id && item.cantidad < item.stocks
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  // Restar uno al producto
  const restarProducto = (id) => {
    setCarrito(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter(item => item.cantidad > 0)
    );
  };

  // Eliminar producto del carrito
  const eliminarProducto = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  // Calcular total
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const toggleCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
  };

  // Mostrar simulador de pago
  const irAPago = (producto) => {
    setProductoPago(producto);
  };

  const handleInventarioClick = () => {
    setMostrarInventario(true);
  };

  const handleCerrarInventario = () => {
    setMostrarInventario(false);
  };

  const productosFiltrados = productos.filter(producto => {
    const coincideCategoria = categoriaFiltro ? producto.categoria === categoriaFiltro : true;
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  if (!usuario) {
    return <Login onLogin={setUsuario} />;
  }

  return (
    <>
      <Header
        cantidad={carrito.reduce((acc, item) => acc + item.cantidad, 0)}
        onCartClick={toggleCarrito}
        usuario={usuario}
        onInventarioClick={handleInventarioClick}
      />

      {mostrarInventario && usuario?.rol === "admin" ? (
        <Inventario productos={productos} setProductos={setProductos} onClose={handleCerrarInventario} />
      ) : (
        <>
          <section className="hero">
            <div className="hero-content">
              <h1>Encuentra tus piezas Gamer al mejor precio</h1>
              <p>Arma tu PC con lo último en hardware</p>
              <a href="#productos" className="btn">Comprar ahora</a>
            </div>
          </section>

          <section className="productos" id="productos">
            <h2>Productos</h2>
            <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem', justifyContent: 'center'}}>
              <select value={categoriaFiltro} onChange={e => setCategoriaFiltro(e.target.value)}>
                <option value="">Todas las categorías</option>
                <option value="teclado">Teclados</option>
                <option value="mouse">Mouse</option>
                <option value="monitor">Monitores</option>
              </select>
              <input
                type="text"
                placeholder="Buscar producto..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                style={{padding: '0.5rem', borderRadius: '6px', border: '1px solid #1C3A40', background: '#0B340F', color: '#87F414'}}
              />
            </div>
            <div className="productos-grid">
              {productosFiltrados.map((producto) => (
                <Producto
                  key={producto.id}
                  producto={producto}
                  agregarAlCarrito={agregarAlCarrito}
                  irAPago={irAPago}
                />
              ))}
            </div>
          </section>

          <Contactanos />

          {mostrarCarrito && (
            <div className="carrito-modal">
              <h3>Carrito</h3>
              {carrito.length === 0 ? (
                <p>El carrito está vacío.</p>
              ) : (
                <ul style={{ padding: 0 }}>
                  {carrito.map((item) => (
                    <li key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', listStyle: 'none' }}>
                      <img src={item.imagen} alt={item.nombre} style={{ width: 50, height: 50, objectFit: 'cover', marginRight: 10, borderRadius: 4 }} />
                      <span style={{ flex: 1 }}>{item.nombre}</span>
                      <span>${item.precio}</span>
                      <button onClick={() => restarProducto(item.id)} style={{ margin: '0 5px', background: '#0A6207', color: '#87F414', border: 'none', borderRadius: '50%', width: 25, height: 25, fontWeight: 'bold', cursor: 'pointer' }}>-</button>
                      <span>{item.cantidad}</span>
                      <button
                        onClick={() => sumarProducto(item.id)}
                        disabled={item.cantidad >= item.stocks}
                        style={{
                          margin: '0 5px',
                          background: '#87F414',
                          color: '#07141A',
                          border: 'none',
                          borderRadius: '50%',
                          width: 25,
                          height: 25,
                          fontWeight: 'bold',
                          cursor: item.cantidad >= item.stocks ? 'not-allowed' : 'pointer',
                          opacity: item.cantidad >= item.stocks ? 0.5 : 1
                        }}
                      >
                        +
                      </button>
                      <button onClick={() => eliminarProducto(item.id)} style={{ marginLeft: 10, background: '#1C3A40', color: '#87F414', border: 'none', borderRadius: '50%', width: 25, height: 25, fontWeight: 'bold', cursor: 'pointer' }}>x</button>
                    </li>
                  ))}
                </ul>
              )}
              <hr />
              <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '1.1rem' }}>
                Total: ${total.toFixed(2)}
              </div>
              {carrito.length > 0 && (
                <button
                  className="btn-comprar"
                  style={{ width: '100%', marginTop: '1rem' }}
                  onClick={() => {
                    setProductoPago(carrito); // Pasamos el carrito completo
                    setPagoCarrito(true);
                    setMostrarCarrito(false);
                  }}
                >
                  Comprar carrito
                </button>
              )}
            </div>
          )}
          <div style={{textAlign: 'right', margin: '1rem'}}>
            <span>Bienvenido, {usuario.usuario} ({usuario.rol})</span>
          </div>

          {productoPago && (
            <PagoSimulado
              producto={productoPago}
              esCarrito={pagoCarrito}
              onClose={() => {
                setProductoPago(null);
                setPagoCarrito(false);
              }}
            />
          )}
        </>
      )}
    </>
  );
}

export default App;
