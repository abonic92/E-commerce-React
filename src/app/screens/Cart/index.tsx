import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useCartContext } from "../../hooks/CartContext"; // Importar el contexto CartContext
import styles from "./styles.module.css";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

const DetailCart: React.FC = () => {
  const { cartItems, decreaseQuantity, addToCart, removeFromCart } = useCartContext();
  const [products, setProducts] = useState<Product[]>([]);

  const handleFinishPurchase = () => {
    clearCart();
    return <Navigate to="/confirmacion" />;
    
  };

 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://api.escuelajs.co/api/v1/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProducts();
  }, []);

  const getTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return totalPrice;
  };

  return (
    <div className={styles.container}>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <img src="/bolsa3.png" alt="Empty Cart" className={styles.logo} />
          <h2>Your cart is empty.</h2>
          <Link to="/products" className={styles.exploreButton}>
            Explore Products
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.total}>
            <p>Total Price: $ {getTotalPrice()}</p>
          </div>
          <div className={styles.cardsContainer}>
            {cartItems.map((item) => {
              const product = products.find((p) => p.id === item.id);

              return (
                <div className={styles.contenedorGral} key={item.id}>
                  <div className={styles.card}>
                    {product && (
                      <img src={product.images[0]} alt={product.title} className={styles.productImage} />
                    )}

                    <div className={styles.cardContent}>
                      <h3>{item.title}</h3>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: {item.price}</p>
                    </div>
                    <div className={styles.subtotal}>Subtotal: ${item.price * item.quantity}</div>
                    <div className={styles.buttonsContainer}>
                      <button
                        className={`${styles.addButtones} buttones bttn`}
                        onClick={() => addToCart({ ...item, quantity: item.quantity + 1 })}
                      >
                        +
                      </button>
                      <button
                        className={`${styles.subtractButtones} buttones bttn`}
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <button
                        className={`${styles.removeButtones} buttones bttn-dark`}
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            
            <div className={styles.checkoutContainer}>
              <button onClick={handleFinishPurchase} className={styles.exploreButton}>
                Finalizar compra
              </button>
              <Link to="/products" className={styles.exploreButton}>
                Seguir comprando
              </Link>
            </div>
          </div>
          <div className={styles.total}>
            <p>Total Price: $ {getTotalPrice()}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailCart;
function clearCart() {
  throw new Error("Function not implemented.");
}

