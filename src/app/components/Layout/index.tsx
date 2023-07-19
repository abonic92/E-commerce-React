import { Outlet } from "react-router-dom";
import Nav from "../Nav";

interface LayoutProps {
  loggedIn: boolean;
  userName: string;
  handleLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ loggedIn, userName, handleLogout }) => {
  return (
    <>
      <Nav loggedIn={loggedIn} userName={userName} handleLogout={handleLogout} />
      <Outlet />
    </>
  );
}

export default Layout;
