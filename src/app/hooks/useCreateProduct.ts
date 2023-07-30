import { useMutation } from "react-query";

function useCreateProduct(setError, setSuccess) {
  const createProductMutation = useMutation(
    (data) => {
      return fetch("https://api.escuelajs.co/api/v1/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (!res.ok) {
          setError("Failed to create product");
          throw new Error("Failed to create product");
        }
        return res.json();
      });
    },
    {
      onSuccess: (data) => {
        setSuccess("Product created successfully");
      },
      onError: (error) => {
        setError("Failed to create product");
      },
    }
  );

  return createProductMutation;
}

export default useCreateProduct;
