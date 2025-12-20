import React from "react";
import "../index.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Salon Élégance — Tous droits réservés</p>
    </footer>
  );
}
