'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const createAlimentoSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').max(100),
  quantidade: z.string().max(50).optional(),
  calorias: z.number().int().min(0).max(5000).default(0),
  proteinas: z.number().min(0).max(500).default(0),
  refeicaoId: z.string().min(1, 'Refeição é obrigatória'),
})

const updateAlimentoSchema = z.object({
  id: z.string().min(1),
  nome: z.string().min(1, 'Nome é obrigatório').max(100).optional(),
  quantidade: z.string().max(50).optional().nullable(),
  calorias: z.number().int().min(0).max(5000).optional(),
  proteinas: z.number().min(0).max(500).optional(),
})

export async function createAlimento(data: {
  nome: string
  quantidade?: string
  calorias?: number
  proteinas?: number
  refeicaoId: string
}) {
  const validated = createAlimentoSchema.parse({
    nome: data.nome,
    quantidade: data.quantidade,
    calorias: data.calorias ?? 0,
    proteinas: data.proteinas ?? 0,
    refeicaoId: data.refeicaoId,
  })

  const alimento = await prisma.alimento.create({
    data: validated,
  })

  // Atualizar totais da refeição
  await updateRefeicaoTotais(validated.refeicaoId)

  revalidatePath('/')
  return alimento
}

export async function updateAlimento(data: {
  id: string
  nome?: string
  quantidade?: string | null
  calorias?: number
  proteinas?: number
}) {
  const validated = updateAlimentoSchema.parse(data)

  const alimento = await prisma.alimento.update({
    where: { id: validated.id },
    data: {
      ...(validated.nome && { nome: validated.nome }),
      ...(validated.quantidade !== undefined && { quantidade: validated.quantidade }),
      ...(validated.calorias !== undefined && { calorias: validated.calorias }),
      ...(validated.proteinas !== undefined && { proteinas: validated.proteinas }),
    },
  })

  // Atualizar totais da refeição
  await updateRefeicaoTotais(alimento.refeicaoId)

  revalidatePath('/')
  return alimento
}

export async function deleteAlimento(id: string) {
  const alimento = await prisma.alimento.findUnique({
    where: { id },
  })

  if (!alimento) {
    throw new Error('Alimento não encontrado')
  }

  await prisma.alimento.delete({
    where: { id },
  })

  // Atualizar totais da refeição
  await updateRefeicaoTotais(alimento.refeicaoId)

  revalidatePath('/')
}

// Função auxiliar para atualizar os totais da refeição
async function updateRefeicaoTotais(refeicaoId: string) {
  const alimentos = await prisma.alimento.findMany({
    where: { refeicaoId },
  })

  const totalCalorias = alimentos.reduce((acc, a) => acc + a.calorias, 0)
  const totalProteinas = alimentos.reduce((acc, a) => acc + a.proteinas, 0)

  await prisma.refeicao.update({
    where: { id: refeicaoId },
    data: {
      calorias: totalCalorias,
      proteinas: totalProteinas,
    },
  })
}


