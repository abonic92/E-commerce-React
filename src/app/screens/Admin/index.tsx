import React from "react";
import styles from "./styles.module.css";
import Dash from "../../components/Dash";

const AdminPage: React.FC = () => {
  return (
    <>
    
    <section  className= {styles.layout}>
      
      
      <div  className={styles.sidebar}> 
        <Dash />
      </div>

      <div className={styles.productList}>
        <div  className= {styles.body}>
        
            
          <h1> "Bienvenido a la sección de Dashboard para administradores"</h1>
            <img src="./Logo.png" alt="Logo" className={styles.logo} />

        </div>
       
      </div>
  
     
    </section>
    </>
  );
};

export default AdminPage;



