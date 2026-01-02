# 🏋️ Gym & Diet Tracker

Sistema completo de controle de treino e dieta desenvolvido com Next.js, TypeScript, Prisma e TailwindCSS.

## 🚀 Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Prisma ORM**
- **SQLite** (desenvolvimento) / PostgreSQL ready
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
- Informar calorias e proteínas
- Checkbox de refeição concluída
- Editar e excluir refeições

### ✅ Interface
- Layout em cards
- Separação clara por dias da semana
- UI moderna, limpa e responsiva
- Dark mode nativo
- Feedback visual ao marcar como concluído
- Barra de progresso diária
- Total de calorias e proteínas por dia

## 🗂️ Estrutura de Dados

```
DiaDaSemana (1) ─┬─> (N) Treino (1) ──> (N) Exercício
                 └─> (N) Refeição
```

## 🛠️ Como Rodar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar banco de dados

```bash
# Gerar o Prisma Client e criar o banco
npx prisma db push

# Popular com dados de exemplo
npm run db:seed
```

### 3. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 📦 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Inicia servidor de produção |
| `npm run db:push` | Sincroniza schema com banco |
| `npm run db:seed` | Popula banco com dados exemplo |
| `npm run db:studio` | Abre Prisma Studio (GUI) |
| `npm run db:migrate` | Executa migrações |
| `npm run db:reset` | Reseta banco de dados |

## 🔧 Configuração para PostgreSQL

Para usar PostgreSQL em produção, altere o `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

E atualize a variável `DATABASE_URL` no `.env`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/gym_diet_tracker"
```

## 📁 Estrutura de Pastas

```
gym-diet-tracker/
├── prisma/
│   ├── schema.prisma      # Schema do banco
│   └── seed.ts            # Dados de exemplo
├── src/
│   ├── actions/           # Server Actions
│   │   ├── dia.ts
│   │   ├── exercicio.ts
│   │   ├── refeicao.ts
│   │   └── treino.ts
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx       # Visão semanal
│   ├── components/
│   │   ├── AddRefeicaoForm.tsx
│   │   ├── AddTreinoForm.tsx
│   │   ├── DiaCard.tsx
│   │   ├── ExercicioCard.tsx
│   │   ├── Header.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── RefeicaoCard.tsx
│   │   └── TreinoCard.tsx
│   ├── lib/
│   │   ├── prisma.ts      # Prisma client
│   │   └── validations.ts # Schemas Zod
│   └── types/
│       └── index.ts
├── .env
├── package.json
└── README.md
```

## 🎨 Screenshots

A interface apresenta:
- Cards para cada dia da semana
- Barras de progresso para exercícios e refeições
- Totais de calorias e proteínas consumidas
- Modo escuro elegante
- Animações suaves

## 📝 Licença

MIT
