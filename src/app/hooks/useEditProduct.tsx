import { useState } from 'react';

const useEditProduct = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const editProductMutation = async (productId: any, data: any) => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setError('Error updating product');
        throw new Error(response.statusText);
      }

      const updatedProduct = await response.json();
      setSuccess('Product updated successfully');
      console.log(updatedProduct);
    } catch (error) {
      setError(error.message);
    }
  };

  return { error, success, editProductMutation };
};

export default useEditProduct;
