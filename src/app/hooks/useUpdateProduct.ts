import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

interface UseUpdateProductProps {
  setError: React.Dispatch<React.SetStateAction<string>>;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
}

function useUpdateProduct({ setError, setSuccess }: UseUpdateProductProps) {
  const [isLoading, setIsLoading] = useState(false);

  const updateProductMutation = useMutation(
    async (data: {
      id: number;
      title?: string;
      price?: number;
      description?: string;
      images?: string[];
    }) => {
      setIsLoading(true);
      try {
        const { id, ...updateData } = data;

        const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

        if (!res.ok) {
          setError(res.statusText);
          throw new Error(res.statusText);
        }

        setSuccess("Product updated successfully");
        return await res.json();
      } catch (error) {
        setError(error.message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
  );

  return { updateProductMutation, isLoading };
}

export default useUpdateProduct;
