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

		// Acción para actualizar los valores del formulario
		actualizarFormulario: ({ name, value }) => {
			const store = getStore(); // Obtén el estado actual
			setStore({
			  formulario: {
				...store.formulario,
				[name]: value, // Actualiza el campo específico
			  },
			});
		  },


		// Enviar formulario a la API (esto sigue siendo parte del estado global) Si la respuesta es exitosa, actualiza el mensaje de éxito en el estado global y limpia el formulario.
		enviarEmail: async () => {
			const { formulario } = getStore(); // Obtenemos el estado actual del formulario
			try {
			  const backendUrl = process.env.REACT_APP_BACKEND_URL; // accederá al valor guardado en el archivo .env
			  console.log("Backend URL:", backendUrl); // Verifica el valor de la URL
			  
			 
			  const response = await fetch(`${backendUrl}/api/enviarEmail`, {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify(formulario), // Enviamos los datos del formulario al backend
			  });
		  
			  if (response.ok) {
				setStore({ message: "Mensaje enviado correctamente" });
				setStore({
				  formulario: { nombre: "", email: "", contenido: "" },
				});
			  } else {
				setStore({ message: "Hubo un problema al enviar el mensaje" });
			  }
			} catch (error) {
			  setStore({ message: `Error: ${error.message}` });
			}
		},		  
	  },
	};
  };
  
  export default getState;
  