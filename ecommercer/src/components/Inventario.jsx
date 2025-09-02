import React, { useState } from 'react';

function Inventario({ productos, setProductos, onClose }) {
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    stocks: '',
    imagen: '',
    categoria: ''
  });
  const [editandoId, setEditandoId] = useState(null);
  const [editProducto, setEditProducto] = useState({
    nombre: '',
    precio: '',
    stocks: '',
    imagen: '',
    categoria: ''
  });
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [busqueda, setBusqueda] = useState('');

  // Maneja el cambio de los campos del formulario
  const handleChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value
    });
  };

  // Para agregar producto
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !nuevoProducto.nombre ||
      !nuevoProducto.precio ||
      !nuevoProducto.stocks ||
      !nuevoProducto.imagen
    ) return;

    const nuevo = {
      id: productos.length + 1,
      nombre: nuevoProducto.nombre,
      precio: parseFloat(nuevoProducto.precio),
      stocks: parseInt(nuevoProducto.stocks),
      imagen: nuevoProducto.imagen,
      categoria: nuevoProducto.categoria
    };
    setProductos([...productos, nuevo]);
    setNuevoProducto({ nombre: '', precio: '', stocks: '', imagen: '', categoria: '' });
  };

  // Para eliminar producto
  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  // Iniciar edición
  const iniciarEdicion = (producto) => {
    setEditandoId(producto.id);
    setEditProducto({
      nombre: producto.nombre,
      precio: producto.precio,
      stocks: producto.stocks,
      imagen: producto.imagen,
      categoria: producto.categoria
    });
  };

  // Manejar cambios en edición
  const handleEditChange = (e) => {
    setEditProducto({
      ...editProducto,
      [e.target.name]: e.target.value
    });
  };

  // Para editar producto
  const guardarEdicion = (id) => {
    setProductos(productos.map(p =>
      p.id === id
        ? {
            ...p,
            nombre: editProducto.nombre,
            precio: parseFloat(editProducto.precio),
            stocks: parseInt(editProducto.stocks),
            imagen: editProducto.imagen,
            categoria: editProducto.categoria
          }
        : p
    ));
    setEditandoId(null);
    setEditProducto({ nombre: '', precio: '', stocks: '', imagen: '', categoria: '' });
  };

  // Cancelar edición
  const cancelarEdicion = () => {
    setEditandoId(null);
    setEditProducto({ nombre: '', precio: '', stocks: '', imagen: '', categoria: '' });
  };

  const productosFiltrados = productos.filter(producto => {
    const coincideCategoria = categoriaFiltro ? producto.categoria === categoriaFiltro : true;
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div className="inventario-modal">
      <h2>Inventario</h2>
      <button onClick={onClose} style={{float: 'right'}}>Cerrar</button>
      <form onSubmit={handleSubmit} style={{marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={nuevoProducto.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={nuevoProducto.precio}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
        <input
          type="number"
          name="stocks"
          placeholder="Stocks"
          value={nuevoProducto.stocks}
          onChange={handleChange}
          min="0"
          required
        />
        <input
          type="text"
          name="imagen"
          placeholder="URL de imagen"
          value={nuevoProducto.imagen}
          onChange={handleChange}
          required
        />
        <select
          name="categoria"
          value={nuevoProducto.categoria}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona categoría</option>
          <option value="teclado">Teclado</option>
          <option value="mouse">Mouse</option>
          <option value="monitor">Monitor</option>
        </select>
        <button type="submit">Agregar producto</button>
      </form>
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
          <div key={producto.id} className="producto-card">
            {editandoId === producto.id ? (
              <>
                <input
                  type="text"
                  name="nombre"
                  value={editProducto.nombre}
                  onChange={handleEditChange}
                />
                <input
                  type="number"
                  name="precio"
                  value={editProducto.precio}
                  onChange={handleEditChange}
                  min="0"
                  step="0.01"
                />
                <input
                  type="number"
                  name="stocks"
                  value={editProducto.stocks}
                  onChange={handleEditChange}
                  min="0"
                />
                <input
                  type="text"
                  name="imagen"
                  value={editProducto.imagen}
                  onChange={handleEditChange}
                />
                <select
                  name="categoria"
                  value={editProducto.categoria}
                  onChange={handleEditChange}
                  required
                >
                  <option value="">Selecciona categoría</option>
                  <option value="teclado">Teclado</option>
                  <option value="mouse">Mouse</option>
                  <option value="monitor">Monitor</option>
                </select>
                <button onClick={() => guardarEdicion(producto.id)}>Guardar</button>
                <button onClick={cancelarEdicion} style={{marginLeft: '0.5rem'}}>Cancelar</button>
              </>
            ) : (
              <>
                <img src={producto.imagen} alt={producto.nombre} />
                <h3>{producto.nombre}</h3>
                <p>Precio: ${producto.precio}</p>
                <p>Stock: {producto.stocks}</p>
                <button onClick={() => iniciarEdicion(producto)}>Editar</button>
                <button onClick={() => eliminarProducto(producto.id)} style={{marginLeft: '0.5rem'}}>Eliminar</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventario;