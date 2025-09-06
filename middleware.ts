import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { Pages } from "./src/types/enums";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = Pages.LOGIN;
    return NextResponse.redirect(url);
  }

  try {
    const decoded = jwt.decode(token) as { role: string };

    // Ejemplo: solo ADMIN puede entrar a /admin
    if (url.pathname.startsWith(Pages.ADMIN) && decoded.role !== "ADMIN") {
      url.pathname = Pages.UNAUTHORIZED;
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch {
    url.pathname = Pages.LOGIN;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/unauthorized"], // rutas protegidas
};
