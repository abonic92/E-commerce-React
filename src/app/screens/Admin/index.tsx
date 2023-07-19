import React from "react";
import Dashboard from "./dashboard";

const AdminPage: React.FC = () => {
  return (
    <div>
      <h2>Welcome, Admin!</h2>
      <div className="adminContainer">
        <Dashboard />
        {/* Contenido específico para la página de administrador */}
      </div>
    </div>
  );
};

export default AdminPage;