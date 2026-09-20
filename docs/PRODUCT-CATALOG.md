# Katalog produk Dzikra

Katalog publik membaca Supabase secara live ketika environment Supabase tersedia. `content/products.json` adalah template lokal/fallback pengembangan. Satu objek produk—baik dari Supabase maupun JSON—otomatis menghasilkan:

- kartu di katalog beranda;
- halaman detail di `/product/<slug>`;
- metadata SEO berdasarkan nama dan deskripsi;
- tombol **Pesan Sekarang** ketika `orderUrl` berisi URL form Tally.

## Menambah kitab

Untuk katalog live, buka `/admin`, tambahkan kitab, lalu simpan. Form baru memakai status `PREORDER` agar langsung tampil; pilih `READY` atau `SOLD_OUT` bila sesuai. Status `DRAFT` sengaja disembunyikan dari pengunjung sampai editor memilih status publik. Katalog beranda memuat ulang data saat halaman fokus kembali dan setiap 15 detik. Isi hingga lima foto fisik kitab dan URL form Tally pada editor itu.

Untuk pengembangan tanpa Supabase, salin satu objek dalam `content/products.json`, lalu ubah minimal `id`, `slug`, `name`, `description`, `status`, dan `orderUrl`. Isi `images` dengan hingga lima URL foto fisik kitab. Untuk aset lokal, simpan di `public/products/` dan gunakan URL seperti `/products/nama-file.jpg`.

Jangan mengisi `orderUrl` dengan URL contoh. Jika form Tally belum dibuat, biarkan `null`; halaman detail akan memberi tahu pengunjung bahwa form sedang disiapkan.

## Jalur ke CMS

Semua tampilan publik membaca kontrak `Product` dari `lib/products.ts` melalui adapter `lib/public-catalog.ts`. Saat pindah ke Decap CMS, Tina CMS, atau provider lain, cukup ganti adapter tersebut dengan data berformat `Product`; komponen katalog dan halaman detail tidak perlu diubah.

Kolom `order_url` juga sudah disiapkan pada `supabase/schema.sql` dan editor admin.
