import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';

  return loggedIn ? <Navigate to="/" replace /> : <>{children}</>;
};

export default PrivateRoute;
