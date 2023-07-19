import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";
import styles from "./styles.module.css";
import { LoginUserProps, UserData } from "../Interface";



const LoginUser: React.FC<LoginUserProps> = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorMessage = "Failed to login";
        throw new Error(errorMessage);
      }
      const data = await response.json();
      const { access_token } = data;

      // Guardar el token de acceso en el localStorage
      localStorage.setItem("accessToken", access_token);

      const fetchUserData = async (accessToken: string): Promise<UserData> => {
        const response = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
    
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
    
        const userData = await response.json();
        return userData;
      };

      // Obtener los datos del usuario logueado
      const userData = await fetchUserData(access_token);

      // Guardar los datos del usuario en el localStorage
      localStorage.setItem("userData", JSON.stringify(userData));

      // Actualizar el estado loggedIn a true
      setLoggedIn(true);

      // Redirigir al usuario a la página principal
      navigate("/");
    } catch (error) {
      setError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <div className={styles.container}>
      <h2>Login</h2>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error && <ErrorMessage message={error} />}
          {!error && (
            <form className={styles.form}>
              <div className={styles.inputContainer}>
                <label className={styles.inputLabel}>Email</label>
                <input className={styles.input} type="email" value={email} onChange={handleEmailChange} />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.inputLabel}>Password</label>
                <input className={styles.input} type="password" value={password} onChange={handlePasswordChange} />
              </div>
              <button className={styles.button} type="button" onClick={handleLogin}>
                Login
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default LoginUser;
