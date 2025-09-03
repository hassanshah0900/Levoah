import QuantitySelector from "@/app/(app)/checkout/components/QuantitySelector";
import ProductImage from "@/app/(app)/products/components/ProductImage";
import {
  ShoppingCartItem,
  useShoppingCart,
} from "@/contexts/ShoppingCartContext";
import { X } from "lucide-react";

interface Props {
  cartItem: ShoppingCartItem;
}
export default function FloatingCartItem({ cartItem }: Props) {
  const { deleteCartItem } = useShoppingCart();

  return (
    <div className="flex flex-col justify-between items-stretch rounded-xs bg-secondary text-secondary-foreground p-2 gap-5">
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
          <h4 className="leading-tight sm:text-lg">
            {cartItem.title} another thing
          </h4>
          <div className="text-xs xs:text-sm font-semibold">
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
      <QuantitySelector cartItem={cartItem} className="hidden" />
      <div className="flex justify-between items-center">
        <QuantitySelector cartItem={cartItem} orientation="HORIZONTAL" />
        <span className="font-semibold sm:text-lg whitespace-nowrap">
          Rs {cartItem.quantity * cartItem.price}
        </span>
      </div>
    </div>
  );
}
