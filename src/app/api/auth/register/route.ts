import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, name, lastName } = await req.json();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, lastName }),
    }
  );
  if (!res.ok) {
    return NextResponse.json({ error: "Register failed" }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: "Register successful",
    user: await res.json(),
  });
}
