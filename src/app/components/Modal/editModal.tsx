import React, { ReactNode } from "react";
import "./customModalStyles.css";

interface Category {
  id: number;
  name: string;
  image: string;
}

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="customOverlay">
      <div className="customModal">
        {children}
      </div>
    </div>
  );
};

interface EditModalProps {
  isConfirmationModalOpen: boolean;
  handleConfirmationModalClose: () => void;
  handleConfirmation: () => void;
  isModalOpen: boolean;
  handleModalClose: () => void;
  editingCategory: Category | null;
  newCategoryName: string;
  setNewCategoryName: React.Dispatch<React.SetStateAction<string>>;
  newCategoryImage: string;
  setNewCategoryImage: React.Dispatch<React.SetStateAction<string>>;
  isUpdating: boolean;
  handleModalSubmit: () => Promise<void>;
}

const EditModal: React.FC<EditModalProps> = ({
  isConfirmationModalOpen,
  handleConfirmationModalClose,
  handleConfirmation,
  isModalOpen,
  handleModalClose,
  editingCategory,
  newCategoryName,
  setNewCategoryName,
  newCategoryImage,
  setNewCategoryImage,
  isUpdating,
  handleModalSubmit,
}) => {
  return (
    <>
      {/* Modal de confirmación */}
      <CustomModal isOpen={isConfirmationModalOpen} onRequestClose={handleConfirmationModalClose}>
        <h2>¿Estás seguro que deseas eliminar esta categoría?</h2>
        <div className="confirmationButtons">
          <button className="customButtonAceptar" onClick={handleConfirmation}>
            ACEPTAR
          </button>
          <button className="customButtonCancelar" onClick={handleConfirmationModalClose}>
            CANCELAR
          </button>
        </div>
      </CustomModal>

      {/* Modal de edición */}
      <CustomModal isOpen={isModalOpen} onRequestClose={handleModalClose}>
        <h2>Editar Categoría</h2>
        {editingCategory && (
          <form onSubmit={(e) => { e.preventDefault(); handleModalSubmit(); }}>
            <div className="contenedorCustomInput">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="customInput"
              />
            </div>
            <div className="contenedorCustomInput">
              <label htmlFor="image">URL de la imagen:</label>
              <input
                type="text"
                id="image"
                value={newCategoryImage}
                onChange={(e) => setNewCategoryImage(e.target.value)}
                className="customInput"
              />
            </div>
            <button type="submit" disabled={isUpdating} className="customButtonAceptar">
              Guardar
            </button>
            <button
              onClick={handleModalClose}
              disabled={isUpdating}
              className="customButtonCancelar"
            >
              Cancelar
            </button>
          </form>
        )}
      </CustomModal>
    </>
  );
};

export default EditModal;
