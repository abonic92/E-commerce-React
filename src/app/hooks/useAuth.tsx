// import { useState } from "react";

// const useAuth = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const login = () => {
//     Aquí puedes realizar cualquier lógica adicional necesaria para el inicio de sesión
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     Aquí puedes realizar cualquier lógica adicional necesaria para el cierre de sesión
//     setIsLoggedIn(false);
//   };

//   const checkIsLoggedIn = () => {
//     Aquí puedes realizar cualquier lógica adicional necesaria para verificar el estado de inicio de sesión inicial
//     Por ejemplo, podrías comprobar si hay un token de acceso en el almacenamiento local
//     const accessToken = localStorage.getItem("accessToken");
//     setIsLoggedIn(accessToken !== null);
//   };

//   return { isLoggedIn, login, logout, checkIsLoggedIn };
// };

// export default useAuth;