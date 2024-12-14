import React, { useContext, useRef, useEffect } from "react";  //Este hook nos permite acceder al estado global y a las acciones definidas en el archivo de Flux.
import { Context } from "../store/appContext"; // Importamos el contexto de Flux
import "../../styles/contacto.css";
import Lottie from 'lottie-react';
import animacionContacto from "../../../assets/iconos/mail.json";
import { gsap } from "gsap";
import emailjs from '@emailjs/browser';






export const Contacto = () => {
  
  const { store, actions } = useContext(Context);
  // Usamos el contexto de Flux para importar las acciones y variables
  const refTitulo = useRef(null); // useRef para crear ese marcador (referencia) le dice a React: "Marca este lugar, pero al principio no lo necesitamos (null). Más adelante, lo usaremos cuando React dibuje la página."

  // Inicializar EmailJS
  useEffect(() => {
    emailjs.init("b304yeqAN6dPuVE9b"); // Sustituye "YOUR_PUBLIC_KEY" con tu clave pública real
  }, []);



  // Función handleChange, para que cuando el usuario escribe algo en un campo del formulario, esta función se ejecuta.
  const handleChange = (e) => {
    const { name, value } = e.target; //Aquí obtenemos el nombre del campo (name) y su nuevo valor (value) de cada input (nombre, email y contenido). Estos son extraídos del evento onChange.
    // Actualizamos el estado del formulario a través de Flux
    actions.actualizarFormulario({ name, value }); // Usamos la acción para actualizar el estado del formulario cuando escribimos.
  };

  /// Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, email, contenido } = store.formulario;
    const formulario = {
      to_name: "Soporte", 
      from_name: nombre,
      email: email,
      message: contenido,
    };
    actions.enviarEmail(formulario);  // Llama a la acción de enviar el correo
  };

  const animarTitulo = () => {
    console.log('Animando título');
    gsap.to(refTitulo.current, { scale: 1.2, duration: 0.3 });
  };
  
  const devolverTitulo = () => {
    console.log('Devolviendo título');
    gsap.to(refTitulo.current, { scale: 1, duration: 0.3 });
  };

  return (
    <section id="contacto" className="contacto-section">
      <h2 ref={refTitulo}
        onMouseEnter={animarTitulo}  // Activamos la animación al pasar el ratón
        onMouseLeave={devolverTitulo}  // Devolvemos el tamaño original al quitar el ratón
      >
        <Lottie animationData={animacionContacto} style={{ width: "70px", height: "90px" }} />
        Contacto</h2>
      {store.message && <div>{store.message}</div>} {/* Mensaje de respuesta */}
      <form onSubmit={handleSubmit}> {/* Cuando el formulario se envíe, ejecutamos handleSubmit */}
        {/* Formulario de Conctacto */}
        <div className="mb-3">
          <label htmlFor="nombre" className="formulario-label">
            Nombre completo
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="formulario-control"
            value={store.formulario.nombre} // Mostramos el valor del input desde el store
            onChange={handleChange} /* Cuando el valor cambie, es decir, cada vez que se escriba en el input, actualiza el store.formulario,  ejecutamos handleChange */
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="formulario-label">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="formulario-control"
            value={store.formulario.email}
            onChange={handleChange} // Llamamos a handleChange aquí
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contenido" className="formulario-label">
            Mensaje
          </label>
          <textarea
            id="contenido"
            name="contenido"
            className="formulario-control"
            rows="4"
            value={store.formulario.contenido}
            onChange={handleChange} // Llamamos a handleChange aquí
            required
          />
        </div>
        <button type="submit" className="btn btn-contacto"> {/* Cuando el formulario se envíe, ejecutamos handleSubmit */}
          Enviar
        </button>
      </form>
    </section>
  );
};
