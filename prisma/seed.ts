import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // Limpar dados existentes
  await prisma.alimento.deleteMany()
  await prisma.exercicio.deleteMany()
  await prisma.refeicao.deleteMany()
  await prisma.treino.deleteMany()
  await prisma.diaDaSemana.deleteMany()
  await prisma.systemConfig.deleteMany()

  console.log('🗑️  Dados anteriores removidos')

  // Criar dias da semana
  const dias = await Promise.all([
    prisma.diaDaSemana.create({ data: { nome: 'Segunda', ordem: 1 } }),
    prisma.diaDaSemana.create({ data: { nome: 'Terça', ordem: 2 } }),
    prisma.diaDaSemana.create({ data: { nome: 'Quarta', ordem: 3 } }),
    prisma.diaDaSemana.create({ data: { nome: 'Quinta', ordem: 4 } }),
    prisma.diaDaSemana.create({ data: { nome: 'Sexta', ordem: 5 } }),
    prisma.diaDaSemana.create({ data: { nome: 'Sábado', ordem: 6 } }),
    prisma.diaDaSemana.create({ data: { nome: 'Domingo', ordem: 7 } }),
  ])

  console.log('📅 Dias da semana criados')

  const [segunda, terca, quarta, quinta, sexta] = dias

  // Criar treinos
  const treinoPeito = await prisma.treino.create({
    data: {
      nome: 'Peito e Tríceps',
      diaDaSemanaId: segunda.id,
    },
  })

  const treinoCostas = await prisma.treino.create({
    data: {
      nome: 'Costas e Bíceps',
      diaDaSemanaId: terca.id,
    },
  })

  const treinoPernas = await prisma.treino.create({
    data: {
      nome: 'Pernas',
      diaDaSemanaId: quarta.id,
    },
  })

  const treinoOmbros = await prisma.treino.create({
    data: {
      nome: 'Ombros e Abdômen',
      diaDaSemanaId: quinta.id,
    },
  })

  const treinoFullBody = await prisma.treino.create({
    data: {
      nome: 'Full Body',
      diaDaSemanaId: sexta.id,
    },
  })

  console.log('🏋️ Treinos criados')

  // Exercícios - Segunda (Peito e Tríceps)
  await prisma.exercicio.createMany({
    data: [
      { nome: 'Supino Reto', series: 4, repeticoes: 10, carga: 60, treinoId: treinoPeito.id },
      { nome: 'Supino Inclinado', series: 4, repeticoes: 10, carga: 50, treinoId: treinoPeito.id },
      { nome: 'Crucifixo', series: 3, repeticoes: 12, carga: 14, treinoId: treinoPeito.id },
      { nome: 'Crossover', series: 3, repeticoes: 15, carga: 20, treinoId: treinoPeito.id },
      { nome: 'Tríceps Pulley', series: 4, repeticoes: 12, carga: 30, treinoId: treinoPeito.id },
      { nome: 'Tríceps Francês', series: 3, repeticoes: 10, carga: 12, treinoId: treinoPeito.id },
    ],
  })

  // Exercícios - Terça (Costas e Bíceps)
  await prisma.exercicio.createMany({
    data: [
      { nome: 'Puxada Frontal', series: 4, repeticoes: 10, carga: 50, treinoId: treinoCostas.id },
      { nome: 'Remada Curvada', series: 4, repeticoes: 10, carga: 40, treinoId: treinoCostas.id },
      { nome: 'Remada Unilateral', series: 3, repeticoes: 12, carga: 22, treinoId: treinoCostas.id },
      { nome: 'Pulldown', series: 3, repeticoes: 12, carga: 40, treinoId: treinoCostas.id },
      { nome: 'Rosca Direta', series: 4, repeticoes: 10, carga: 16, treinoId: treinoCostas.id },
      { nome: 'Rosca Martelo', series: 3, repeticoes: 12, carga: 12, treinoId: treinoCostas.id },
    ],
  })

  // Exercícios - Quarta (Pernas)
  await prisma.exercicio.createMany({
    data: [
      { nome: 'Agachamento Livre', series: 4, repeticoes: 10, carga: 80, treinoId: treinoPernas.id },
      { nome: 'Leg Press', series: 4, repeticoes: 12, carga: 200, treinoId: treinoPernas.id },
      { nome: 'Cadeira Extensora', series: 3, repeticoes: 15, carga: 50, treinoId: treinoPernas.id },
      { nome: 'Cadeira Flexora', series: 3, repeticoes: 15, carga: 40, treinoId: treinoPernas.id },
      { nome: 'Panturrilha Sentado', series: 4, repeticoes: 20, carga: 60, treinoId: treinoPernas.id },
      { nome: 'Stiff', series: 3, repeticoes: 12, carga: 40, treinoId: treinoPernas.id },
    ],
  })

  // Exercícios - Quinta (Ombros e Abdômen)
  await prisma.exercicio.createMany({
    data: [
      { nome: 'Desenvolvimento', series: 4, repeticoes: 10, carga: 30, treinoId: treinoOmbros.id },
      { nome: 'Elevação Lateral', series: 4, repeticoes: 12, carga: 10, treinoId: treinoOmbros.id },
      { nome: 'Elevação Frontal', series: 3, repeticoes: 12, carga: 10, treinoId: treinoOmbros.id },
      { nome: 'Crucifixo Inverso', series: 3, repeticoes: 15, carga: 12, treinoId: treinoOmbros.id },
      { nome: 'Abdominal Crunch', series: 4, repeticoes: 20, carga: 0, treinoId: treinoOmbros.id },
      { nome: 'Prancha', series: 3, repeticoes: 60, carga: 0, treinoId: treinoOmbros.id },
    ],
  })

  // Exercícios - Sexta (Full Body)
  await prisma.exercicio.createMany({
    data: [
      { nome: 'Burpees', series: 3, repeticoes: 15, carga: 0, treinoId: treinoFullBody.id },
      { nome: 'Kettlebell Swing', series: 4, repeticoes: 20, carga: 16, treinoId: treinoFullBody.id },
      { nome: 'Clean and Press', series: 3, repeticoes: 10, carga: 30, treinoId: treinoFullBody.id },
      { nome: 'Box Jump', series: 3, repeticoes: 12, carga: 0, treinoId: treinoFullBody.id },
    ],
  })

  console.log('💪 Exercícios criados')

  // Alimentos padrão para cada refeição
  const alimentosPorRefeicao: Record<string, Array<{ nome: string; quantidade: string; calorias: number; proteinas: number }>> = {
    'Café da Manhã': [
      { nome: 'Ovos mexidos', quantidade: '3 unidades', calorias: 210, proteinas: 18 },
      { nome: 'Pão integral', quantidade: '2 fatias', calorias: 140, proteinas: 6 },
      { nome: 'Queijo branco', quantidade: '30g', calorias: 60, proteinas: 6 },
      { nome: 'Café com leite', quantidade: '200ml', calorias: 40, proteinas: 0 },
    ],
    'Lanche da Manhã': [
      { nome: 'Whey Protein', quantidade: '1 scoop', calorias: 120, proteinas: 24 },
      { nome: 'Banana', quantidade: '1 unidade', calorias: 80, proteinas: 1 },
    ],
    'Almoço': [
      { nome: 'Frango grelhado', quantidade: '200g', calorias: 330, proteinas: 62 },
      { nome: 'Arroz integral', quantidade: '150g', calorias: 180, proteinas: 4 },
      { nome: 'Feijão', quantidade: '100g', calorias: 80, proteinas: 5 },
      { nome: 'Salada verde', quantidade: '100g', calorias: 20, proteinas: 1 },
      { nome: 'Azeite', quantidade: '1 colher', calorias: 40, proteinas: 0 },
    ],
    'Lanche da Tarde': [
      { nome: 'Iogurte grego', quantidade: '170g', calorias: 100, proteinas: 15 },
      { nome: 'Granola', quantidade: '30g', calorias: 120, proteinas: 3 },
      { nome: 'Frutas vermelhas', quantidade: '50g', calorias: 30, proteinas: 0 },
    ],
    'Jantar': [
      { nome: 'Carne vermelha', quantidade: '180g', calorias: 350, proteinas: 45 },
      { nome: 'Batata doce', quantidade: '200g', calorias: 170, proteinas: 2 },
      { nome: 'Brócolis', quantidade: '100g', calorias: 30, proteinas: 3 },
    ],
    'Ceia': [
      { nome: 'Cottage', quantidade: '100g', calorias: 100, proteinas: 12 },
      { nome: 'Castanhas', quantidade: '20g', calorias: 50, proteinas: 1 },
    ],
  }

  // Criar refeições com alimentos para cada dia
  for (const dia of dias) {
    for (const [nomeRefeicao, alimentos] of Object.entries(alimentosPorRefeicao)) {
      const totalCalorias = alimentos.reduce((acc, a) => acc + a.calorias, 0)
      const totalProteinas = alimentos.reduce((acc, a) => acc + a.proteinas, 0)

      const refeicao = await prisma.refeicao.create({
        data: {
          nome: nomeRefeicao,
          calorias: totalCalorias,
          proteinas: totalProteinas,
          diaDaSemanaId: dia.id,
        },
      })

      // Criar alimentos para a refeição
      for (const alimento of alimentos) {
        await prisma.alimento.create({
          data: {
            nome: alimento.nome,
            quantidade: alimento.quantidade,
            calorias: alimento.calorias,
            proteinas: alimento.proteinas,
            refeicaoId: refeicao.id,
          },
        })
      }
    }
  }

  console.log('🍽️  Refeições e alimentos criados')

  // Marcar alguns exercícios como concluídos para demonstração
  const exercicios = await prisma.exercicio.findMany({ take: 5 })
  for (const ex of exercicios) {
    await prisma.exercicio.update({
      where: { id: ex.id },
      data: { concluido: true },
    })
  }

  // Marcar algumas refeições como concluídas
  const refeicoes = await prisma.refeicao.findMany({ take: 8 })
  for (const ref of refeicoes) {
    await prisma.refeicao.update({
      where: { id: ref.id },
      data: { concluida: true },
    })
  }

  console.log('✅ Alguns itens marcados como concluídos')
  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
