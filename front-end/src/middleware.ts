import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_API_URL = "http://localhost:9090/auth/me";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  if (token && pathname === "/login") {
    const isTokenValid = await fetch(AUTH_API_URL, {
      headers: { Cookie: `authToken=${token}` },
    }).then((res) => res.ok);
    if (isTokenValid) {
      return NextResponse.redirect(new URL("/pedidos", request.url));
    }
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const res = await fetch(AUTH_API_URL, {
      headers: { Cookie: `authToken=${token}` },
    });

    if (res.ok) {
      if (pathname === "/") {
        return NextResponse.redirect(new URL("/pedidos", request.url));
      }
      return NextResponse.next();
    }

    const redirectUrl = new URL("/login", request.url);
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.delete("authToken");
    return response;
  } catch (error) {
    console.error("Erro no middleware:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|register).*)"],
};
