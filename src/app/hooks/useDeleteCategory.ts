import { useMutation } from "react-query";

interface UseDeleteCategoryProps {
  setError: (message: string) => void;
}

function useDeleteCategory({ setError }: UseDeleteCategoryProps) {
  const deleteCategoryMutation = useMutation(
    async (categoryId: number) => {
      const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        setError(res.statusText);
        throw new Error(res.statusText);
      }

      // Aquí se espera que la API responda con un booleano que indique si la eliminación fue exitosa.
      return await res.json();
    }
  );

  return { deleteCategoryMutation };
}

export default useDeleteCategory;
