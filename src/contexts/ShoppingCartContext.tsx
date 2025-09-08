"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Product } from "@/types/products.types";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ShoppingCartItem {
  id?: string;
  image_url: string;
  productId: Product["id"];
  variantId: Product["id"];
  title: string;
  price: number;
  quantity: number;
  attributes: { [key: string]: string };
  frame_color: string;
  lense_color: string;
}

interface ShoppingCartContextType {
  cartItems: ShoppingCartItem[];
  addCartItem: (item: ShoppingCartItem) => void;
  deleteCartItem: (id: ShoppingCartItem["id"]) => void;
  incrementQuantity: (id: ShoppingCartItem["id"]) => void;
  decrementQuantity: (id: ShoppingCartItem["id"]) => void;
  isInCart: (
    productId: ShoppingCartItem["productId"],
    variantId: ShoppingCartItem["variantId"]
  ) => boolean;
  reset: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | null>(null);

export function ShoppingCartProvider({ children }: PropsWithChildren) {
  const { getItem, setItem, removeItem } = useLocalStorage("shopping cart");
  const [cartItems, setCartItems] = useState<ShoppingCartItem[]>(
    () => getItem() || []
  );
  const [isOpen, setIsOpen] = useState(false);

  function addCartItem(item: ShoppingCartItem) {
    setCartItems((cartItems) => {
      const existingCartItem = cartItems.find(
        (cartItem) =>
          cartItem.productId == item.productId &&
          cartItem.variantId == item.variantId
      );

      if (existingCartItem) {
        return cartItems.map((item) =>
          item.productId === existingCartItem.productId &&
          item.variantId === existingCartItem.variantId
            ? { ...existingCartItem, quantity: existingCartItem.quantity + 1 }
            : item
        );
      }
      return [{ ...item, id: crypto.randomUUID() }, ...cartItems];
    });
  }

  function deleteCartItem(id: ShoppingCartItem["id"]) {
    setCartItems(cartItems.filter((item) => item.id !== id));
  }

  function incrementQuantity(id: ShoppingCartItem["id"]) {
    const cartItem = cartItems.find((item) => item.id === id);
    if (cartItem)
      setCartItems(
        cartItems.map((item) =>
          item.id === id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : item
        )
      );
  }

  function decrementQuantity(id: ShoppingCartItem["id"]) {
    setCartItems((cartItems) => {
      const cartItem = cartItems.find((item) => item.id === id);
      if (cartItem) {
        if (cartItem.quantity <= 1)
          return cartItems.filter((item) => item.id !== id);
        return cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return cartItems;
    });
  }

  function isInCart(
    productId: ShoppingCartItem["productId"],
    variantId: ShoppingCartItem["variantId"]
  ) {
    return !!cartItems.find(
      (item) => item.productId === productId && item.variantId === variantId
    );
  }

  function reset() {
    setCartItems([]);
  }

  useEffect(() => {
    setItem(cartItems);
  }, [cartItems]);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        addCartItem,
        deleteCartItem,
        incrementQuantity,
        decrementQuantity,
        isInCart,
        reset,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (!context)
    throw new Error(
      "useShoppingCart hook can only be used inside its Provider."
    );
  return context;
}
