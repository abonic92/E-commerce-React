import React from "react";
import { Link } from "react-router-dom";

interface CheckoutProps {
  totalPrice: number;
  totalItems: number;
  onConfirmPurchase: () => void;
  onCancelPurchase: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({
  totalPrice,
  totalItems,
  onConfirmPurchase,
  onCancelPurchase,
}) => {
  return (
    <div>
      <h1>Checkout</h1>
      <p>Total Price: ${totalPrice}</p>
      <p>Total Items: {totalItems}</p>
      <button onClick={onConfirmPurchase}>Confirm</button>
      <button onClick={onCancelPurchase}>Cancel</button>
    </div>
  );
};

export default Checkout;
