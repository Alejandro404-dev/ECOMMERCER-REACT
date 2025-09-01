import React from 'react';

function Contactanos() {
  return (
    <section className="contacto" id="contacto">
      <h2>Contáctanos</h2>
      <form>
        <input type="text" placeholder="Nombre" required />
        <input type="email" placeholder="Correo" required />
        <textarea placeholder="Mensaje" required />
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}

export default Contactanos;