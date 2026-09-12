-- Run this once in the Supabase SQL Editor before enabling production admin.
create type public.product_status as enum ('DRAFT', 'PREORDER', 'READY', 'SOLD_OUT');
create type public.preorder_status as enum ('UPCOMING', 'OPEN', 'CLOSED');
create type public.account_role as enum ('ADMIN', 'STAFF');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.account_role not null default 'STAFF',
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  author text,
  muhaqqiq text,
  preorder_price numeric(12,0),
  retail_price numeric(12,0),
  preorder_starts_at date,
  preorder_ends_at date,
  preorder_status public.preorder_status not null default 'UPCOMING',
  dimensions text,
  weight_grams integer,
  cover_type text,
  status public.product_status not null default 'DRAFT',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null unique,
  alt_text text,
  sort_order smallint not null check (sort_order between 0 and 4),
  created_at timestamptz not null default now(),
  unique(product_id, sort_order)
);

create index product_images_product_id_idx on public.product_images(product_id, sort_order);
create index products_status_idx on public.products(status);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN');
$$;

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;

create policy "admin can read profiles" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "public sees live products" on public.products for select using (status in ('PREORDER', 'READY'));
create policy "admins manage products" on public.products for all using (public.is_admin()) with check (public.is_admin());
create policy "public sees images for live products" on public.product_images for select using (exists (select 1 from public.products where products.id = product_id and products.status in ('PREORDER', 'READY')));
create policy "admins manage images" on public.product_images for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true)
on conflict (id) do nothing;
create policy "public reads product photos" on storage.objects for select using (bucket_id = 'product-images');
create policy "admins upload product photos" on storage.objects for insert with check (bucket_id = 'product-images' and public.is_admin());
create policy "admins update product photos" on storage.objects for update using (bucket_id = 'product-images' and public.is_admin());
create policy "admins delete product photos" on storage.objects for delete using (bucket_id = 'product-images' and public.is_admin());

-- After creating your Auth user in Supabase, promote it once by replacing the UUID:
-- insert into public.profiles (id, role) values ('YOUR_AUTH_USER_UUID', 'ADMIN')
-- on conflict (id) do update set role = excluded.role;
