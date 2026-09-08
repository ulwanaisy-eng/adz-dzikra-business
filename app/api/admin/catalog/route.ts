import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { readCmsFile, writeCmsFile, writeBinaryFile } from "@/lib/github-cms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PRODUCTS = "data/products.json";
const SETTINGS = "data/settings.json";

async function readJson(path: string) {
  const file = await readCmsFile(path);
  return {
    value: JSON.parse(Buffer.from(file.content, "base64").toString("utf8")),
    sha: file.sha as string
  };
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [products, settings] = await Promise.all([readJson(PRODUCTS), readJson(SETTINGS)]);
  return NextResponse.json({ products: products.value, settings: settings.value });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const product = body.product;
    const settings = body.settings;
    if (!product?.id || !product?.titleId || !product?.price_po) {
      return NextResponse.json({ error: "Nama produk, ID/slug, dan harga wajib diisi." }, { status: 400 });
    }

    const [currentProducts, currentSettings] = await Promise.all([readJson(PRODUCTS), readJson(SETTINGS)]);
    const products = Array.isArray(currentProducts.value) ? currentProducts.value : [];
    const existingIndex = products.findIndex((p: { id: string }) => p.id === product.id);

    if (existingIndex >= 0) products[existingIndex] = product;
    else products.push(product);

    if (body.images?.length) {
      const uploaded: string[] = [];
      for (const image of body.images) {
        const data = typeof image.data === "string" ? image.data : "";
        const match = data.match(/^data:image\/(jpeg|jpg|png|webp);base64,(.+)$/);
        if (!match) continue;
        const ext = match[1] === "jpeg" || match[1] === "jpg" ? "jpg" : match[1];
        const safe = String(product.id).toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");
        const path = `public/products/${safe}-${Date.now()}-${uploaded.length + 1}.${ext}`;
        await writeBinaryFile(path, match[2], `cms: upload product image ${product.id}`);
        uploaded.push(`/products/${path.split("/").pop()}`);
      }
      product.images = [...(Array.isArray(product.images) ? product.images : []), ...uploaded];
      if (existingIndex >= 0) products[existingIndex] = product;
    }

    await writeCmsFile(PRODUCTS, JSON.stringify(products, null, 2) + "\n", `cms: ${existingIndex >= 0 ? "update" : "add"} product ${product.id}`, currentProducts.sha);

    if (settings) {
      await writeCmsFile(SETTINGS, JSON.stringify(settings, null, 2) + "\n", "cms: update homepage settings", currentSettings.sha);
    }

    return NextResponse.json({ ok: true, product, message: "Tersimpan. Vercel akan deploy otomatis dari commit CMS." });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Gagal menyimpan." }, { status: 500 });
  }
}
