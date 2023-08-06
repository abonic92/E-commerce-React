import { Navigate } from 'react-router-dom';
import { UserData } from '../../screens/Interface';


interface AdminRouteProps {
    children: React.ReactNode;
  }
  
export function AdminRoute({ children }: AdminRouteProps) {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';
  
  const storedUserData = localStorage.getItem("userData");
  const userData: UserData | null = storedUserData ? JSON.parse(storedUserData) : null;
  const isAdmin = userData?.role === 'admin'

  return isAdmin && loggedIn ? (
    <>{children}</> ) : (
    <><Navigate to="/" replace />;</>
    )}; 


