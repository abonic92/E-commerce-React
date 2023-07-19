import React, { useState } from "react";
import { useMutation } from "react-query";

interface Category {
  name: string;
  image: string;
}

const CreateCategoryForm: React.FC = () => {
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
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Create Category</button>
    </form>
  );
};

export default CreateCategoryForm;
