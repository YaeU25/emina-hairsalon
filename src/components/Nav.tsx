import { Link } from "react-router-dom";
import "../index.css";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="logo">Emina's Hair Salon</div>
        <div className="nav-links">
          <Link to="/">Accueil</Link>
          <Link to="/services">Services</Link>
          <Link to="/reservation">Réservation</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
