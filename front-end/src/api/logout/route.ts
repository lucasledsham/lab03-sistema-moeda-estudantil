import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const LOGOUT_API_URL = `http://localhost:9090/auth/logout`;

export async function GET(request: NextRequest) {
  const token = (await cookies()).get("authToken")?.value;

  try {
    if (token) {
      await fetch(LOGOUT_API_URL, {
        method: "POST",
        headers: {
          Cookie: `authToken=${token}`,
        },
      });
    }
  } catch (error) {
    console.error("Erro ao chamar a API de logout do backend:", error);
  }

  const redirectURL = new URL("/login", request.url);
  const response = NextResponse.redirect(redirectURL, { status: 302 });
  response.cookies.delete("authToken");

  return response;
}
