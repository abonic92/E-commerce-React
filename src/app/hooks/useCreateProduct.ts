import { SetStateAction } from "react";
import { useMutation } from "react-query";

function useCreateProduct(setError: { (value: SetStateAction<string>): void; (arg0: string): void; }, setSuccess: { (value: SetStateAction<string>): void; (arg0: string): void; }) {
  const createProductMutation = useMutation(
    async (data) => {
      const res = await fetch("https://api.escuelajs.co/api/v1/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        setError("Failed to create product");
        throw new Error("Failed to create product");
      }
      return await res.json();
    },
    {
      onSuccess: () => {
        setSuccess("Product created successfully");
      },
      onError: () => {
        setError("Failed to create product");
      },
    }
  );

  return createProductMutation;
}

export default useCreateProduct;
