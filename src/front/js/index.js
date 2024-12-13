//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//fuente corinthia instalada con $ npm install @fontsource/corinthia
import "@fontsource/corinthia"; // Peso normal
import "@fontsource/corinthia/700.css"; // Negrita

//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
