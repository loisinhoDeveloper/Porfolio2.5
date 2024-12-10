import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css"; // Importamos los estilos específicos
import { Link as ScrollLink } from "react-scroll"; //npm install react-scroll



// El navbar contiene los enlaces a las secciones dentro de la misma página (#educacion, #skills, etc.), además de un enlace de retorno a la página de inicio (/).
export const Navbar = () => {
    return (
        <nav className="navbar">
            <ScrollLink to="home" smooth={true} duration={500} className="navbar-link">
                <h1><span>rodilla</span>.dev</h1>
            </ScrollLink>
            <div className="linksHome">
                <ScrollLink to="home" smooth={true} duration={500}>Home</ScrollLink>
                <ScrollLink to="educacion" smooth={true} duration={500}>Educación</ScrollLink>
                <ScrollLink to="skills" smooth={true} duration={500}>Skills</ScrollLink>
                <ScrollLink to="proyectos" smooth={true} duration={500}>Proyectos</ScrollLink>
                <ScrollLink to="contacto" smooth={true} duration={500}>Contacto</ScrollLink>
            </div>
        </nav>
    );
};
