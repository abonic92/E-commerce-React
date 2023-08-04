import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";


const CompraExitosa: React.FC = () => {
  return (
    <div>
      <h2>¡Compra realizada con éxito!</h2>
      <p>Gracias por tu compra.</p>
      <Link to="/">Volver a la página principal</Link>
    </div>
  );
};

export default CompraExitosa;