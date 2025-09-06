import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { error: errorData.message || "Credenciales inválidas" },
        { status: res.status }
      );
    }

    const data = await res.json();
    const { access_token: accessToken, refresh_token: refreshToken } = data;

    // Verificar que los tokens existen
    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { error: "Error del servidor: tokens no encontrados" },
        { status: 500 }
      );
    }

    // Guardamos tokens en cookies
    const response = NextResponse.json({
      success: true,
      message: "Login exitoso",
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 15, // 15 minutos
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
