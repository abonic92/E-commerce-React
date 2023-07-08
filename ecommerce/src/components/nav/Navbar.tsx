import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

const Nav: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const renderAuthLinks = () => {
    if (loggedIn) {
      return (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart/CartDetail">Carrito</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart/CartDetail">Carrito</Link>
          </li>
          <li>
            <Link to="/login/Login">Login</Link>
          </li>
        </>
      );
    }
  };

  return (
    <nav className="navbar navbar-dark">
      <Link to="/">
        <div className="logo">
          <img src="/Latienda.png" alt="Logo" className="logo-img" />
        </div>
      </Link>
      <ul>{renderAuthLinks()}</ul>
    </nav>
  );
};

export default Nav;