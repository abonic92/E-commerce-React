import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';

  return loggedIn ? <Navigate to="/" replace /> : children;
};
