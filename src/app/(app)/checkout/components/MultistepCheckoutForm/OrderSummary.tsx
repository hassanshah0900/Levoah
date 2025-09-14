import FloatingCartItem from "@/components/FloatingCartItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";

export default function OrderSummary() {
  const { cartItems, incrementQuantity, decrementQuantity, deleteCartItem } =
    useShoppingCart();

  const subTotal = cartItems.reduce(
    (acc, curr) => acc + curr.variant.price * curr.quantity,
    0
  );
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
        <div className="order-2 sm:order-none">
          <div className="space-y-2">
            {cartItems.map((item) => (
              <FloatingCartItem cartItem={item} key={item.variant.id} />
            ))}
          </div>
          <div className="flex justify-between items-center text-lg p-2 border-highlight/60 border-t ">
            Sub Total
            <span className="text-muted-foreground">Rs {subTotal}</span>
          </div>
          <div className="flex justify-between items-center text-lg p-2 border-highlight/60 border-t">
            Discount
            <span className="text-muted-foreground">- Rs 0</span>
          </div>
          <div className="flex justify-between items-center text-lg p-2 border-highlight/60 border-t">
            Total
            <span>Rs {subTotal}</span>
          </div>
        </div>
        <div className="order-1 sm:order-none">
          <CouponSection />
        </div>
      </div>
    </div>
  );
}

function CouponSection() {
  return (
    <div className="mb-5">
      <h2 className="text-base sm:text-lg mb-2">Do you have a coupon?</h2>
      <Input placeholder="Enter coupon code" />
      <Button variant={"secondary"} size={"sm"} className="w-full mt-2">
        Apply
      </Button>
    </div>
  );
}
