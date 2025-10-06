import Image from "next/image";
import Link from "next/link";

interface Props {
  label: string;
  imageUrl?: string;
  url: string;
}
export default function NavbarImageItem({ label, imageUrl, url }: Props) {
  return (
    <Link href={url} className="flex justify-start gap-5 items-center">
      {imageUrl && (
        <div className="relative w-14 aspect-square rounded-full bg-accent overflow-hidden">
          <Image src={imageUrl} alt="" fill />
        </div>
      )}
      <span>{label}</span>
    </Link>
  );
}
