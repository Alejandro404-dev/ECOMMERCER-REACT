import React, { useState } from 'react';

function PagoSimulado({ producto, onClose }) {
  const [metodo, setMetodo] = useState('');
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Compra simulada exitosa!');
    onClose();
  };

  return (
    <div className="pago-modal">
      <h2>Simulación de pago</h2>
      <p><strong>Producto:</strong> {producto.nombre}</p>
      <p><strong>Precio:</strong> ${producto.precio}</p>
      <form onSubmit={handleSubmit}>
        <label>Método de pago:</label>
        <select name="metodo" value={metodo} onChange={e => setMetodo(e.target.value)} required>
          <option value="">Selecciona...</option>
          <option value="creditcard">Tarjeta de crédito</option>
          <option value="paypal">PayPal</option>
          <option value="mercadopago">MercadoPago</option>
        </select>
        {metodo === "creditcard" && (
          <>
            <input type="text" name="nombre" placeholder="Nombre en la tarjeta" onChange={handleChange} required />
            <input type="text" name="numero" placeholder="Número de tarjeta" onChange={handleChange} required />
            <input type="text" name="vencimiento" placeholder="Vencimiento (MM/AA)" onChange={handleChange} required />
            <input type="text" name="cvv" placeholder="CVV" onChange={handleChange} required />
          </>
        )}
        {metodo === "paypal" && (
          <input type="email" name="paypalEmail" placeholder="Correo de PayPal" onChange={handleChange} required />
        )}
        {metodo === "mercadopago" && (
          <input type="email" name="mpEmail" placeholder="Correo de MercadoPago" onChange={handleChange} required />
        )}
        <button type="submit" style={{marginTop: '1rem'}}>Simular compra</button>
        <button type="button" onClick={onClose} style={{marginLeft: '1rem'}}>Cancelar</button>
      </form>
    </div>
  );
}

export default PagoSimulado;