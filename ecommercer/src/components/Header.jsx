import { FaShoppingCart } from "react-icons/fa";
import './header.css';

export default function Header({ cantidad, onCartClick }) {
  return (
    <header className="header">
      <div className="logo">
        <a href="/">
        <img src="/img/logo.png" alt="Logo GamerStore" />
        </a>
        
      </div>

      <nav className="nav">
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Productos</a></li>
          <li><a href="#">Ofertas</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </nav>

      <div className="cart">
        <button
          onClick={onCartClick}
          style={{
            background: "none",
            border: "none",
            color: "#87F414",
            cursor: "pointer",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center"
          }}
        >
          <FaShoppingCart className="cart-icon" /> ({cantidad})
        </button>
      </div>
    </header>
  );
}