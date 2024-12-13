import React, { Component } from "react";
import "../../styles/footer.css"; // Importamos los estilos específicos
import Rodilla from "../../../front/img/rodillaLogo.png";

export const Footer = () => { 
    return (
        <footer className="footer">
            <img src={Rodilla} alt="Rodilla Dev Logo" className="footer-logo" />
            <p> © 2025 "Portafolio 2.5"</p>
            
        </footer>
    );
};
