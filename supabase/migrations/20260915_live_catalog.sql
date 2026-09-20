-- Run once in Supabase SQL Editor for an existing Dzikra project.
-- Adds product-specific Tally checkout URLs and exposes all public catalogue states.

alter table public.products add column if not exists order_url text;

drop policy if exists "public sees live products" on public.products;
create policy "public sees live products"
  on public.products for select
  using (status in ('PREORDER', 'READY', 'SOLD_OUT'));

drop policy if exists "public sees images for live products" on public.product_images;
create policy "public sees images for live products"
  on public.product_images for select
  using (
    exists (
      select 1 from public.products
      where products.id = product_id
        and products.status in ('PREORDER', 'READY', 'SOLD_OUT')
    )
  );
