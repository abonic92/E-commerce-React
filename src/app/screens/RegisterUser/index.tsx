import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";
import styles from "./styles.module.css";

interface RegisterUserProps {
  setLoggedIn: (loggedIn: boolean) => void;
  setUserName: (userName: string) => void;
}

const RegisterUser: React.FC<RegisterUserProps> = ({ setLoggedIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const registerMutation = useMutation(
    async (userData) => {
      const response = await fetch("https://api.escuelajs.co/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...userData,
          avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
        }),
      });

      if (!response.ok) {
        const errorMessage = "Failed to register user";
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data.access_token;
    },
    {
      onSuccess: async (data) => {
        localStorage.setItem("accessToken", data);
        setLoggedIn(true); // Actualiza el estado loggedIn a true

        navigate("/"); // Redirige al usuario a la página principal
      },
    }
  );

  const handleRegister = () => {
    const userData = {
      name,
      email,
      password,
    };
    registerMutation.mutate(userData);
  };

  return (
    <div className={`${styles.container} ${styles.dark}`}>
      <h2>Register</h2>
      {registerMutation.isLoading && <Loader />}
      {registerMutation.isError && <ErrorMessage message={registerMutation.error?.message || "Registration failed"} />}
      <form>
        <div className={styles.inputContainer}>
          <label htmlFor="name" className={styles.inputLabel}>
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="email" className={styles.inputLabel}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password" className={styles.inputLabel}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.input}
          />
        </div>
        <button type="button" onClick={handleRegister} className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
