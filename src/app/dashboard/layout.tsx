import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";
import DashboardSidebar from "./components/DashboardSidebar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ThemeToggler } from "@/components/ThemeToggler";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute={"class"} defaultTheme="system">
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <div className="w-full">
            <div className="flex justify-between items-center p-4">
              <SidebarTrigger />
              <ThemeToggler />
            </div>
            <div className="p-5 pt-2">{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
