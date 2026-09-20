"use client";

import posthog from "posthog-js";
import type { Product } from "@/lib/products";

type EventProperties = Record<string, string | number | boolean | null | undefined>;

let initialized = false;
let registeredTraffic = false;

function getClient() {
  if (typeof window === "undefined") return null;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return null;
  if (!initialized) {
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      capture_pageview: false,
      capture_pageleave: false,
      autocapture: false,
      respect_dnt: true,
      disable_session_recording: false,
      session_recording: {
        maskAllInputs: true,
        maskTextSelector: "[data-ph-mask]",
      },
    });
    initialized = true;
  }
  registerTrafficContext();
  return posthog;
}

function trafficSource(referrer: string, utmSource: string | null) {
  const source = (utmSource || "").toLowerCase();
  if (source.includes("instagram")) return "Instagram";
  if (source.includes("tiktok")) return "TikTok";
  if (source.includes("whatsapp")) return "WhatsApp";
  if (source.includes("google")) return "Google";
  if (!referrer) return "Direct";
  if (/instagram\.com/i.test(referrer)) return "Instagram";
  if (/tiktok\.com/i.test(referrer)) return "TikTok";
  if (/whatsapp\.com/i.test(referrer)) return "WhatsApp";
  if (/google\./i.test(referrer)) return "Google";
  return "Others";
}

function trafficContext(): EventProperties {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer || "";
  return {
    traffic_source: trafficSource(referrer, params.get("utm_source")),
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
  };
}

function registerTrafficContext() {
  if (registeredTraffic || typeof window === "undefined") return;
  const client = posthog;
  client.register(trafficContext());
  registeredTraffic = true;
}

export function track(event: string, properties: EventProperties = {}) {
  const client = getClient();
  if (!client) return;
  const now = new Date().toISOString();
  client.capture(event, {
    ...properties,
    ...trafficContext(),
    page_url: window.location.href,
    referrer: document.referrer || null,
    timestamp: now,
  });
}

function productProperties(product: Product): EventProperties {
  const price = product.status === "PREORDER" ? product.preorderPrice ?? product.retailPrice : product.retailPrice ?? product.preorderPrice;
  return {
    product_id: product.id,
    product_name: product.name,
    category: "kitab",
    publisher: "Dzikra",
    price: price ?? null,
    preorder_status: product.preorderStatus ?? null,
    preorder_batch: product.preorderStartsAt && product.preorderEndsAt ? `${product.preorderStartsAt}_${product.preorderEndsAt}` : null,
    preorder_end_date: product.preorderEndsAt ?? null,
  };
}

export function trackPageView(page: string) {
  track("page_view", { page });
}

export function trackSectionView(section: "about" | "catalog" | "contact") {
  track("section_view", { section });
  if (section === "catalog") track("catalog_view", { page: "homepage" });
}

export function trackHomepageView() { track("homepage_view", { page: "homepage" }); }

export function trackProductView(product: Product) {
  track("product_view", productProperties(product));
  if (product.status === "PREORDER") track("preorder_view", productProperties(product));
}

export function trackProductClick(product: Product) {
  track("product_click", { ...productProperties(product), source_page: "catalog" });
}

export function trackOrderButtonClick(product: Product) {
  const properties = productProperties(product);
  track("order_button_click", properties);
  if (product.status === "PREORDER") track("preorder_order_click", properties);
}

export function trackCheckoutStarted(product: Product) {
  track("checkout_started", productProperties(product));
}

export function trackWhatsAppClick(product?: Product, sourcePage = "homepage") {
  track("whatsapp_click", {
    ...(product ? productProperties(product) : {}),
    source_page: sourcePage,
  });
}

export function trackOrderCreated(properties: { order_id: string; product_id?: string; quantity?: number; total?: number; source?: string; campaign?: string }) {
  track("order_created", properties);
}

export function trackOrderCompleted(properties: { order_id: string; revenue?: number; quantity?: number; campaign?: string }) {
  track("order_completed", properties);
}
