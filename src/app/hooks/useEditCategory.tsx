import { useState } from 'react';

interface Category {
  id: number;
  name?: string;
  image?: string;
}

const useUpdateCategoryMutation = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const updateCategoryMutation = (categoryId: number, data: Category) => {
    return fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
        setSuccess('Category updated successfully');
        // Here you can handle the server response
        console.log(resData);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return { updateCategoryMutation, error, success };
};

export default useUpdateCategoryMutation;
