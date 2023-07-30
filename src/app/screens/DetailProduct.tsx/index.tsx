import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";
import styles from "./styles.module.css";
import useProductByID from "../../hooks/useProductByID";
import { useCartContext } from "../../hooks/CartContext";

const DetailProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const { product, isLoading, error } = useProductByID(Number(productId));
  const { addToCart, totalQuantity } = useCartContext();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (!isLoading && !error && product) {
      setSelectedImage(product.images[0]);
    }
  }, [isLoading, error, product]);

  const handleThumbnailClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      const subtotal = product.price * quantity;
      addToCart({ ...product, quantity, subtotal });
      setQuantity(1); // Reset quantity to 1 after adding to cart
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={(error as unknown as Error).message} />;
  }

  if (!product) {
    return <ErrorMessage message="Product not found" />;
  }

  const categoryId = product.category.id.toString();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.thumbnailColumn}>
          {product.images.length > 1 && (
            <div className={styles.thumbnailWrapper}>
              {product.images.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleThumbnailClick(imageUrl)}
                  className={selectedImage === imageUrl ? styles.selectedThumbnail : ""}
                />
              ))}
            </div>
          )}
        </div>
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            {selectedImage ? (
              <img src={selectedImage} alt="Selected" />
            ) : (
              <div>No Image Available</div>
            )}
          </div>
        </div>
        <div className={styles.dataColumn}>
          <div className={styles.productInfo}>
            <h2 className={styles.productTitle}>{product.title}</h2>
            <p className={styles.productPrice}>Price: {product.price}</p>
            <p className={styles.productDescription}>Description: {product.description}</p>

            <div className={styles.quantityControls}>
              <button onClick={handleDecreaseQuantity}>-</button>
              <span className={styles.quantity}>{quantity}</span>
              <button onClick={handleIncreaseQuantity}>+</button>
            </div>

            <div className={styles.subtotal}>
              Subtotal: ${product.price * quantity}
            </div>

            {/* Total Quantity display */}
            <div className={styles.totalQuantity}>Total Quantity in Cart: {totalQuantity}</div>

            <button onClick={handleAddToCart} className={styles.addToCartButton}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
