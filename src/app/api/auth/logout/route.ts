import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Obtener el token de acceso de las cookies
    const accessToken = (await cookies()).get("accessToken")?.value;

    if (accessToken) {
      // Intentar hacer logout en el backend
      try {
        await fetch(`${process.env.BACKEND_URL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
      } catch (backendError) {
        console.warn(
          "Backend logout failed, but proceeding with local logout:",
          backendError
        );
      }
    }

    // Limpiar cookies HTTP-only independientemente del resultado del backend
    const response = NextResponse.json({
      success: true,
      message: "Logout exitoso",
    });

    // Limpiar cookies con las mismas opciones que se usaron para crearlas
    response.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);

    // Aun si hay error, intentar limpiar las cookies
    const response = NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );

    response.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return response;
  }
}
