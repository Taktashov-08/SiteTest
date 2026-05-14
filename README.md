# Il Tartufo Coimbra Demo

Demo profissional para um restaurante italiano em Coimbra, com pagina publica,
formulario de reservas, painel privado de gestao e base preparada para dominio
proprio.

## Stack

- React
- Vite
- Tailwind CSS
- Supabase Auth + Database
- Vercel

## Run locally

```bash
npm install
npm run dev
```

Cria um ficheiro `.env` a partir de `.env.example` e adiciona os valores:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
RESEND_API_KEY=your-resend-key
RESERVATION_NOTIFY_EMAIL=restaurant@example.com
RESERVATION_FROM_EMAIL=Reservas <reservas@yourdomain.pt>
```

As variaveis `RESEND_*` sao opcionais. Sem elas, as reservas continuam a ser
guardadas no Supabase, mas nao e enviado email automatico ao dono.

## Supabase

Executa o SQL em [supabase/schema.sql](supabase/schema.sql) no SQL Editor do
Supabase.

Depois cria um utilizador admin em **Authentication > Users** e adiciona esse
utilizador a tabela `admin_users` com o `user_id` correspondente.

## Admin

O painel fica em:

```text
/admin
```

Funcionalidades:

- Login privado com Supabase Auth
- Lista de reservas
- Filtro por data
- Filtro por estado
- Aceitar, recusar ou cancelar reservas
- Notas internas

## Build

```bash
npm run build
```
