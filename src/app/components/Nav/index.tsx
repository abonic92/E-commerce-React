import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { UserData } from "../../screens/Interface";
import { AdminRoute } from "../AdminRoute";
import Cart from "../Cart";
import { useCartContext } from "../../hooks/CartContext";

interface NavProps {
  loggedIn: boolean;
  handleLogout: () => void;
}

const Nav: React.FC<NavProps> = ({ loggedIn, handleLogout }) => {
  const storedUserData = localStorage.getItem("userData");
  const userData: UserData | null = storedUserData ? JSON.parse(storedUserData) : null;
  const isAdmin = userData?.role === "admin"; // Verificar si el usuario tiene el rol de "admin"
  const navigate = useNavigate();
  const {clearCart} = useCartContext();
  const handleDashboardClick = () => {
    navigate("/adminpage");
  };
  const handleLogout2 = () => {
    handleLogout();
    clearCart();
  }
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <div className={styles.logo}>
          <img src="/Logo.png" alt="Logo" className={styles.logoImg} />
        </div>
      </Link>
      <div className={styles.logo}>
        <ul className={styles.ul}>
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
            <Link to="/cart/detail">Carrito</Link>
          </li>
        </ul>
      </div>
      <div className={styles.ula}>
        <li>
          <Cart />
        </li>

        {loggedIn ? (
          <>
            <li>
              {userData ? (
                <span className={styles.welcomeMsg}>Hola {userData.name}</span>
              ) : null}
            </li>
            {isAdmin && (
              <li>
                <button className={styles.dashboardBtn} onClick={handleDashboardClick}>
                  Dashboard
                </button>
              </li>
            )}
            <li>
              <button className={styles.logoutBtn} onClick={handleLogout2}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register" className={styles.btnR}>
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className={styles.btnL}>
                Login
              </Link>
            </li>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
