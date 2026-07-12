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
    clients/           domínio de clientes (CRM)
    admin/             painel, formulários, tabelas
    auth/              AuthContext + Login + ProtectedRoute
  shared/              Header, Footer, Logo, format
  data/
    repositories/      VehicleRepository + ClientRepository (local | supabase)
    seed/              estoque e clientes de exemplo
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
3. `init_clients` — tabela `clients` + RLS (admin-only)
4. `seed_clients` / `seed_clients_10` — 10 clientes de exemplo

## Seed de clientes (local vs Supabase)

São **dois caminhos distintos**. O seed local **não** passa por migration SQL.

### Modo local (`VITE_DATA_SOURCE=local`)

Os dados vêm de `src/data/seed/clients.ts` e entram no `localStorage` na primeira carga (chave `carriage:clients`).

```bash
# .env
VITE_DATA_SOURCE=local
```

```bash
npm run dev
# abrir /admin/clientes
```

**Para forçar o seed de novo** (ex.: depois de atualizar de 6 → 10 clientes):

- DevTools → Application → Local Storage → apagar `carriage:clients`
- Ou no console: `localStorage.removeItem('carriage:clients')` e recarregar

Sem limpar a chave, o app continua com a lista antiga já salva.

### Modo Supabase (`VITE_DATA_SOURCE=supabase`)

Migrations SQL em `supabase/migrations/`:

| Arquivo | Função |
|---------|--------|
| `20260712140000_init_clients.sql` | Cria tabela `clients` + RLS |
| `20260712140100_seed_clients.sql` | Seed inicial |
| `20260712140200_seed_clients_10.sql` | Upsert dos 10 clientes |

**CLI (recomendado):**

```bash
npx supabase login
npx supabase link --project-ref shegwaapatxluqeeztzk
npx supabase db push
```

`db push` aplica só o que ainda não está no histórico remoto.

**Re-seed manual:** cole o conteúdo de `20260712140200_seed_clients_10.sql` no [SQL Editor](https://supabase.com/dashboard/project/shegwaapatxluqeeztzk/sql) e rode. O `ON CONFLICT DO UPDATE` atualiza os 10 registros mesmo se já existirem.

**Stack local (Docker):**

```bash
npx supabase start
npx supabase db reset   # recria DB e roda todas as migrations + seeds
```

Aponte o `.env` para a URL/anon key impressas pelo `supabase start`.

**App apontando para o remoto:**

```bash
VITE_DATA_SOURCE=supabase
VITE_SUPABASE_URL=https://shegwaapatxluqeeztzk.supabase.co
VITE_SUPABASE_ANON_KEY=<sua anon key>
```

Login admin → `/admin/clientes`.

| Objetivo | O que fazer |
|----------|-------------|
| Ver 10 clientes no modo local | Limpar `carriage:clients` + reload |
| Criar tabela / seed no remoto | `npx supabase db push` (ou SQL Editor) |
| Reaplicar só o seed remoto | Rodar `seed_clients_10.sql` no SQL Editor |

## Design system

Tokens Carriage em `tailwind.config.js` + `src/index.css`. Troque o preset de acento em `:root`.
