import products from "@/data/products.json";
import settings from "@/data/settings.json";

export type Product = (typeof products)[number];
export type SiteSettings = typeof settings;

export const catalog = products as Product[];
export const siteSettings = settings as SiteSettings;
