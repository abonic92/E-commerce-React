import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";
import styles from "./styles.module.css";
import { LoginUserProps, UserData } from "../Interface";

const LoginUser: React.FC<LoginUserProps> = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

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

  const loginMutation = useMutation<string, Error>(
    async () => {
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
      return access_token;
    },
    {
      onSuccess: async (data) => {
        localStorage.setItem("accessToken", data);
        try {
          const userData = await fetchUserData(data);

          // Guardar los datos del usuario en el localStorage
          localStorage.setItem("userData", JSON.stringify(userData));

          // Actualizar el estado loggedIn a true
          setLoggedIn(true);

          // Redirigir al usuario a la página principal
          navigate("/");
        } catch (error) {
          setError(error.message || "Failed to fetch user data");
        }
      },
    }
  );

  const handleLogin = () => {
    loginMutation.mutate();
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      {loginMutation.isLoading ? (
        <Loader />
      ) : (
        <>
          {loginMutation.isError && <ErrorMessage message={loginMutation.error?.message || "Login failed"} />}
          {!loginMutation.isError && (
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
