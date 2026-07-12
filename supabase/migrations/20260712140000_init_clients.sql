-- clients table + RLS (admin-only)

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  full_name text not null default '',
  cpf text not null default '',
  birth_date text not null default '',
  email text not null default '',
  phone text not null default '',
  profession text not null default '',
  zip_code text not null default '',
  city text not null default '',
  state text not null default '',
  address text not null default '',
  complement text not null default '',
  interest text not null default '',
  budget_range text not null default '',
  how_found_us text not null default '',
  status text not null default 'active'
    check (status in ('active', 'inactive', 'negotiating')),
  visits integer not null default 0,
  photo_url text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists clients_status_idx on public.clients (status);
create index if not exists clients_created_at_idx on public.clients (created_at desc);

alter table public.clients enable row level security;

create policy "Admins can read clients"
  on public.clients
  for select
  to authenticated
  using (public.is_admin());

create policy "Admins can insert clients"
  on public.clients
  for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update clients"
  on public.clients
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete clients"
  on public.clients
  for delete
  to authenticated
  using (public.is_admin());
