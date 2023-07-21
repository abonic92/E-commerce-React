import { useState } from "react";
import { useMutation } from "react-query";

interface UseCreateCategoryProps {
  setError: React.Dispatch<React.SetStateAction<string>>;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
}

function useCreateCategory({ setError, setSuccess }: UseCreateCategoryProps) {
  const [isLoading, setIsLoading] = useState(false);

  const createCategoryMutation = useMutation(
    async (data: { name: string; image: string }) => {
      setIsLoading(true);
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/categories/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          setError(res.statusText);
          throw new Error(res.statusText);
        }

        setSuccess("Category created successfully");
        return await res.json();
      } catch (error) {
        setError(error.message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
  );

  return { createCategoryMutation, isLoading };
}

export default useCreateCategory;
