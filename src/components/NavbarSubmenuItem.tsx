import ProductImage from "@/components/ProductImage";

interface Props {
  label: string;
  imgUrl?: string;
}
export default function NavbarCategory({ label, imgUrl }: Props) {
  return (
    <div className="flex justify-start items-center font-semibold gap-4">
      <ProductImage
        src={imgUrl}
        alt=""
        className="size-16 rounded-full shadow-md"
      />
      <p>{label}</p>
    </div>
  );
}
