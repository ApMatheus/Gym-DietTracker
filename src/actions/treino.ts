'use server'

import { prisma } from '@/lib/prisma'
import { createTreinoSchema, updateTreinoSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export async function getTreinos() {
  return prisma.treino.findMany({
    include: {
      exercicios: {
        orderBy: { createdAt: 'asc' },
      },
      diaDaSemana: true,
    },
    orderBy: { createdAt: 'asc' },
  })
}

export async function getTreinosByDia(diaDaSemanaId: string) {
  return prisma.treino.findMany({
    where: { diaDaSemanaId },
    include: {
      exercicios: {
        orderBy: { createdAt: 'asc' },
      },
    },
    orderBy: { createdAt: 'asc' },
  })
}

export async function createTreino(data: { nome: string; diaDaSemanaId: string }) {
  const validated = createTreinoSchema.parse(data)

  const treino = await prisma.treino.create({
    data: validated,
    include: {
      exercicios: true,
    },
  })

  revalidatePath('/')
  return treino
}

export async function updateTreino(data: { id: string; nome: string }) {
  const validated = updateTreinoSchema.parse(data)

  const treino = await prisma.treino.update({
    where: { id: validated.id },
    data: { nome: validated.nome },
  })

  revalidatePath('/')
  return treino
}

export async function deleteTreino(id: string) {
  await prisma.treino.delete({
    where: { id },
  })

  revalidatePath('/')
}

