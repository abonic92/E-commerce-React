import React from "react";
import styles from "./styles.module.css";
import Dash from "../../components/Dash";
import Categories from "../Categories";

const AdminPage: React.FC = () => {
  return (
    <>
    <section  className= {styles.layout}>
      
      
      <div  className={styles.sidebar}> 
        <Dash />
      </div>
        
      <div  className= {styles.body}>
      
          
      <h1> "Bienvenido a la sección de Dashboard para administradores"</h1>
      <Categories></Categories>

          </div>
       

        <div className={styles.logoSection}>
          {/* Aquí puedes agregar tu logo */}
          {/* <img src="ruta_del_logo.png" alt="Logo de la empresa" /> */}
        </div>
      
       

        
     
    </section>
    </>
  );
};

export default AdminPage;



