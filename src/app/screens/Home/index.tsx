import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Bienvenidos a La Tienda E-commerce Store!</h1>
      <p>Explore nuestra amplia gama de productos y categorías.</p>
      <Link to="/">
        <img src="./Logo.png" alt="Logo" className={styles.logo} />
      </Link>
    </div>
  );
}

export default Home;