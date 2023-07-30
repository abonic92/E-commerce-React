import React, { createContext, useContext, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextValue {
  cartItems: Product[];
  totalQuantity: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  const addToCart = (product: Product) => {
    const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);
    if (existingProductIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex].quantity += product.quantity;
      setCartItems(updatedCartItems);
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, { ...product }]);
    }

    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + product.quantity);
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== productId)
    );
    const removedProduct = cartItems.find((item) => item.id === productId);
    if (removedProduct) {
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - removedProduct.quantity);
    }
  };

  const decreaseQuantity = (productId: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
          : item
      ).filter((item) => item.quantity > 0)
    );
    const decreasedProduct = cartItems.find((item) => item.id === productId);
    if (decreasedProduct) {
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalQuantity(0);
  };

  const cartContextValue: CartContextValue = {
    cartItems,
    totalQuantity,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
