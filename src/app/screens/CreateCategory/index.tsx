import React, { useState } from "react";
import styles from "./styles.module.css";
import Dash from "../../components/Dash";
import { useMutation } from "react-query";

interface Category {
  name: string;
  image: string;
}

const CreateCategory: React.FC = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const createCategoryMutation = useMutation((data: Category) => {
    return fetch("https://api.escuelajs.co/api/v1/categories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          setError(res.statusText);
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((resData) => {
        setSuccess("Category created successfully");
        // Aquí puedes manejar la respuesta del servidor
        console.log(resData);
      })
      .catch((error) => {
        setError(error.message);
      });
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validar los campos antes de enviar la solicitud
    if (!name || !image) {
      setError("Please fill in all the fields");
      return;
    }

    createCategoryMutation.mutate({ name, image });
  };

  return (
    <>
    
    <section  className= {styles.layout}>
      
      
      <div  className={styles.sidebar}> 
        <Dash />
      </div>

      <div className={styles.productList}>
        <div  className= {styles.body}>
        
            
          <h1> "Creación de Categorias"</h1>
          <>
          <div className={styles.container}>
              <form className={styles.form} onSubmit={handleSubmit}>
                {error && <p>{error}</p>}
                {success && <p>{success}</p>}
                <div>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="image">Image URL:</label>
                  <input
                    type="text"
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <button className={styles.boton}type="submit">Create Category</button>
              </form>
             
              </div>
              </>

        </div>
       
     
      </div>
  
     
    </section>
    </>
  );
};

export default CreateCategory;



