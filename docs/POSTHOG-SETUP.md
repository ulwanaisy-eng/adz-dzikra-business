# PostHog untuk Dzikra

Analytics berjalan lewat `lib/analytics.ts` dan tidak mengubah Supabase. Supabase tetap menjadi sumber data produk dan bisnis; PostHog hanya menerima perilaku anonim yang dibutuhkan untuk funnel.

## Environment Vercel

Tambahkan dua variable berikut pada Vercel Project Settings → Environment Variables, lalu pilih Production, Preview, dan Development sesuai kebutuhan:

```text
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Jika key belum diisi, wrapper analytics tidak mengirim event dan website tetap berjalan normal.

## Event utama

- `page_view`, `homepage_view`, `section_view`, `catalog_view`
- `product_view`, `product_click`
- `preorder_view`, `order_button_click`, `preorder_order_click`
- `checkout_started`, `whatsapp_click`
- `order_created`, `order_completed` (siap dipanggil dari order flow Supabase ketika tersedia)

Semua event produk membawa `product_id`, sehingga dapat dicocokkan dengan `products.id` di Supabase. UTM (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`) dan klasifikasi sumber traffic juga disertakan.

Session recording diaktifkan dengan input termask otomatis. Tidak ada password, isi WhatsApp, data pembayaran, atau data pelanggan yang dikirim oleh wrapper ini.
