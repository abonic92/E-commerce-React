import { Outlet } from "react-router-dom";
import Nav from "../Nav";

interface LayoutProps {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  userName: string;
  logout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ loggedIn, setLoggedIn, userName, logout }) => {
  return (
    <>
      <Nav loggedIn={loggedIn} userName={userName} logout={logout} />
      <Outlet />
    </>
  );
}

export default Layout;
