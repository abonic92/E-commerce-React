import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const Dash: React.FC = () => {

  return (
    <>
    <div className={styles.filtersContainer}>
            <h1 className={styles.filterTitle}>Opciones </h1>

            <li>
                <Link to="/producto/create">Agregar Producto </Link>
            </li>
            <li>
                <Link to="/">Agregar Categorias</Link>
            </li>
            <li>
                <Link to="/">Agregar Categorias</Link>
            </li>
            <li>
                <Link to="/">Agregar Categorias</Link>
            </li>
            
    </div>
    </>
  );
          }

export default Dash;
