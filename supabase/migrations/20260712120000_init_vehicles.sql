-- profiles + vehicles + RLS + storage policies

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'user' check (role in ('admin', 'user')),
  created_at timestamptz not null default now()
);

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  brand text not null,
  model text not null,
  year integer not null,
  price numeric(12, 2) not null,
  km integer not null default 0,
  fuel text not null default '',
  transmission text not null default '',
  color text not null default '',
  plate text not null default '',
  location text not null default '',
  category text not null default '',
  status text not null default 'available'
    check (status in ('available', 'reserved', 'sold', 'paused')),
  description text not null default '',
  image_url text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists vehicles_status_idx on public.vehicles (status);
create index if not exists vehicles_category_idx on public.vehicles (category);
create index if not exists vehicles_created_at_idx on public.vehicles (created_at desc);

alter table public.profiles enable row level security;
alter table public.vehicles enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  )
  or exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role)
  values (
    new.id,
    coalesce(new.raw_app_meta_data ->> 'role', 'user')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Public read: hide paused vehicles
create policy "Public can read non-paused vehicles"
  on public.vehicles
  for select
  to anon, authenticated
  using (status <> 'paused');

-- Admins can read all (including paused)
create policy "Admins can read all vehicles"
  on public.vehicles
  for select
  to authenticated
  using (public.is_admin());

create policy "Admins can insert vehicles"
  on public.vehicles
  for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update vehicles"
  on public.vehicles
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete vehicles"
  on public.vehicles
  for delete
  to authenticated
  using (public.is_admin());

create policy "Users can read own profile"
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid() or public.is_admin());

-- Storage bucket for vehicle images
insert into storage.buckets (id, name, public)
values ('vehicle-images', 'vehicle-images', true)
on conflict (id) do nothing;

create policy "Public read vehicle images"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'vehicle-images');

create policy "Admins upload vehicle images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'vehicle-images' and public.is_admin());

create policy "Admins update vehicle images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'vehicle-images' and public.is_admin())
  with check (bucket_id = 'vehicle-images' and public.is_admin());

create policy "Admins delete vehicle images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'vehicle-images' and public.is_admin());
