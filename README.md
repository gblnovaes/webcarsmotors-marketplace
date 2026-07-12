# WebCarsMotors — Marketplace de Veículos

SPA React (Vite + TypeScript + Tailwind) com Supabase Auth/Postgres/Storage e deploy na Vercel.

## URLs

- **Produção:** https://webcarsmotors-marketplace.vercel.app
- **GitHub:** https://github.com/gblnovaes/webcarsmotors-marketplace
- **Supabase:** projeto `webcarsmotors` (`shegwaapatxluqeeztzk`)

## Como rodar local

```bash
cp .env.example .env
# Preencha VITE_SUPABASE_* se for usar supabase
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

- `VITE_DATA_SOURCE=local` — CRUD em `localStorage` (login mock)
- `VITE_DATA_SOURCE=supabase` — Auth + Postgres + Storage reais

### Admin (Supabase)

- E-mail: `gabrielnovaes@yahoo.com.br`
- Senha: `WebCarsAdmin2026!`
- Role: `app_metadata.role = admin`

## Estrutura

```
src/
  app/                 App + rotas (React Router)
  features/
    vehicles/          domínio, filtros, Home, cards
    admin/             painel, formulário, tabela
    auth/              AuthContext + Login + ProtectedRoute
  shared/              Header, Footer, Logo, format
  data/
    repositories/      VehicleRepository (local | supabase)
    seed/              estoque de exemplo
  lib/supabase/        client Supabase
```

## Deploy

### Vercel

Já conectado ao GitHub. Build: `npm run build` · Output: `dist` · rewrite SPA em `vercel.json`.

Env vars (Production/Preview):

- `VITE_DATA_SOURCE=supabase`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Supabase Auth URLs

Em [Authentication → URL Configuration](https://supabase.com/dashboard/project/shegwaapatxluqeeztzk/auth/url-configuration):

- **Site URL:** `https://webcarsmotors-marketplace.vercel.app`
- **Redirect URLs:**  
  `https://webcarsmotors-marketplace.vercel.app/**`  
  `http://localhost:5173/**`

Os mesmos valores estão em [`supabase/config.toml`](supabase/config.toml) (`[auth]`).

### Migrations

Arquivos em `supabase/migrations/` (já aplicadas no projeto remoto):

1. `init_vehicles` — tabelas, RLS, Storage `vehicle-images`
2. `seed_vehicles` — 6 veículos de exemplo

## Design system

Tokens Carriage em `tailwind.config.js` + `src/index.css`. Troque o preset de acento em `:root`.
