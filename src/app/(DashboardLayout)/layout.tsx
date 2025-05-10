"use client";

import { AppSidebar } from "@/components/modules/dashboard/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  //* for showing pathname
  const pathname = usePathname();

  //* for showing breadcrumb
  const breadcrumb = pathname
    .split("/")
    .filter(Boolean)
    .map(
      (segment) =>
        segment
          .replace(/-/g, " ") //? Replace dashes with spaces
          .replace(/\b\w/g, (char) => char.toUpperCase()), //? Capitalize first letters
    )
    .join(" > ");

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center justify-between gap-2 px-4 ">
            <SidebarTrigger className="-ml-1 " />
            <h4>{breadcrumb}</h4>
          </div>
        </header>
        <div className="p-4 pt-0 min-h-[90vh]">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
