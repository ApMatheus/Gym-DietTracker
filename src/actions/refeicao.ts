'use server'

import { prisma } from '@/lib/prisma'
import { createRefeicaoSchema, updateRefeicaoSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export async function getRefeicoes() {
  return prisma.refeicao.findMany({
    include: {
      diaDaSemana: true,
    },
    orderBy: { createdAt: 'asc' },
  })
}

export async function getRefeicoesByDia(diaDaSemanaId: string) {
  return prisma.refeicao.findMany({
    where: { diaDaSemanaId },
    orderBy: { createdAt: 'asc' },
  })
}

export async function createRefeicao(data: {
  nome: string
  calorias?: number
  proteinas?: number
  diaDaSemanaId: string
}) {
  const validated = createRefeicaoSchema.parse({
    nome: data.nome,
    calorias: data.calorias ?? 0,
    proteinas: data.proteinas ?? 0,
    diaDaSemanaId: data.diaDaSemanaId,
  })

  const refeicao = await prisma.refeicao.create({
    data: validated,
  })

  revalidatePath('/')
  return refeicao
}

export async function updateRefeicao(data: {
  id: string
  nome?: string
  calorias?: number
  proteinas?: number
  concluida?: boolean
}) {
  const validated = updateRefeicaoSchema.parse(data)

  const refeicao = await prisma.refeicao.update({
    where: { id: validated.id },
    data: {
      ...(validated.nome && { nome: validated.nome }),
      ...(validated.calorias !== undefined && { calorias: validated.calorias }),
      ...(validated.proteinas !== undefined && { proteinas: validated.proteinas }),
      ...(validated.concluida !== undefined && { concluida: validated.concluida }),
    },
  })

  revalidatePath('/')
  return refeicao
}

export async function toggleRefeicao(id: string) {
  const refeicao = await prisma.refeicao.findUnique({
    where: { id },
  })

  if (!refeicao) {
    throw new Error('Refeição não encontrada')
  }

  const updated = await prisma.refeicao.update({
    where: { id },
    data: { concluida: !refeicao.concluida },
  })

  revalidatePath('/')
  return updated
}

export async function deleteRefeicao(id: string) {
  await prisma.refeicao.delete({
    where: { id },
  })

  revalidatePath('/')
}

