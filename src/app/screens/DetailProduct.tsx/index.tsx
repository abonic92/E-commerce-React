import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";
import styles from "./styles.module.css";
import useProductByID from "../../hooks/useProductByID";
import { useCartContext } from "../../hooks/CartContext";
import ProductsByCategory from "../ProductsCategories";

const DetailProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const { product, isLoading, error } = useProductByID(Number(productId));
  const { addToCart } = useCartContext();

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity: 1 });
    }
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !error && product) {
      setSelectedImage(product.images[0]);
    }
  }, [isLoading, error, product]);

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

  const handleThumbnailClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            {selectedImage ? (
              <img src={selectedImage} alt="Selected" />
            ) : product.images.length > 0 ? (
              <img src={product.images[0]} alt="Main" />
            ) : (
              <div>No Image Available</div>
            )}
          </div>
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
        <div className={styles.dataColumn}>
          <div className={styles.productInfo}>
            <h2 className={styles.productTitle}>{product.title}</h2>
            <p className={styles.productPrice}>Price: {product.price}</p>
            <p className={styles.productDescription}>Description: {product.description}</p>

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
