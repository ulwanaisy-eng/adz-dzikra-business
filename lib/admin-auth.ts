import crypto from "node:crypto";
import { cookies } from "next/headers";

function sign(value: string) {
  return crypto.createHmac("sha256", process.env.DZIKRA_ADMIN_PASSWORD || "").update(value).digest("hex");
}

export async function isAdmin() {
  if (!process.env.DZIKRA_ADMIN_PASSWORD) return false;
  const token = (await cookies()).get("dzikra_admin")?.value;
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || signature !== sign(payload)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    return data.ok === true && data.exp > Date.now();
  } catch {
    return false;
  }
}
