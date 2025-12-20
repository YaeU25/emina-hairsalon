import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "../index.css";

export default function Home() {
  return (
    <div className="home-container">
      <Nav />

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>L’art de la coiffure ✂️</h1>
          <p>Réservez votre coupe facilement en ligne.</p>
          <a href="/reservation" className="btn-primary">
            Réserver maintenant
          </a>
        </div>
      </section>

      {/* SECTION PRÉSENTATION */}
      <section className="presentation">
        <h2>Bienvenue chez Emina's Hair Salon</h2>
        <p>
          Notre salon vous accueille dans une ambiance chaleureuse et raffinée.
          Chaque coupe est pensée pour révéler votre personnalité.
        </p>
        <div>
          <p className="location">4 Rue Auguste Potié - 59320 Haubourdin</p>
          <p>Tél: 07 51 22 67 99</p>
          <p>
            <em>Du lundi au vendredi de 9h à 18h</em>
          </p>
          <p>
            <em>Le samedi de 9h à 17h</em>
          </p>
        </div>
      </section>

      {/* AVIS CLIENTS */}
      {/* <section className="testimonials">
        <h3>Avis clients</h3>
        <div className="testimonial-cards">
          {[
            "Super service, coupe parfaite !",
            "Ambiance chaleureuse.",
            "Équipe très professionnelle.",
          ].map((text, i) => (
            <div key={i} className="card">
              <p>“{text}”</p>
              <p className="author">— Client satisfait</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* CALL TO ACTION */}
      <section className="cta">
        <h2>Prêt pour votre prochaine coupe ?</h2>
        <p>Prenez rendez-vous dès maintenant et vivez l’expérience salon.</p>
        <a href="/reservation" className="btn-secondary">
          Prendre rendez-vous
        </a>
      </section>

      <Footer />
    </div>
  );
}
