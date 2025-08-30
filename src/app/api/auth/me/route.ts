import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function handleAuthRequest() {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Verificar el token con el backend
    const res = await fetch(`${process.env.BACKEND_URL}/auth/me`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    if (!res.ok) {
      // Si el token es inválido, intentar refresh
      const refreshToken = (await cookies()).get("refreshToken")?.value;

      if (!refreshToken) {
        return NextResponse.json({ error: "Sesión expirada" }, { status: 401 });
      }

      // Intentar refresh token
      const refreshRes = await fetch(
        `${process.env.BACKEND_URL}/auth/refresh`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!refreshRes.ok) {
        return NextResponse.json({ error: "Sesión expirada" }, { status: 401 });
      }

      const refreshData = await refreshRes.json();
      // El backend devuelve access_token, no accessToken
      const newAccessToken = refreshData.access_token;

      // Actualizar cookie con nuevo token
      const response = NextResponse.json({
        success: true,
        message: "Token renovado",
      });

      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 15,
      });

      return response;
    }

    const userData = await res.json();
    return NextResponse.json({
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return handleAuthRequest();
}

export async function POST() {
  return handleAuthRequest();
}
