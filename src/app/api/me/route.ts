import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("accessToken")?.value;

  if (!token) return NextResponse.json({ user: null });

  try {
    const decoded = jwt.decode(token) as { role: string; email: string };
    return NextResponse.json({ user: decoded });
  } catch {
    return NextResponse.json({ user: null });
  }
}
