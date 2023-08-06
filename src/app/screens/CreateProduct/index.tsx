import React, { useState } from "react";
import useCreateProduct from "../../hooks/useCreateProduct";
import useCategories from "../../hooks/useCategories";
import styles from "./styles.module.css";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";
import Dash from "../../components/Dash";

interface Category {
  id: number;
  name: string;
}

const CreateProduct: React.FC = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const createProductMutation = useCreateProduct(setError);

  const { data: categories, isLoading: isLoadingCategories, error: categoriesError } = useCategories();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(e.target.value));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(parseInt(e.target.value));
  };

  const handleAddImageURL = () => {
    setImageURLs([...imageURLs, ""]);
  };

  const handleRemoveImageURL = (index: number) => {
    const updatedImageURLs = [...imageURLs];
    updatedImageURLs.splice(index, 1);
    setImageURLs(updatedImageURLs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      title,
      price,
      description,
      categoryId,
      images: imageURLs.filter((url) => url !== ""),
    };

    try {
      createProductMutation.mutate(productData);
      setSuccess("Product created successfully");
    } catch (error) {
      setError("Failed to create product");
    }
  };

  if (isLoadingCategories) {
    return <Loader />;
  }

  if (categoriesError) {
    return <ErrorMessage message="Error fetching categories" />;
  }

  return (
    <section className={styles.layout}>
      <div className={styles.sidebar}>
        <Dash />
      </div>
      <div className={styles.productList}>
        <div className={styles.body}>
          <h1>Creacion de Productos</h1>
          <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
              {error && <p>{error}</p>}
              {success && <p>{success}</p>}
              <div>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
              <div>
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={handlePriceChange}
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
              <div>
                <label htmlFor="categoryId">Category:</label>
                <select
                  id="categoryId"
                  value={categoryId}
                  onChange={handleCategoryChange}
                >
                  {categories && categories.map((category: Category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
                </select>
              </div>
              <div>
                <label>Images:</label>
                <div>
                  {imageURLs.map((url, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => {
                          const updatedImageURLs = [...imageURLs];
                          updatedImageURLs[index] = e.target.value;
                          setImageURLs(updatedImageURLs);
                        }}
                      />
                      <button type="button" onClick={() => handleRemoveImageURL(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <div>
                    <button type="button" onClick={handleAddImageURL}>
                      Add Image URL
                    </button>
                  </div>
                </div>
              </div>
              <button className={styles.boton} type="submit">Create Product</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateProduct;
