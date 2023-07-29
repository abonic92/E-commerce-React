import React from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../hooks/CartContext";
import styles from "./styles.module.css";
import Categories from "../Categories";

const DetailCart: React.FC = () => {
  const { cartItems, decreaseQuantity, addToCart, removeFromCart } = useCartContext();

  const getTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return totalPrice;
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <>
            <div className={styles.emptyCart}>
              <img src="/bolsa3.png" alt="Empty Cart" className={styles.logo} />
              <h2>Your cart is empty.</h2>
              {/* Aplica la clase 'exploreButton' al componente Link */}
              <Link to="/products" className={styles.exploreButton}>
                Explore Products
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className={styles.total}>
              <p>Total Price: $ {getTotalPrice()}</p>
            </div>
            <div className={styles.cardsContainer}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.card}>
                  <h3>{item.title}</h3>

                  <div className={styles.cardContent}>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {item.price}</p>
                  </div>
                  <div className={styles.subtotal}>
                    Subtotal: ${item.price * item.quantity}
                  </div>
                  <div className={styles.buttonsContainer}>
                    <button onClick={() => addToCart({ ...item, quantity: item.quantity + 1 })}>+</button>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.total}>
              <p>Total Price: $ {getTotalPrice()}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DetailCart;
