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
import { ChevronDown, Glasses, Package, Tags } from "lucide-react";
import Link from "next/link";
import { ComponentProps, PropsWithChildren } from "react";

export default function DashboardSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Links</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarCollapsibleMenuItem>
                <SidebarCollapsibleMenuItemButton>
                  <Glasses />
                  <span>Products</span>
                </SidebarCollapsibleMenuItemButton>
                <SidebarCollapsibleMenuItemContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href={"/dashboard/products"}>List</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href={"/dashboard/products/new"}>New</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarCollapsibleMenuItemContent>
              </SidebarCollapsibleMenuItem>
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
      <SidebarFooter></SidebarFooter>
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
