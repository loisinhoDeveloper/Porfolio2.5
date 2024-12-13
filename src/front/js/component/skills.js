import React, { useRef } from 'react';
import "../../styles/skills.css";
import { gsap } from "gsap";
import Lottie from "lottie-react";
import animacionSkills from "../../../assets/iconos/animacionSkills.json"; // Animación Lottie
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaPython } from "react-icons/fa";
import { SiFlask, SiStripe } from "react-icons/si";


export const Skills = () => {
  

  const skills = [
    { titulo: "HTML", descripcion: "Estructuración web.", nivel: "Intermedio", icono: <FaHtml5 /> },
    { titulo: "CSS", descripcion: "Estilos y diseño visual.", nivel: "Intermedio", icono: <FaCss3Alt /> },
    { titulo: "JavaScript", descripcion: "Lenguaje de programación.", nivel: "En proceso de consolidación", icono: <FaJs /> },
    { titulo: "React", descripcion: "Framework frontend.", nivel: "Nivel inicial sólido", icono: <FaReact /> },
    { titulo: "Bootstrap", descripcion: "Framework CSS.", nivel: "Competencia básica", icono: <FaBootstrap /> },
    { titulo: "Stripe", descripcion: "Métodos de pago.", nivel: "Familiaridad inicial", icono: <SiStripe /> },
    { titulo: "Flask", descripcion: "Framework backend.", nivel: "Nivel inicial sólido", icono: <SiFlask /> },
    { titulo: "Python", descripcion: "Lenguaje de programación.", nivel: "En proceso de consolidación", icono: <FaPython /> },
    ];


 const refTitulo = useRef(null);
 const refIconos = skills.map(() => useRef(null)); // useRef() permite acceder a los elementos directamente 
 //método .map() recorre un array de habilidades (skills) e iconos.
 // Cada vez que recore recorre un ítem en el array, se crea una nueva referencia utilizando useRef(null) y se almacena en el array refIconos
 // es decir una referencia para cada habilidad.
 
  const animarTitulo = () => {
    gsap.to(refTitulo.current, { scale: 1.2, duration: 0.3 });
  };

  const devolverTitulo = () => {
    gsap.to(refTitulo.current, { scale: 1, duration: 0.3 });
  };

  const animarIcono = (index) => {
    gsap.to(refIconos[index].current, { scale: 1.2, duration: 0.3, color: "#FF99B2" });
  };

  const devolverIcono = (index) => {
    gsap.to(refIconos[index].current, { scale: 1, duration: 0.3, color: "#DA4167" });
  };

  return (
    <section id="skills" className="skills-section">
      <h2
        ref={refTitulo}
        onMouseEnter={animarTitulo}
        onMouseLeave={devolverTitulo}
        className="skills-title"
      >
        <Lottie animationData={animacionSkills} style={{ width: "70px", height: "90px" }} />
        Skills
      </h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="skill-card"
            onMouseEnter={() => animarIcono(index)}
            onMouseLeave={() => devolverIcono(index)}
            ref={refIconos[index]}// Usamos la referencia individual
          >
            <div className="icon">{skill.icono}</div>
            <h3>{skill.titulo}</h3>
            <h1>{skill.descripcion}</h1>
            <p>{skill.nivel}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
