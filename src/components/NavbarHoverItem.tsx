import { ReactNode } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

interface Props {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  label: string;
}
export default function NavbarHoverItem({
  children,
  label,
  open,
  onOpenChange,
}: Props) {
  return (
    <HoverCard openDelay={100} open={open} onOpenChange={onOpenChange}>
      <HoverCardTrigger className="font-semibold cursor-pointer">
        {label}
      </HoverCardTrigger>
      <HoverCardContent className="w-xl" sideOffset={20}>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
          {children}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
