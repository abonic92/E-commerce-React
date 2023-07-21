import { useState } from "react";
import { QueryClient, useMutation, useQueryClient } from "react-query";

interface UseUpdateCategoryProps {
  setError: React.Dispatch<React.SetStateAction<string>>;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
}
export const queryClient = new QueryClient();

function useUpdateCategory({ setError, setSuccess }: UseUpdateCategoryProps) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const updateCategoryMutation = useMutation(
    async (data: { id: number; name?: string; image?: string }) => {
      setIsLoading(true);
      try {
        const { id, ...updateData } = data;

        const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
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

        setSuccess("Category updated successfully");
        return await res.json();
      } catch (error) {
        setError(error.message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
  );

  const handleSuccess = () => {
    queryClient.invalidateQueries("categories");
    setSuccess("Category updated successfully");
  };

  return { updateCategoryMutation, isLoading, handleSuccess };
}

export default useUpdateCategory;
