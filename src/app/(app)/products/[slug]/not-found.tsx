import { FaFaceFrown } from "react-icons/fa6";

export default function NotFoundPage() {
  return (
    <div className="flex justify-center items-center h-screen font-semibold">
      <div className="text-4xl text-center flex flex-col items-center gap-5 -mt-20">
        This product either doesn't exist or is removed
        <FaFaceFrown className="size-20" />
      </div>
    </div>
  );
}
