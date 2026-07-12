# WebCarsMotors — Marketplace de Veículos

SPA React (Vite + TypeScript + Tailwind) com arquitetura preparada para Supabase Auth, Postgres e Storage, deployável na Vercel.

## Como rodar (modo local)

```bash
cd webcarsmotors-marketplace
cp .env.example .env
npm install
npm run dev      # http://localhost:5173
npm run build    # build em /dist
npm run preview
npm run lint
```

Com `VITE_DATA_SOURCE=local` (padrão), o CRUD usa `localStorage` (`carriage:vehicles`). Login mock: qualquer e-mail/senha não vazios liberam `/admin`.

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

## Design system

Tokens Carriage em `tailwind.config.js` + `src/index.css`. Troque o preset de acento em `:root` (azul / âmbar / vermelho).

## Rotas

- `/` — marketplace público
- `/login` — autenticação
- `/admin` — painel (protegido)

## Evolução Supabase + Vercel

### 1. Projeto Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Aplique as migrations em `supabase/migrations/` (SQL Editor ou CLI):
   ```bash
   npx supabase link --project-ref YOUR_REF
   npx supabase db push
   ```
3. Crie um usuário admin em Authentication e defina `app_metadata.role = "admin"` (Dashboard → Users → User → App Metadata):
   ```json
   { "role": "admin" }
   ```

### 2. Variáveis de ambiente

```env
VITE_DATA_SOURCE=supabase
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### 3. Deploy Vercel

1. Importe o repositório na Vercel
2. Configure as mesmas env vars
3. Build: `npm run build` · Output: `dist`
4. `vercel.json` já faz rewrite SPA para React Router

Imagens de veículos vão para o bucket `vehicle-images` (público para leitura; escrita só admin autenticado).
