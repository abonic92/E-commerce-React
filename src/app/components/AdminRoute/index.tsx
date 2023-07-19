import { Navigate } from 'react-router-dom';
import { UserData } from '../../screens/Interface';

export const AdminRoute = ({ children }) => {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';
  
  const storedUserData = localStorage.getItem("userData");
  const userData: UserData | null = storedUserData ? JSON.parse(storedUserData) : null;
  const isAdmin = userData?.role === 'admin'

  return isAdmin && loggedIn ? children : <Navigate to="/adminpage" replace />;
};
