const getState = ({ getStore, setStore }) => {
	return {
	  store: {
		formulario: {
		  from_name: "",    // Correspondiente a 'nombre' en el formulario que a su vez relacionado con la plantilla emailjs
		  email_id: "",     // Correspondiente a 'email' en el formulario
		  mensaje: "",      // Correspondiente a 'contenido' en el formulario
		},
		message: null, // Mensaje de respuesta (null o vacío no se renderiza)
	  },
	  actions: {
		// Actualiza los valores del formulario en el estado global
		actualizarFormulario: ({ name, value }) => {
		  const store = getStore();
		  setStore({
			formulario: {
			  ...store.formulario,
			  [name]: value,  // Se actualizará el valor correcto según el 'name' del input
			},
		  });
		},
  
		// Actualiza el mensaje de respuesta
		actualizarMensaje: (message) => {
		  const store = getStore();
		  setStore({
			message: message,
		  });
		}
	  },
	};
  };
  
  export default getState;
  