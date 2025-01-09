import React, { useContext, useRef,  } from "react";  //Este hook nos permite acceder al estado global y a las acciones definidas en el archivo de Flux.
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


  // Asegúrate de inicializar EmailJS correctamente
  emailjs.init('b304yeqAN6dPuVE9b'); // Tu clave pública

  // Función handleChange, para que cuando el usuario escribe algo en un campo del formulario, esta función se ejecuta.
  const handleChange = (e) => {
    const { name, value } = e.target; //Aquí obtenemos el nombre del campo (name) y su nuevo valor (value) de cada input (nombre, email y contenido). Estos son extraídos del evento onChange.
    // Actualizamos el estado del formulario a través de Flux
    actions.actualizarFormulario({ name, value }); // Usamos la acción para actualizar el estado del formulario cuando escribimos.
  };

  
  // Maneja el envío del formulario usando emailjs.sendForm
 const handleSubmit = (e) => { 
  e.preventDefault(); // Evita que la página se recargue al enviar el formulario

    const btn = document.getElementById('btn-contacto');
    btn.value = 'Enviando...'; // Cambiar el valor del botón mientras se envía el email

    const serviceID = 'service_2p0ee1f'; // Usar el ID de tu servicio EmailJS
    const templateID = 'template_m80odf1'; // ID de tu plantilla EmailJS

    emailjs.sendForm(serviceID, templateID, e.target).then(() => {
      // Cuando el mensaje se envíe con éxito
      btn.value = 'Enviar'; // Restablece el texto del botón
      actions.actualizarMensaje("Mensaje enviado correctamente"); // Muestra el mensaje en la interfaz
      actions.actualizarFormulario({ name: "from_name", value: "" }); // Limpia el campo nombre
      actions.actualizarFormulario({ name: "email_id", value: "" }); // Limpia el campo email
      actions.actualizarFormulario({ name: "mensaje", value: "" }); // Limpia el campo contenido
    })
    .catch((err) => {
      // Si hay un error al enviar el mensaje
      btn.value = 'Enviar'; // Restablece el texto del botón
      actions.actualizarMensaje("Hubo un error al enviar el mensaje: " + err.text); // Muestra el error en la interfaz
      console.error("Error de EmailJS:", err); // Muestra más detalles en la consola
  });
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
            name="from_name"  /* Asegúrate de que coincida con el nombre en el estado de Flux */
            className="formulario-control"
            value={store.formulario.from_name}  /* Aquí accedemos al valor desde el store */
            onChange={handleChange}  /* Actualiza el estado cuando se escribe */
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
            name="email_id" /* Este debe coincidir con la plantilla de EmailJS */
            className="formulario-control"
            value={store.formulario.email_id} /* Aquí accedemos al valor desde el store */
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
            name="mensaje"  /* Este debe coincidir con la plantilla de EmailJS */
            className="formulario-control"
            rows="4"
            value={store.formulario.mensaje}  /* Aquí accedemos al valor desde el store */
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" id="btn-contacto" className="btn btn-contacto">Enviar</button>
      </form>
    </section>
  );
};
