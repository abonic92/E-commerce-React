import React from 'react';
import styles from "./styles.module.css";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to My E-commerce Store!</h1>
      <p>Explore our wide range of products and categories.</p>
      <img src="Logo.png" alt="Logo" className={styles.logo} />
      
    </div>
  );
}

export default Home;