import { Outlet } from "react-router-dom";
import Nav from "../Nav";

interface LayoutProps {
  loggedIn: boolean;
  userName: string;
  handleLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ loggedIn,  handleLogout }) => {
  return (
    <>
      <Nav loggedIn={loggedIn}  handleLogout={handleLogout} />
      <Outlet />
    </>
  );
}

export default Layout;
