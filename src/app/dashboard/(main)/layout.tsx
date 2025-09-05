import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";
import DashboardSidebar from "./components/DashboardSidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <div className="w-full">
          <div className="px-4">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
