import React, { useState } from "react";
import useEditProduct from "../../hooks/useEditProduct";

const EditProduct: React.FC = () => {
  const { error, success, editProductMutation } = useEditProduct();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const productId = 17; // Replace this with the actual product ID you want to update

    const updatedProduct = {
      title: title,
      price: price,
      // Add other updated fields here
    };

    editProductMutation(productId, updatedProduct);
  };

  return (
    
    <div>
      <h1>Edit Product</h1>
      {error && <p>Error: {error}</p>}
      {success && <p>{success}</p>}
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          required
        /><br />

        {/* You can include other fields you want to edit here */}

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
