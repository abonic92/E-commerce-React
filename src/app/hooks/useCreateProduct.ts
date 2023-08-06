import { useMutation, UseMutationResult, UseMutateAsyncFunction, UseMutateFunction } from "react-query";

interface ProductData {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

interface CustomMutationResult extends Omit<UseMutationResult<unknown, unknown, ProductData, unknown>, "mutate"> {
  mutate: UseMutateFunction<unknown, unknown, ProductData, unknown>;
  mutateAsync: UseMutateAsyncFunction<unknown, unknown, ProductData, unknown>;
}

function useCreateProduct(setError: React.Dispatch<React.SetStateAction<string>>): CustomMutationResult {
  const createProductMutation = useMutation<
    unknown, // Tipo de retorno en caso de éxito
    unknown, // Tipo de retorno en caso de error
    ProductData, // Tipo de los parámetros de la función de mutación
    unknown // Tipo de los parámetros extra
  >(
    async (data: ProductData) => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          setError("Failed to create product");
          return; // Return early if there's an error, without throwing an exception
        }

        return await res.json();
      } catch (error: unknown) {
        setError((error as Error).message);
        throw error;
      }
    }
  );

  return {
    ...createProductMutation,
    mutate: createProductMutation.mutate,
    mutateAsync: createProductMutation.mutateAsync,
  } as CustomMutationResult;
}
export default useCreateProduct;