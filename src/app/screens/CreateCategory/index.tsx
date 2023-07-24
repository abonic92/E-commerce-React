import React, { useState } from "react";
import styles from "./styles.module.css";
import Dash from "../../components/Dash";
import Categories from "../Categories";
import useCreateCategory from "../../hooks/useCreateCategory";
import Loader from "../../components/Loader";



const CreateCategory: React.FC = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { createCategoryMutation, isLoading } = useCreateCategory({ setError, setSuccess });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createCategoryMutation.mutate({ name, image }).then(() => {
      setSuccess("Category created successfully");
      setName("");
      setImage("");
      setError("");
    });
  };


  return (
    <section className={styles.layout}>
      <div className={styles.sidebar}>
        <Dash />
      </div>

      <div className={styles.productList}>
        <div className={styles.body}>
          <h1>Creación de Categorias</h1>
          {isLoading ? (
            <Loader />
          ) : (
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
                    onChange={handleNameChange}
                  />
                </div>
                <div>
                  <label htmlFor="image">Image URL:</label>
                  <input
                    type="text"
                    id="image"
                    value={image}
                    onChange={handleImageChange}
                  />
                </div>
                <button className={styles.boton} type="submit">Create Category</button>
              </form>
            </div>
          )}
          <Categories />
        </div>
      </div>
    </section>
  );
};

export default CreateCategory;
