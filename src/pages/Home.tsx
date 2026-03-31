import { useEffect, useState } from "react";
import "./Home.css";
import Fit from "../assets/imagenFit.png";

export default function HomePage() {
  const comments = [
    {
      id: 1,
      author: "Carlos M.",
      text: "Muy cómoda para organizar entrenamientos y ejercicios. Todo queda mucho más claro que en papel.",
    },
    {
      id: 2,
      author: "Laura G.",
      text: "La parte del dashboard y la gestión por roles hacen que la app se vea muy completa y útil.",
    },
    {
      id: 3,
      author: "David R.",
      text: "Me gusta porque puedo ver y crear rutinas de forma rápida, sin perder tiempo con cosas innecesarias.",
    },
    {
      id: 4,
      author: "Andrea S.",
      text: "Diseño limpio, fácil de usar y muy útil para llevar un seguimiento de entrenamientos.",
    },
    {
      id: 5,
      author: "Sara M.",
      text: "Mi entrenador y yo estamos encantados con esta web ¡La Mejor!.",
    },
    {
      id: 4,
      author: "Fernando B.",
      text: "No podría confiar mis entrenamientos a otra web mas que a esta, 10/10.",
    },
    {
      id: 4,
      author: "Aura L.",
      text: "Entrenamientos y ejercicios explicados con mucha claridad, ¡Me encanta!.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // CAMBIO AUTOMATICO DEL CARRUSEL
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % comments.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [comments.length]);

  // FUNCION PARA IR AL COMENTARIO ANTERIOR
  function goPrev() {
    setCurrentIndex((prev) => (prev - 1 + comments.length) % comments.length);
  }

  // FUNCION PARA IR AL SIGUIENTE COMENTARIO
  function goNext() {
    setCurrentIndex((prev) => (prev + 1) % comments.length);
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1 className="hero-title">Bienvenido a FitTrainer</h1>
        <p className="hero-subtitle">
          Gestiona tus entrenamientos, ejercicios y progreso en una sola
          plataforma, de forma rápida y sencilla.
        </p>

        <div className="hero-image-box">
          <img
            src={Fit}
            alt="Imagen principal FitTrainer"
            className="hero-image"
          />
        </div>
      </section>

      <section className="opinions-section">
        <h2 className="opinions-title">Lo que opinan de la app</h2>

        <div className="carousel-box">
          <button className="carousel-button" onClick={goPrev}>
            ‹
          </button>

          <div className="comment-card">
            <p className="comment-text">“{comments[currentIndex].text}”</p>
            <span className="comment-author">
              - {comments[currentIndex].author}
            </span>
          </div>

          <button className="carousel-button" onClick={goNext}>
            ›
          </button>
        </div>

        <div className="carousel-dots">
          {comments.map((comment, index) => (
            <span
              key={comment.id}
              className={`dot ${index === currentIndex ? "active-dot" : ""}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </section>
    </div>
  );
}