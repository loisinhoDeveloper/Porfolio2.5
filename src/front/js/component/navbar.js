import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css"; // Importamos los estilos específicos



// El navbar contiene los enlaces a las secciones dentro de la misma página (#educacion, #skills, etc.), además de un enlace de retorno a la página de inicio (/).
export const Navbar = () => {
	return (
		<nav className="navbar">
			{/* utilizando Link con # para navegar entre las secciones de la misma página, ya que (#) permitirá que el navegador haga scroll hacia las secciones correspondientes dentro del mismo documento. */}
			<Link to="/" className="navbar-link">
  				<h1>rodilla<span>.dev</span></h1>
			</Link>
			<div className="linksHome">
				<Link to="#home">Home</Link> 
                <Link to="#educacion">Educación</Link> 
                <Link to="#skills">Skills</Link>
                <Link to="#proyectos">Proyectos</Link>
                <Link to="#contacto">Contacto</Link>
            </div>
		</nav>
	);
};
