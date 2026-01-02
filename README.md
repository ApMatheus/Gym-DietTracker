# 🏋️ Gym & Diet Tracker

Sistema completo de controle de treino e dieta desenvolvido com Next.js, TypeScript, Prisma e TailwindCSS.

## 🚀 Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL** (produção) / SQLite (desenvolvimento)
- **TailwindCSS 4**
- **React Server Components + Client Components**
- **Zod** (validação)
- **Server Actions**
- **Lucide React** (ícones)

## 📋 Funcionalidades

### ✅ Treinos
- Criar treino por dia da semana
- Adicionar exercícios ao treino
- Editar nome, séries, repetições e carga
- Checkbox para marcar exercício como feito
- Excluir exercício

### ✅ Refeições
- Criar refeições por dia
- Adicionar alimentos com calorias e proteínas
- Checkbox de refeição concluída
- Editar e excluir refeições

### ✅ Reset Semanal
- **Reset automático** quando uma nova semana começa
- Botão de **reset manual** com confirmação
- Indicador da semana atual

### ✅ Interface
- Layout em cards por dia da semana
- Navegação entre dias
- UI moderna, limpa e responsiva
- Dark mode nativo
- Barras de progresso diárias

## 🛠️ Como Rodar Localmente

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar banco de dados

Para **desenvolvimento local** com SQLite, altere `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

E crie o arquivo `.env`:
```
DATABASE_URL="file:./dev.db"
```

Depois execute:
```bash
npx prisma db push
npm run db:seed
```

### 3. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deploy na Vercel

### 1. Criar banco PostgreSQL

Use um dos serviços gratuitos:
- **[Neon](https://neon.tech)** (recomendado)
- **[Supabase](https://supabase.com)**
- **[Railway](https://railway.app)**

### 2. Configurar variáveis de ambiente na Vercel

No painel da Vercel, adicione:

| Variável | Valor |
|----------|-------|
| `DATABASE_URL` | `postgresql://user:password@host:5432/database?sslmode=require` |
| `DIRECT_URL` | `postgresql://user:password@host:5432/database?sslmode=require` |

### 3. Deploy

O build já está configurado para executar `prisma generate` automaticamente.

Após o deploy, execute as migrações:
```bash
npx prisma db push
```

E opcionalmente o seed:
```bash
npm run db:seed
```

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (inclui prisma generate) |
| `npm run start` | Inicia servidor de produção |
| `npm run db:push` | Sincroniza schema com banco |
| `npm run db:seed` | Popula banco com dados exemplo |
| `npm run db:studio` | Abre Prisma Studio (GUI) |

## 📁 Estrutura de Pastas

```
gym-diet-tracker/
├── prisma/
│   ├── schema.prisma      # Schema do banco
│   └── seed.ts            # Dados de exemplo
├── src/
│   ├── actions/           # Server Actions
│   ├── app/
│   │   ├── dia/[id]/      # Página do dia
│   │   └── page.tsx       # Página inicial
│   ├── components/        # Componentes React
│   ├── lib/
│   │   └── prisma.ts      # Cliente Prisma
│   └── types/
├── package.json
└── README.md
```

## 📝 Licença

MIT
