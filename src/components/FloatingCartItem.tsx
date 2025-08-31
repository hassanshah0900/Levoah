import ProductImage from "@/app/(app)/products/components/ProductImage";
import {
  ShoppingCartItem,
  useShoppingCart,
} from "@/contexts/ShoppingCartContext";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  cartItem: ShoppingCartItem;
}
export default function FloatingCartItem({ cartItem }: Props) {
  const { deleteCartItem, incrementQuantity, decrementQuantity } =
    useShoppingCart();

  return (
    <div className="flex justify-between items-center rounded-xs bg-secondary text-secondary-foreground p-2">
      <div className="flex gap-2">
        <div className="relative">
          <button
            onClick={() => deleteCartItem(cartItem.id)}
            className="absolute top-0 left-0 -translate-1/2 bg-destructive p-0.5 flex justify-center items-center z-10 [&_svg]:size-4 rounded-full"
          >
            <X />
          </button>
          <ProductImage src={cartItem.image_url} alt="" className="w-20" />
        </div>
        <div className="flex flex-col justify-between items-start">
          <h4>{cartItem.title}</h4>
          <div className="text-sm font-semibold">
            <p>
              Frame{" "}
              <span className="font-normal text-muted-foreground">
                {cartItem.frame_color}
              </span>
            </p>
            <p>
              Lense{" "}
              <span className="font-normal text-muted-foreground">
                {cartItem.lense_color}
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
          onClick={() => incrementQuantity(cartItem.id)}
        >
          <Plus className="size-3" />
        </Button>
        <div className="text-sm">{cartItem.quantity}</div>
        <Button
          variant={"outline"}
          size={"icon"}
          className="size-6"
          onClick={() => decrementQuantity(cartItem.id)}
        >
          <Minus className="size-3" />
        </Button>
      </div>
      <div className="">
        <span className="font-semibold text-lg">
          Rs {cartItem.quantity * cartItem.price}
        </span>
      </div>
    </div>
  );
}
