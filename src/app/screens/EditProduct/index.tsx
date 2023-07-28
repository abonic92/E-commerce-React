import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";
import CardList from "../../components/CardList";
import CardChildren from "../../components/CardChildren";
import useProducts from "../../hooks/useProducts";
import useEditProduct from "../../hooks/useEditProduct";
import useDeleteProduct from "../../hooks/useDeleteProduct";
import { useQueryClient } from "react-query";
import Dash from "../../components/Dash";
import EditModal from "../../components/ModalProduct/editModal";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
}

const ProductAdmin: React.FC = () => {
  const {
    productsData: data,
    isLoadingProducts,
    productsError: error,
  } = useProducts('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductImages, setNewProductImages] = useState<string[]>([]);

  const { error: editError, success, editProductMutation, isLoading: isUpdating, handleSuccess } =
    useEditProduct(); // Utiliza el nuevo hook de edición de productos

  const { deleteProductMutation } = useDeleteProduct({
    setError: console.error,
  });

  const queryClient = useQueryClient();

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProductTitle(product.title);
    setNewProductPrice(product.price.toString());
    setNewProductDescription(product.description);
    setNewProductImages(product.images);
    setIsModalOpen(true);
  };

  const [imageURLs, setImageURLs] = useState<string[]>(newProductImages);
  useEffect(() => {
    setImageURLs(newProductImages);
  }, [newProductImages]);

  const handleAddImageURL = () => {
    setImageURLs([...imageURLs, ""]);
  };

  const handleRemoveImageURL = (index: number) => {
    const updatedImageURLs = [...imageURLs];
    updatedImageURLs.splice(index, 1);
    setImageURLs(updatedImageURLs);
  };

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleDeleteProduct = async (productId: number) => {
    try {
      // Realiza la solicitud de eliminación utilizando el método fetch
      await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
        method: "DELETE",
      });
      queryClient.invalidateQueries("products");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleConfirmation = () => {
    if (productToDelete) {
      handleDeleteProduct(productToDelete.id);
      setIsConfirmationModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setProductToDelete(null);
    setIsConfirmationModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async () => {
    if (
      editingProduct &&
      newProductTitle.trim() !== "" &&
      newProductPrice.trim() !== "" &&
      !isNaN(parseFloat(newProductPrice)) &&
      imageURLs.length >= 1
    ) {
      const { id } = editingProduct;
      try {
        await editProductMutation(id, {
          title: newProductTitle,
          price: parseFloat(newProductPrice),
          description: newProductDescription,
          images: imageURLs,
        });
      } catch (error) {
        console.error("Error updating product:", error);
      }

      setIsModalOpen(false);
    }
  };

  if (isLoadingProducts) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <section className={styles.layout}>
      <div className={styles.sidebar}>
        <Dash />
      </div>
      <div className={styles.productList}>
        <h2>Edicion de Productos</h2>
        <CardList>
          {data?.map((product) => (
            <div key={product.id}>
              <CardChildren
                image={product.images[0]}
                title={product.title}
                price={product.price}
                description={product.description}
              />
              <button className={styles.editButton} onClick={() => handleEditProduct(product)}>
                Editar
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => {
                  setProductToDelete(product);
                  setIsConfirmationModalOpen(true);
                }}
              >
                Eliminar
              </button>
            </div>
          ))}
        </CardList>

        {/* Include the EditModal component here */}
        <EditModal
          isConfirmationModalOpen={isConfirmationModalOpen}
          handleConfirmationModalClose={handleCancelDelete}
          handleConfirmation={handleConfirmation}
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
          editingProduct={editingProduct}
          newProductTitle={newProductTitle}
          setNewProductTitle={setNewProductTitle}
          newProductPrice={newProductPrice}
          setNewProductPrice={setNewProductPrice}
          newProductDescription={newProductDescription}
          setNewProductDescription={setNewProductDescription}
          imageURLs={imageURLs}
          setImageURLs={setImageURLs}
          isUpdating={isUpdating}
          handleModalSubmit={handleModalSubmit}
        />
      </div>
    </section>
  );
};

export default ProductAdmin;
