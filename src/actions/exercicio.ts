'use server'

import { prisma } from '@/lib/prisma'
import { createExercicioSchema, updateExercicioSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export async function createExercicio(data: {
  nome: string
  series?: number
  repeticoes?: number
  carga?: number
  treinoId: string
}) {
  const validated = createExercicioSchema.parse({
    nome: data.nome,
    series: data.series ?? 3,
    repeticoes: data.repeticoes ?? 10,
    carga: data.carga ?? 0,
    treinoId: data.treinoId,
  })

  const exercicio = await prisma.exercicio.create({
    data: validated,
  })

  revalidatePath('/')
  return exercicio
}

export async function updateExercicio(data: {
  id: string
  nome?: string
  series?: number
  repeticoes?: number
  carga?: number
  concluido?: boolean
}) {
  const validated = updateExercicioSchema.parse(data)

  const exercicio = await prisma.exercicio.update({
    where: { id: validated.id },
    data: {
      ...(validated.nome && { nome: validated.nome }),
      ...(validated.series !== undefined && { series: validated.series }),
      ...(validated.repeticoes !== undefined && { repeticoes: validated.repeticoes }),
      ...(validated.carga !== undefined && { carga: validated.carga }),
      ...(validated.concluido !== undefined && { concluido: validated.concluido }),
    },
  })

  revalidatePath('/')
  return exercicio
}

export async function toggleExercicio(id: string) {
  const exercicio = await prisma.exercicio.findUnique({
    where: { id },
  })

  if (!exercicio) {
    throw new Error('Exercício não encontrado')
  }

  const updated = await prisma.exercicio.update({
    where: { id },
    data: { concluido: !exercicio.concluido },
  })

  revalidatePath('/')
  return updated
}

export async function deleteExercicio(id: string) {
  await prisma.exercicio.delete({
    where: { id },
  })

  revalidatePath('/')
}


