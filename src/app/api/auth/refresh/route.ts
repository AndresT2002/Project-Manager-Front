import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const refreshToken = (await cookies()).get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  const res = await fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Refresh inválido" }, { status: 401 });
  }

  const { accessToken } = await res.json();

  const response = NextResponse.json({ success: true });
  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
  });
  return response;
}
