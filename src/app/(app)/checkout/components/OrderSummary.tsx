import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingCartItem,
  useShoppingCart,
} from "@/contexts/ShoppingCartContext";
import { Minus, Plus, X } from "lucide-react";
import ProductImage from "../../products/components/ProductImage";

export default function OrderSummary() {
  const { cartItems, incrementQuantity, decrementQuantity, deleteCartItem } =
    useShoppingCart();

  const subTotal = cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 p-2">
        <div>
          <div className="space-y-2">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
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
        <CouponSection />
      </div>
    </div>
  );
}

function CouponSection() {
  return (
    <div>
      <h2 className="text-lg mb-2">Do you have a coupon?</h2>
      <Input placeholder="Enter coupon code" />
      <Button variant={"secondary"} className="w-full mt-4">
        Apply
      </Button>
    </div>
  );
}

function CartItem({ item }: { item: ShoppingCartItem }) {
  const { deleteCartItem, incrementQuantity, decrementQuantity } =
    useShoppingCart();
  return (
    <div className="flex justify-between items-center rounded-xs bg-secondary text-secondary-foreground p-2">
      <div className="flex gap-2">
        <div className="relative">
          <button
            onClick={() => deleteCartItem(item.id)}
            className="absolute top-0 left-0 -translate-1/2 bg-destructive p-0.5 flex justify-center items-center z-10 [&_svg]:size-4 rounded-full"
          >
            <X />
          </button>
          <ProductImage src={item.image_url} alt="" className="w-20" />
        </div>
        <div className="flex flex-col justify-between items-start">
          <h4>{item.title}</h4>
          <div className="text-sm font-semibold">
            <p>
              Frame{" "}
              <span className="font-normal text-muted-foreground">
                {item.frame_color}
              </span>
            </p>
            <p>
              Lense{" "}
              <span className="font-normal text-muted-foreground">
                {item.lense_color}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <Button
          variant={"outline"}
          size={"icon"}
          className="size-6"
          onClick={() => incrementQuantity(item.id)}
        >
          <Plus className="size-3" />
        </Button>
        <div className="text-sm">{item.quantity}</div>
        <Button
          variant={"outline"}
          size={"icon"}
          className="size-6"
          onClick={() => decrementQuantity(item.id)}
        >
          <Minus className="size-3" />
        </Button>
      </div>
      <div className="">
        <span className="font-semibold text-lg">
          Rs {item.quantity * item.price}
        </span>
      </div>
    </div>
  );
}
