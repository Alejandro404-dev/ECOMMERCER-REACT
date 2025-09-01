import React from 'react';

function Inventario({ productos, onClose }) {
  return (
    <div className="inventario-modal">
      <h2>Inventario</h2>
      <button onClick={onClose} style={{float: 'right'}}>Cerrar</button>
      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card">
            <img src={producto.imagen} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p>Precio: ${producto.precio}</p>
            <p>Stock: {producto.stocks}</p>
            {/* Aquí puedes agregar botones para editar/eliminar/crear */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventario;