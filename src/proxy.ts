import { getCurrentUser } from "@/services/AuthService";
import { NextRequest, NextResponse } from "next/server";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  customer: [/^\/customer/],
  admin: [/^\/admin/],
};

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const res = await getCurrentUser();
  const userInfo = res?.userData;

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        // new URL(
        //   `http://localhost:3000/login?redirectPath=${pathname}`,
        //   request.url
        // )
        new URL(`/login?redirectPath=${pathname}`, request.nextUrl.origin)
      );
    }
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/admin",
    "/admin/:page",
    "/customer",
    "/customer/:page",
    
  ],
};
