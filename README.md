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
SITE_URL=https://iltartufo-coimbra.vercel.app
RESTAURANT_NAME=Il Tartufo
```

As variaveis `RESEND_*` sao opcionais. Sem elas, as reservas continuam a ser
guardadas no Supabase, mas nao e enviado email automatico ao dono.

## Emails

O fluxo de email esta preparado assim:

1. Cliente envia pedido de reserva.
2. O dono recebe email com os dados da reserva.
3. O cliente recebe email a dizer que o pedido foi recebido e ainda esta
   pendente.
4. No painel admin, quando o estado muda para `accepted`, `rejected` ou
   `cancelled`, o cliente recebe email automatico com a decisao.

Para ativar em producao:

1. Criar conta no Resend.
2. Idealmente verificar um dominio proprio, por exemplo `iltartufocoimbra.pt`.
3. Criar uma API key.
4. Adicionar na Vercel:

```bash
npx vercel env add RESEND_API_KEY production
npx vercel env add RESERVATION_NOTIFY_EMAIL production
npx vercel env add RESERVATION_FROM_EMAIL production
npx vercel env add SITE_URL production
npx vercel env add RESTAURANT_NAME production
```

Depois de alterar variaveis na Vercel, fazer sempre novo deploy:

```bash
npx vercel --prod --yes
```

Nota: para enviar emails para clientes reais, o Resend deve usar um dominio
verificado. O remetente `onboarding@resend.dev` serve apenas para testes muito
limitados.

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
