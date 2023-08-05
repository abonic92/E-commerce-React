import React, { createContext, useContext, useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextValue {
  cartItems: Product[];
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

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  const updateCart = (newCartItems: Product[]) => {
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  const addToCart = (product: Product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === existingProduct.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      updateCart(updatedCartItems);
    } else {
      const updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
      updateCart(updatedCartItems);
    }
  };

  const removeFromCart = (productId: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    updateCart(updatedCartItems);
  };

  const decreaseQuantity = (productId: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
    ).filter((item) => item.quantity > 0);
    updateCart(updatedCartItems);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const cartContextValue: CartContextValue = {
    cartItems,
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
