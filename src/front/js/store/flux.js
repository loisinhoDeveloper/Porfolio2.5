const getState = ({ getStore, setStore }) => {
	return {
	  store: {
		formulario: {
		  nombre: "",
		  email: "",
		  contenido: "",
		},
		message: null, // Mensaje de respuesta a un error o exito... aparece dentro de un div. Si es null o cadena vacial, no se renderiza nada.
	  },
  
	  actions: {
		// Actualiza los valores del formulario en el estado global
		actualizarFormulario: ({ name, value }) => {
		  const store = getStore();
		  setStore({
			formulario: {
			  ...store.formulario,
			  [name]: value,
			},
		  });
		},

		// Acción para manejar el envío de email
		enviarEmail: async (formulario) => {
			try {
			  const response = await emailjs.send(
				'service_2p0ee1f',  // ID de tu servicio de EmailJS
				'template_m80odf1',  // ID de tu plantilla de EmailJS
				formulario,          // Los datos del formulario
				'b304yeqAN6dPuVE9b'    // Tu clave pública de EmailJS
			  );
	
			  if (response.status === 200) {
				setStore({ message: "Mensaje enviado correctamente" });
				setStore({ formulario: { nombre: "", email: "", contenido: "" } });
			  } else {
				setStore({ message: "Hubo un error al enviar el mensaje" });
			  }
			} catch (error) {
			  setStore({ message: `Error al enviar el mensaje: ${error.message}` });
			}
		  },
	   },
	};
};
	
export default getState;