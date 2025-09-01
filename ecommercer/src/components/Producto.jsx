import React from 'react';
import './Producto.css';

function Producto({ producto, agregarAlCarrito, irAPago }) {
  return (
    <div className="producto-card">
      <img src={producto.imagen} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>${producto.precio}</p>
      <div style={{display: 'flex', gap: '0.5rem', justifyContent: 'center'}}>
        <button
          className="btn-agregar"
          onClick={() => agregarAlCarrito(producto)}
          disabled={producto.stocks === 0}
        >
          Agregar al carrito
        </button>
        <button className="btn-comprar" onClick={() => irAPago(producto)}>
          Comprar ahora
        </button>
      </div>
    </div>
  );
}

export default Producto;