import { NextResponse } from "next/server";
import { catalog, siteSettings } from "@/lib/catalog";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({ products: catalog, settings: siteSettings });
}
