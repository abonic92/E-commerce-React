import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";
import styles from "./styles.module.css";

interface LoginUserProps {
  setLoggedIn: (loggedIn: boolean) => void;
  setUserName: (userName: string) => void;
}

const LoginUser: React.FC<LoginUserProps> = ({ setLoggedIn, setUserName }) => {
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
      localStorage.setItem("accessToken", data.access_token);
      setLoggedIn(true);
      setUserName(data.name);

      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        navigate("/");
      }
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
