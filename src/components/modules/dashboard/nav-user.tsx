/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { LogOut, ChevronsUpDown, Sparkles, House } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUser } from "@/contexts/UserContext";
import { resetCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/services/AuthService";
import { usePathname, useRouter } from "next/navigation";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, setUser } = useUser();

  const router = useRouter();
  const pathname = usePathname();

  //* redux
  const dispatch = useAppDispatch();

  //* go home
  const handleGoHome = () =>{
    router.push('/')
  }

  //! logout
  const handleLogout = async () => {
    await logout();
    setUser(null);
    dispatch(resetCart());

    // if (protectedRoutes.some((route) => pathname.match(route))) {
    window.location.href = "/";
    // }
  };

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={
                      user?.image ||
                      "https://i.ibb.co.com/Fz38g1t/human-celebrating.png"
                    }
                    alt={user?.name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user?.role}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
                {/* <LogOut /> */}
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={
                        user?.image ||
                        "https://i.ibb.co.com/Fz38g1t/human-celebrating.png"
                      }
                      alt={user?.name}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user?.role}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleGoHome}>
                  <House />
                  Go Home
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
              >
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
