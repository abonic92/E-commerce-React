import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";


const Confirmacion: React.FC = () => {
  return (
    <div>
      <h2>¡Compra realizada con éxito!</h2>
      <p>Gracias por tu compra.</p>

      <Link to="/"><span className={styles.exploreButton}> Volver a la página principal </span> </Link>
    </div>
    
  );
};

export default Confirmacion;