import { FaShoppingCart } from "react-icons/fa";
import "./Header.css";

export default function Header({ cantidad, onCartClick, usuario, onInventarioClick }) {
  const irAlInicio = () => {
    window.location.hash = "#productos";
    const productosSection = document.getElementById("productos");
    if (productosSection) {
      productosSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const irAContacto = () => {
    window.location.hash = "#contacto";
    const contactoSection = document.getElementById("contacto");
    if (contactoSection) {
      contactoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <button onClick={irAlInicio} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
          <img src="/img/logo.png" alt="Logo GamerStore" />
        </button>
      </div>

      <nav className="nav">
        <ul>
          <li>
            <button onClick={irAlInicio}>Inicio</button>
          </li>
          <li>
            <a href="#productos">Productos</a>
          </li>
          <li>
            <a href="#ofertas">Ofertas</a>
          </li>
          <li>
            <button onClick={irAContacto}>Contacto</button>
          </li>
          {usuario?.rol === "admin" && (
            <li>
              <button className="btn-inventario" onClick={onInventarioClick}>
                Inventario
              </button>
            </li>
          )}
        </ul>
      </nav>

      <div className="cart">
        <button onClick={onCartClick}>
          <FaShoppingCart className="cart-icon" /> ({cantidad})
        </button>
      </div>
    </header>
  );
}