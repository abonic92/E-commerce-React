import React from "react";

interface EditModalProps {
  isConfirmationModalOpen: boolean;
  handleConfirmationModalClose: () => void;
  handleConfirmation: () => void;
  isModalOpen: boolean;
  handleModalClose: () => void;
  editingProduct: Product | null;
  newProductTitle: string;
  setNewProductTitle: (title: string) => void;
  newProductPrice: string;
  setNewProductPrice: (price: string) => void;
  newProductDescription: string;
  setNewProductDescription: (description: string) => void;
  imageURLs: string[];
  setImageURLs: (urls: string[]) => void;
  isUpdating: boolean;
  handleModalSubmit: () => void;
}

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

const EditModal: React.FC<EditModalProps> = ({
  isConfirmationModalOpen,
  handleConfirmationModalClose,
  handleConfirmation,
  isModalOpen,
  handleModalClose,
  editingProduct,
  newProductTitle,
  setNewProductTitle,
  newProductPrice,
  setNewProductPrice,
  newProductDescription,
  setNewProductDescription,
  imageURLs,
  setImageURLs,
  isUpdating,
  handleModalSubmit,
}) => {
  const handleAddImageURL = () => {
    setImageURLs([...imageURLs, ""]);
  };

  const handleRemoveImageURL = (index: number) => {
    const updatedImageURLs = [...imageURLs];
    updatedImageURLs.splice(index, 1);
    setImageURLs(updatedImageURLs);
  };

  return (
    <>
      {isConfirmationModalOpen && (
        <div className="customOverlay">
          <div className="customModal">
            <h2>¿Estás seguro que deseas eliminar este producto?</h2>
            <div className="confirmationButtons">
              <button className="customButtonAceptar" onClick={handleConfirmation}>
                ACEPTAR
              </button>
              <button className="customButtonEliminar" onClick={handleConfirmationModalClose}>
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="customOverlay">
          <div className="customModal">
            <h2>Editar Producto</h2>
            {editingProduct && (
              <form onSubmit={(e) => { e.preventDefault(); handleModalSubmit(); }}>
                <div>
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    value={newProductTitle}
                    onChange={(e) => setNewProductTitle(e.target.value)}
                    className="customInput"
                  />
                </div>
                <div>
                  <label htmlFor="price">Price:</label>
                  <input
                    type="number"
                    id="price"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    className="customInput"
                  />
                </div>
                <div>
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    value={newProductDescription}
                    onChange={(e) => setNewProductDescription(e.target.value)}
                    className="customInput"
                  />
                </div>
                <div>
                  <label>Images:</label>
                  <div>
                    {imageURLs.map((url, index) => (
                      <div key={index}>
                        <input
                          type="text"
                          value={url}
                          onChange={(e) => {
                            const updatedImageURLs = [...imageURLs];
                            updatedImageURLs[index] = e.target.value;
                            setImageURLs(updatedImageURLs);
                          }}
                        />
                        <button type="button" onClick={() => handleRemoveImageURL(index)}>
                          Remove
                        </button>
                      </div>
                    ))}
                    <div>
                      <button type="button" onClick={handleAddImageURL}>
                        Add Image URL
                      </button>
                    </div>
                  </div>
                </div>
                <button type="submit" disabled={isUpdating} className="customButtonAceptar">
                  Guardar
                </button>
                <button
                  onClick={handleModalClose}
                  disabled={isUpdating}
                  className="customButtonEliminar"
                >
                  Cancelar
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;
