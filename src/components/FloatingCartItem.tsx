import ProductImage from "@/components/ProductImage";
import QuantitySelector from "@/app/(app)/checkout/components/QuantitySelector";
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
    <div className="flex flex-col justify-between items-stretch rounded-xs bg-secondary text-secondary-foreground p-2 gap-4">
      <div className="flex gap-2">
        <div className="relative">
          <button
            onClick={() => deleteCartItem(cartItem)}
            className="absolute top-0 left-0 -translate-1/2 bg-destructive p-0.5 flex justify-center items-center z-10 [&_svg]:size-4 rounded-full"
          >
            <X />
          </button>
          <ProductImage
            src={cartItem.variant.imageUrl}
            alt=""
            className="w-20"
          />
        </div>
        <div className="flex flex-col items-start gap-1">
          <h4 className="leading-tight sm:text-lg">{cartItem.product.title}</h4>
          {cartItem.product.productType === "glasses" && (
            <GlassesRelatedDetails
              cartItem={cartItem as ShoppingCartItem<"glasses">}
            />
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <QuantitySelector cartItem={cartItem} orientation="HORIZONTAL" />
        <span className="font-semibold sm:text-lg whitespace-nowrap">
          Rs {cartItem.quantity * cartItem.variant.price}
        </span>
      </div>
    </div>
  );
}

function GlassesRelatedDetails({
  cartItem,
}: {
  cartItem: ShoppingCartItem<"glasses">;
}) {
  return (
    <div className="text-xs xs:text-sm">
      <p className="flex gap-1">
        Frame
        <span className="font-normal text-muted-foreground">
          {cartItem.variant.attributes.frameColor}
        </span>
      </p>
      <p className="flex gap-1">
        Lense
        <span className="font-normal text-muted-foreground">
          {cartItem.variant.attributes.lenseColor}
        </span>
      </p>
      <p className="flex gap-1">
        Size
        <span className="font-normal text-muted-foreground">
          {cartItem.product.attributes.lenseWidth}{" "}
          {cartItem.product.attributes.bridgeWidth}
        </span>
      </p>
    </div>
  );
}
