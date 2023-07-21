import React, { useState } from "react";
import { useMutation } from "react-query";
import styles from "./styles.module.css";
import Dash from "../../components/Dash";

interface Product {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

const CreateProduct: React.FC = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const createProductMutation = useMutation((data: Product) => {
    return fetch("https://api.escuelajs.co/api/v1/products/", {
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
        setSuccess("Product created successfully");
        // Here you can handle the server response
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

    // Validate the fields before sending the request
    if (!title || !price || !description || !categoryId || images.length === 0) {
      setError("Please fill in all the fields");
      return;
    }

    createProductMutation.mutate({ title, price, description, categoryId, images });
  };

  return (
  <>
 
    <section  className= {styles.layout}>
      
      
      <div  className={styles.sidebar}> 
        <Dash />
      </div>

        <div className={styles.productList}>
          <div  className= {styles.body}>
          
              
            <h1> "Creacion de Productos"</h1>
            <div className={styles.container}>
                    <form  className={styles.form} onSubmit={handleSubmit}>
                      {error && <p>{error}</p>}
                      {success && <p>{success}</p>}
                      <div>
                        <label htmlFor="title">Title:</label>
                        <input
                          type="text"
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="price">Price:</label>
                        <input
                          type="number"
                          id="price"
                          value={price}
                          onChange={(e) => setPrice(parseFloat(e.target.value))}
                        />
                      </div>
                      <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="categoryId">Category ID:</label>
                        <input
                          type="number"
                          id="categoryId"
                          value={categoryId}
                          onChange={(e) => setCategoryId(parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <label htmlFor="images">Images (separated by commas):</label>
                        <input
                          type="text"
                          id="images"
                          value={images.join(", ")}
                          onChange={(e) => setImages(e.target.value.split(",").map((url) => url.trim()))}
                        />
                      </div>
                      <button type="submit">Create Product</button>
                    </form>
                    </div>


          </div>
        </div>
  
    </section>
  </>
  );
  
};

export default CreateProduct;


