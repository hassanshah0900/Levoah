import {
  ShoppingCartItem,
  useShoppingCart,
} from "@/contexts/ShoppingCartContext";
import { ProductVariant } from "@/types/products.types";
import { useWatch } from "react-hook-form";
import { calculateSubtotal } from "../lib/utils";

export default function OrderSummary() {
  const { cartItems } = useShoppingCart();
  const province = useWatch({ name: "shippingAddress.province" });

  return (
    <div className="space-y-2">
      <h2 className="text-xl mb-2">Order Summary</h2>
      <div className="bg-accent p-2 md:p-4 rounded-sm space-y-2">
        <div className="space-y-2">
          {cartItems.map((cartItem) => (
            <OrderSummaryItem key={cartItem.variant.id} cartItem={cartItem} />
          ))}
        </div>
        <div className="border-t border-border pt-2">
          <div className="flex justify-between items-center">
            Subtotal <span>Rs {calculateSubtotal(cartItems)}</span>
          </div>
          {province && (
            <div className="flex justify-between items-center text-sm gap-10">
              Shipping to {province}
              <span className="whitespace-nowrap">Rs 50</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-2 md:p-4 flex justify-between items-center bg-accent rounded-sm text-lg">
        Order Total <span>Rs {calculateSubtotal(cartItems) + 50}</span>
      </div>
    </div>
  );
}

function OrderSummaryItem({ cartItem }: { cartItem: ShoppingCartItem }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <span>
          {cartItem.quantity} x {cartItem.product.title}
        </span>
        <span>Rs {cartItem.variant.price * cartItem.quantity}</span>
      </div>
      {cartItem.product.productType === "glasses" && (
        <>
          {(() => {
            const variant = cartItem.variant as ProductVariant<"glasses">;
            return (
              <>
                <div className="text-xs">
                  Frame{" "}
                  <span className="text-muted-foreground">
                    {variant.attributes.frameColor}
                  </span>
                </div>
                <div className="text-xs">
                  Lense{" "}
                  <span className="text-muted-foreground">
                    {variant.attributes.lenseColor}
                  </span>
                </div>
              </>
            );
          })()}
        </>
      )}
    </div>
  );
}
