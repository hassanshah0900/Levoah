"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Product, ProductType, ProductVariant } from "@/types/products.types";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
export interface ShoppingCartItem<T extends ProductType = ProductType> {
  product: Product<T>;
  variant: ProductVariant<T>;
  quantity: number;
}

interface ShoppingCartContextType {
  cartItems: ShoppingCartItem[];
  addCartItem: (item: ShoppingCartItem) => void;
  deleteCartItem: (item: ShoppingCartItem) => void;
  incrementQuantity: (item: ShoppingCartItem) => void;
  decrementQuantity: (item: ShoppingCartItem) => void;
  isInCart: (
    productId: Product["id"],
    variantId: ProductVariant["id"]
  ) => boolean;
  reset: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | null>(null);

export function ShoppingCartProvider({ children }: PropsWithChildren) {
  const { getItem, setItem } = useLocalStorage("shopping cart");
  const [cartItems, setCartItems] = useState<ShoppingCartItem[]>(
    () => getItem() || []
  );
  const [isOpen, setIsOpen] = useState(false);

  function addCartItem(item: ShoppingCartItem) {
    setCartItems((cartItems) => {
      const existingCartItem = cartItems.find((cartItem) =>
        areCartItemsEqual(cartItem, item)
      );

      if (existingCartItem)
        return cartItems.map((item) =>
          areCartItemsEqual(item, existingCartItem)
            ? { ...existingCartItem, quantity: existingCartItem.quantity + 1 }
            : item
        );
      return [item, ...cartItems];
    });
  }

  function deleteCartItem(item: ShoppingCartItem) {
    setCartItems(
      cartItems.filter((cartItem) => !areCartItemsEqual(cartItem, item))
    );
  }

  function incrementQuantity(item: ShoppingCartItem) {
    setCartItems(
      cartItems.map((cartItem) =>
        areCartItemsEqual(cartItem, item)
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  }

  function decrementQuantity(item: ShoppingCartItem) {
    setCartItems((cartItems) => {
      const cartItem = cartItems.find((cartItem) =>
        areCartItemsEqual(cartItem, item)
      );
      if (cartItem) {
        if (cartItem.quantity > 1)
          return cartItems.map((cartItem) =>
            areCartItemsEqual(cartItem, item)
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          );
        return cartItems.filter(
          (cartItem) => !areCartItemsEqual(cartItem, item)
        );
      }
      return cartItems;
    });
  }

  function isInCart(productId: Product["id"], variantId: ProductVariant["id"]) {
    return !!cartItems.find(
      (cartItem) =>
        cartItem.product.id === productId && cartItem.variant.id === variantId
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

function areCartItemsEqual(item1: ShoppingCartItem, item2: ShoppingCartItem) {
  return (
    item1.product.id === item2.product.id &&
    item1.variant.id === item2.variant.id
  );
}
