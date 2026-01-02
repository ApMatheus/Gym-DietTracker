'use server'

import { prisma } from '@/lib/prisma'

export async function getDiasDaSemana() {
  return prisma.diaDaSemana.findMany({
    include: {
      treinos: {
        include: {
          exercicios: {
            orderBy: { createdAt: 'asc' },
          },
        },
        orderBy: { createdAt: 'asc' },
      },
      refeicoes: {
        include: {
          alimentos: {
            orderBy: { createdAt: 'asc' },
          },
        },
        orderBy: { createdAt: 'asc' },
      },
    },
    orderBy: { ordem: 'asc' },
  })
}

export async function getDiaDaSemana(id: string) {
  return prisma.diaDaSemana.findUnique({
    where: { id },
    include: {
      treinos: {
        include: {
          exercicios: {
            orderBy: { createdAt: 'asc' },
          },
        },
        orderBy: { createdAt: 'asc' },
      },
      refeicoes: {
        include: {
          alimentos: {
            orderBy: { createdAt: 'asc' },
          },
        },
        orderBy: { createdAt: 'asc' },
      },
    },
  })
}
