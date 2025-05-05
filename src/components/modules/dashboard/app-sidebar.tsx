"use client";

import { Bot, Settings, SquareTerminal } from "lucide-react";
import * as React from "react";

import Logo from "@/assets/images/logo/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
// import { NavUser } from "./nav-user";

const data = {

  //* admin nav items
  adminNavItem: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Manage",
      url: "/admin/medicines",
      icon: Bot,
      items: [
        {
          title: "Manage Products",
          url: "/admin/medicines",
        },
        {
          title: "Add Products",
          url: "/admin/addMedicine",
        },
        {
          title: "Manage Users",
          url: "/admin/users",
        },
        {
          title: "Manage Orders",
          url: "/admin/manage-orders",
        },
      ],
    },

    {
      title: "Settings",
      url: "/profile",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/profile",
        },
        {
          title: "Update Profile",
          url: "/update-user",
        },
      ],
    },
  ],

  //* customer nav items
  customerNavItem: [
    {
      title: "Dashboard",
      url: "/customer",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Manage",
      url: "/customer/orders",
      icon: Bot,
      items: [
        // {
        //   title: "Manage Products",
        //   url: "/medicines",
        // },
        // {
        //   title: "Manage Users",
        //   url: "/admin/users",
        // },
        {
          title: "Manage Orders",
          url: "/customer/orders",
        },
      ],
    },
    //ekhane change kora lagbe na eta common rekhechi
    {
      title: "Settings",
      url: "/profile",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/profile",
        },
        {
          title: "Update Profile",
          url: "/update-user",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return <div className="">Loading...</div>;
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              {user?.role === "admin" ? (
                <Link href="/">
                  <div className="flex items-center justify-center">
                    <Logo />
                  </div>
                  {/* <div className="grid flex-1 text-left text-sm leading-tight">
                      <h2 className="font-bold text-xl">MediMart</h2>
                    </div> */}
                </Link>
              ) : (
                <Link href="/customer">
                  <div className="flex items-center justify-center">
                    <Logo />
                  </div>
                  {/* <div className="grid flex-1 text-left text-sm leading-tight">
                      <h2 className="font-bold text-xl">MediMart</h2>
                    </div> */}
                </Link>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {
          <NavMain
            items={
              user?.role === "admin" ? data.adminNavItem : data.customerNavItem
            }
          />
        }
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
        {/* <Button>
          <Link href="/">Back To Home</Link>
        </Button> */}
      </SidebarFooter>
    </Sidebar>
  );
}
