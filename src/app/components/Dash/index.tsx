import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const Dash: React.FC = () => {
  return (
    <>
      <div className={styles.filtersContainer}>
        <h1 className={styles.filterTitle}>Opciones</h1>
        <div className={styles.linksContainer}>
          <Link to="/producto/create" className={styles.linkItem}>
            Agregar Producto
          </Link>
          <Link to="/category/create" className={styles.linkItem}>
            Agregar Categorias
          </Link>
          <Link to="/product/edit" className={styles.linkItem}>
            Editar Productos
          </Link>
          <Link to="/category/edit" className={styles.linkItem}>
            Editar Categorias
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dash;
