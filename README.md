# 🏋️ Gym & Diet Tracker

Sistema completo de controle de treino e dieta desenvolvido com Next.js, TypeScript, Prisma e TailwindCSS.

## 🚀 Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Prisma ORM**
- **Supabase** (PostgreSQL)
- **TailwindCSS 4**
- **React Server Components + Client Components**
- **Zod** (validação)
- **Server Actions**

## 📋 Funcionalidades

- ✅ Treinos por dia da semana
- ✅ Exercícios com séries, repetições e carga
- ✅ Refeições com alimentos detalhados
- ✅ Calorias e proteínas por refeição
- ✅ Checkbox para marcar como concluído
- ✅ Reset automático semanal
- ✅ Navegação entre dias
- ✅ Dark mode nativo

---

## 🛠️ Configuração Local

### 1. Instalar dependências
```bash
npm install
```

### 2. Criar conta no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Crie um novo projeto
3. Vá em **Settings → Database**
4. Copie as connection strings:
   - **URI** (para `DATABASE_URL`)
   - **Direct Connection** (para `DIRECT_URL`)

### 3. Configurar variáveis de ambiente

Crie o arquivo `.env`:
```env
# Supabase PostgreSQL
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"
```

> ⚠️ Substitua `[ref]` e `[password]` pelos valores do seu projeto Supabase.

### 4. Configurar banco de dados
```bash
npx prisma db push
npm run db:seed
```

### 5. Rodar em desenvolvimento
```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deploy na Vercel

### 1. Configurar variáveis de ambiente na Vercel

No painel da Vercel, vá em **Settings → Environment Variables** e adicione:

| Variável | Valor |
|----------|-------|
| `DATABASE_URL` | `postgresql://postgres.[ref]:[password]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true` |
| `DIRECT_URL` | `postgresql://postgres.[ref]:[password]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres` |

### 2. Deploy

O build já está configurado para executar `prisma generate` automaticamente.

### 3. Após o deploy, execute as migrações
```bash
npx prisma db push
```

### 4. Popular com dados (opcional)
```bash
npm run db:seed
```

---

## 📦 Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run db:push` | Sincroniza schema com banco |
| `npm run db:seed` | Popula banco com dados |
| `npm run db:studio` | Abre Prisma Studio |

---

## 🔧 Obtendo Connection Strings do Supabase

1. Acesse seu projeto no [Supabase Dashboard](https://supabase.com/dashboard)
2. Vá em **Settings → Database**
3. Role até **Connection string**
4. Selecione **URI** e copie:

**Para `DATABASE_URL` (com pooler):**
```
postgresql://postgres.[ref]:[password]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Para `DIRECT_URL` (conexão direta):**
```
postgresql://postgres.[ref]:[password]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres
```

> 💡 A `DIRECT_URL` é necessária para migrações do Prisma, enquanto `DATABASE_URL` usa o pooler para conexões da aplicação.

---

## 📁 Estrutura

```
gym-diet-tracker/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── actions/        # Server Actions
│   ├── app/
│   │   ├── dia/[id]/   # Página do dia
│   │   └── page.tsx    # Página inicial
│   ├── components/     # Componentes React
│   └── lib/
│       └── prisma.ts
└── package.json
```

## 📝 Licença

MIT
