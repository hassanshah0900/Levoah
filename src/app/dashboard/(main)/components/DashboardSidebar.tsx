"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useClerk } from "@clerk/nextjs";
import { ChevronDown, Glasses, LogOut, Package, Tags } from "lucide-react";
import Link from "next/link";
import { ComponentProps, PropsWithChildren } from "react";
import { toast } from "sonner";

export default function DashboardSidebar() {
  const { signOut } = useClerk();

  function logout() {
    toast.promise(signOut(), {
      loading: "Logging out...",
      error: "Logging out failed. Please try again.",
    });
  }
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Links</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/dashboard/glasses"}>
                    <Glasses />
                    <span>Glasses </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/dashboard/categories"}>
                    <Tags />
                    <span>Categories</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Package />
                  <span>Orders</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout}>
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

function SidebarCollapsibleMenuItem({
  children,
  ...props
}: ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible {...props} className="group/collapsible">
      <SidebarMenuItem>{children}</SidebarMenuItem>
    </Collapsible>
  );
}

function SidebarCollapsibleMenuItemButton({ children }: PropsWithChildren) {
  return (
    <CollapsibleTrigger asChild>
      <SidebarMenuButton>
        {children}
        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
      </SidebarMenuButton>
    </CollapsibleTrigger>
  );
}

function SidebarCollapsibleMenuItemContent({ children }: PropsWithChildren) {
  return <CollapsibleContent> {children}</CollapsibleContent>;
}
