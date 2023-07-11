import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function Nav() {
 
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
    </ul>
  </nav>
);
};


export default Nav;
