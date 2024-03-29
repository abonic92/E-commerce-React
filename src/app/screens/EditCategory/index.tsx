import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";
import CardList from "../../components/CardList";
import CardChildren from "../../components/CardChildren";
import useCategories from "../../hooks/useCategories";
import { useQueryClient } from "react-query";
import useDeleteCategory from "../../hooks/useDeleteCategory";
import Dash from "../../components/Dash";
import EditModal from "../../components/Modal/editModal";
import useEditCategory from "../../hooks/useEditCategory";

interface Category {
  id: number;
  name: string;
  image: string;
}

const EditCategory: React.FC = () => {
  const { data, isLoading, error } = useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState("");

  const { updateCategoryMutation, isLoading: isUpdating, handleSuccess } = useEditCategory({
    setError: console.error,
    setSuccess: () => setIsModalOpen(false),
  });

  const { deleteCategoryMutation } = useDeleteCategory({
    setError: console.error,
  });

  const queryClient = useQueryClient();

  // Estado para controlar si el modal de confirmación está abierto o cerrado
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  // Estado para guardar el categoryId al hacer clic en el botón "Eliminar"
  const [deletingCategoryId, setDeletingCategoryId] = useState<number | null>(null);

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setNewCategoryImage(category.image);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (categoryId: number) => {
    // Abrir el modal de confirmación
    setIsConfirmationModalOpen(true);
    // Guardar el categoryId en una variable para usarlo en la función de confirmación
    setDeletingCategoryId(categoryId);
  };

  const handleConfirmationModalClose = () => {
    // Cerrar el modal de confirmación
    setIsConfirmationModalOpen(false);
    // Limpiar el categoryId guardado
    setDeletingCategoryId(null);
  };

  const handleConfirmation = async () => {
    // Cerrar el modal de confirmación
    setIsConfirmationModalOpen(false);

    if (deletingCategoryId !== null) {
      try {
        const response = await deleteCategoryMutation.mutateAsync(deletingCategoryId);

        if (response === true) {
          queryClient.invalidateQueries("categories");
        } else {
          console.error("Error deleting category: Unexpected response");
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async () => {
    if (editingCategory && newCategoryName.trim() !== "" && newCategoryImage.trim() !== "") {
      const { id } = editingCategory;
      await updateCategoryMutation.mutateAsync({ id, name: newCategoryName, image: newCategoryImage });
      handleSuccess();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={(error as Error).message} />;
  }

  return (
    <section className={styles.layout}>
      <div className={styles.sidebar}>
        <Dash />
      </div>

      <div className={styles.productList}>
        <div className={styles.body}>
          <h1>Edicion de Categorias</h1>

          <div>
            <CardList>
              {data?.map((category) => (
                <div className={styles.withButton} key={category.id}>
                  <Link to={`/category/${category.id}/products`}>
                    <CardChildren image={category.image} title={category.name} />
                  </Link>
                  <button className={styles.editButton} onClick={() => handleEditCategory(category)}>
                    Editar
                  </button>
                  <button className={styles.deleteButton} onClick={() => handleDeleteCategory(category.id)}>
                    Eliminar
                  </button>
                </div>
              ))}
            </CardList>
          </div>
        </div>
      </div>

      {/* Include the EditModal component here */}
      <EditModal
        isConfirmationModalOpen={isConfirmationModalOpen}
        handleConfirmationModalClose={handleConfirmationModalClose}
        handleConfirmation={handleConfirmation}
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        editingCategory={editingCategory}
        newCategoryName={newCategoryName}
        setNewCategoryName={setNewCategoryName}
        newCategoryImage={newCategoryImage}
        setNewCategoryImage={setNewCategoryImage}
        isUpdating={isUpdating}
        handleModalSubmit={handleModalSubmit}
      />
    </section>
  );
};

export default EditCategory;
