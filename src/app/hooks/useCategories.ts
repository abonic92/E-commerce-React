import { useQuery } from "react-query";

interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

const useCategories = () => {
  return useQuery<Category[], Error>("categories", async () => {
    const response = await fetch("https://api.escuelajs.co/api/v1/categories");
    if (!response.ok) {
      const errorMessage = "Failed to fetch categories";
      throw new Error(errorMessage);
    }
    const data = await response.json();
    return data;
  });
};

export default useCategories;
