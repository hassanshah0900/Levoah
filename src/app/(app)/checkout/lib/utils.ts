import { ShoppingCartItem } from "@/contexts/ShoppingCartContext";

const CODE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

export function generateOrderTrackingCode() {
  let code = "";
  for (let i = 1; i < 9; i++) {
    const alphabetIndex = Math.floor(Math.random() * CODE_CHARACTERS.length);
    code += CODE_CHARACTERS[alphabetIndex];
  }
  const currentYear = new Date(Date.now()).getFullYear();

  return `LEVOAH-${currentYear}-${code}`;
}

export function calculateSubtotal(cartItems: ShoppingCartItem[]) {
  return cartItems.reduce(
    (acc, curr) => acc + curr.quantity * curr.variant.price,
    0
  );
}
