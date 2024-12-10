import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Lottie from 'lottie-react';
import animationData from "../../../assets/iconos/educacionPortFolio.json";
import "../../styles/educacion.css";

export const Educacion = () => {
  const refSection = useRef(null);
  const refTitulo = useRef(null);
  const refContenido = useRef(null);

  const [activeInfo, setActiveInfo] = useState(null);

  useEffect(() => {
    // Animación inicial del título
    gsap.from(refTitulo.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power2.out",
    });

    // Animación inicial del contenido
    gsap.from(refContenido.current.children, {
      opacity: 0,
      y: 50,
      stagger: 0.3,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  const handleCircleHover = (index) => {
    setActiveInfo(index);
    // Animación para mostrar el componente
    gsap.to(`.timeline-component-${index}`, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleCircleLeave = () => {
    setActiveInfo(null);
    // Animación para ocultar el componente
    gsap.to(".timeline-component", {
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section ref={refSection} id="educacion" className="educacion-section">
      <h2 ref={refTitulo} onMouseEnter={() => gsap.to(refTitulo.current, { scale: 1.2, duration: 0.3 })} onMouseLeave={() => gsap.to(refTitulo.current, { scale: 1, duration: 0.3 })}>
        <Lottie animationData={animationData} style={{ width: "70px", height: "90px" }} />
        Educación
      </h2>
      <div ref={refContenido} className="timeline">
        {/* Línea central */}
        <div className="timeline-line"></div>

        {/* Hito 1 */}
        <div
          className="timeline-middle"
          onMouseEnter={() => handleCircleHover(1)}
          onMouseLeave={handleCircleLeave}
        >
          <div className="timeline-circle"></div>
        </div>
        {activeInfo === 1 && (
          <div className="timeline-component timeline-left timeline-component-1 active">
            <h3>Bootcamp Full Stack Developer</h3>
            <p>Septiembre 2024</p>
          </div>
        )}

        <div className="timeline-line"></div>

        {/* Hito 2 */}
        <div
          className="timeline-middle"
          onMouseEnter={() => handleCircleHover(2)}
          onMouseLeave={handleCircleLeave}
        >
          <div className="timeline-circle"></div>
        </div>
        {activeInfo === 2 && (
          <div className="timeline-component timeline-right timeline-component-2 active">
            <h3>Formador de Formadores E-learning</h3>
            <p>Enero 2024</p>
          </div>
        )}

        <div className="timeline-line"></div>

        {/* Hito 3 */}
        <div
          className="timeline-middle"
          onMouseEnter={() => handleCircleHover(3)}
          onMouseLeave={handleCircleLeave}
        >
          <div className="timeline-circle"></div>
        </div>
        {activeInfo === 3 && (
          <div className="timeline-component timeline-left-2 timeline-component-3 active">
            <h3>Curso Oficial de Coordinación de Tiempo Libre</h3>
            <p>Enero 2021</p>
          </div>
        )}

        <div className="timeline-line"></div>

        {/* Hito 4 */}
        <div
          className="timeline-middle"
          onMouseEnter={() => handleCircleHover(4)}
          onMouseLeave={handleCircleLeave}
        >
          <div className="timeline-circle"></div>
        </div>
        {activeInfo === 4 && (
          <div className="timeline-component timeline-right-2 timeline-component-4 active">
            <h3>Grado en Educación Infantil</h3>
            <p>Septiembre 2014 - USC</p>
          </div>
        )}
      </div>
    </section>
  );
};
