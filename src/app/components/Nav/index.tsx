import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

interface NavProps {
  loggedIn: boolean;
  userName: string;
  logout: () => void;
  setLoggedIn: (loggedIn: boolean) => void;
}

const Nav: React.FC<NavProps> = ({ loggedIn, userName, logout, setLoggedIn }) => {
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <div className={styles.logo}>
          <img src="/Logo.png" alt="Logo" className={styles.logoImg} />
        </div>
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/categories">Categorias</Link>
        </li>
        <li>
          <Link to="/products">Productos</Link>
        </li>
        <li>
          <Link to="/Cart">Carrito</Link>
        </li>
        {loggedIn ? (
          <>
            <li>
              <span className={styles.welcomeMsg}>Hola {userName}</span>
            </li>
            <li>
              <button className={styles.logoutBtn} onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register" className={styles.btnR}>Register</Link>
            </li>
            <li>
              <Link to="/login" className={styles.btnL}>Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
