import React from "react";
import styles from "./styles.module.css";
import Dash from "../../components/Dash";

const AdminPage: React.FC = () => {
  return (
    <>
    <div className={styles.pageContainer}>
        <Dash />

        {/* Aca el contenido */}

        <p>A ver</p>


        
    </div>
    </>
  );
};

export default AdminPage;