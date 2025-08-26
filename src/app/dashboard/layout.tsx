import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { PropsWithChildren } from "react";
import DashboardSidebar from "./components/DashboardSidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute={"class"} defaultTheme="system">
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <div className="w-full">
            <div className="px-4">{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
