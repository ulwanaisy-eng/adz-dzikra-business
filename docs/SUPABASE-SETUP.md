# Mengaktifkan Admin Production

1. Buat proyek Supabase baru.
2. Buka **SQL Editor**, tempel lalu jalankan seluruh isi `supabase/schema.sql`.
3. Di **Authentication > Users**, buat satu akun untuk pengelola Dzikra. Nonaktifkan public sign-up bila hanya admin yang boleh masuk.
4. Salin UUID akun tersebut ke perintah terakhir dalam `schema.sql`, lalu jalankan agar akun menjadi `ADMIN`.
5. Salin `.env.example` menjadi `.env.local`, kemudian isi URL serta anon key dari **Project Settings > API**.
6. Restart website. Halaman `/admin` akan meminta login; tanpa konfigurasi Supabase, dashboard tetap bekerja sebagai draft lokal untuk desain dan input awal.

Bucket `product-images` sudah dibatasi: publik hanya dapat membaca foto untuk produk yang live, sedangkan unggah, ubah, dan hapus hanya untuk akun berperan `ADMIN`.
