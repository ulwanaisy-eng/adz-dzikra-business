import { NextResponse } from "next/server";
import crypto from "node:crypto";

export const runtime = "nodejs";

function sign(value: string) {
  const secret = process.env.DZIKRA_ADMIN_PASSWORD || "";
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: "" }));
  const expected = process.env.DZIKRA_ADMIN_PASSWORD;
  if (!expected) return NextResponse.json({ error: "Admin password is not configured on Vercel." }, { status: 500 });
  if (typeof password !== "string" || !crypto.timingSafeEqual(Buffer.from(password), Buffer.from(expected))) {
    return NextResponse.json({ error: "Password salah." }, { status: 401 });
  }

  const payload = Buffer.from(JSON.stringify({ ok: true, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 })).toString("base64url");
  const token = payload + "." + sign(payload);
  const response = NextResponse.json({ ok: true });
  response.cookies.set("dzikra_admin", token, {
    httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("dzikra_admin", "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 });
  return response;
}
