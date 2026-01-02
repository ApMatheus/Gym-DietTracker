'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Função para obter o número da semana do ano
function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

// Função para obter a chave da semana atual (ano-semana)
function getCurrentWeekKey(): string {
  const now = new Date()
  const year = now.getFullYear()
  const week = getWeekNumber(now)
  return `${year}-W${week.toString().padStart(2, '0')}`
}

// Verifica se precisa resetar (chamada durante render - sem revalidatePath)
export async function checkWeeklyReset(): Promise<{ needsReset: boolean; weekKey: string }> {
  const currentWeekKey = getCurrentWeekKey()
  
  // Buscar a última semana registrada
  const lastWeekConfig = await prisma.systemConfig.findUnique({
    where: { key: 'lastResetWeek' }
  })

  // Se não existe registro ou se a semana mudou, precisa resetar
  if (!lastWeekConfig || lastWeekConfig.value !== currentWeekKey) {
    return { needsReset: true, weekKey: currentWeekKey }
  }

  return { needsReset: false, weekKey: currentWeekKey }
}

// Executa o reset (chamada via action/interação do usuário)
export async function executeWeeklyReset(): Promise<{ reset: boolean; weekKey: string }> {
  const currentWeekKey = getCurrentWeekKey()
  
  // Buscar a última semana registrada
  const lastWeekConfig = await prisma.systemConfig.findUnique({
    where: { key: 'lastResetWeek' }
  })

  // Se não existe registro ou se a semana mudou, fazer reset
  if (!lastWeekConfig || lastWeekConfig.value !== currentWeekKey) {
    await resetAllProgress()
    
    // Atualizar ou criar o registro da semana
    await prisma.systemConfig.upsert({
      where: { key: 'lastResetWeek' },
      update: { value: currentWeekKey },
      create: { key: 'lastResetWeek', value: currentWeekKey }
    })

    revalidatePath('/')
    return { reset: true, weekKey: currentWeekKey }
  }

  return { reset: false, weekKey: currentWeekKey }
}

// Reseta todos os exercícios e refeições para não concluídos
export async function resetAllProgress(): Promise<void> {
  await prisma.$transaction([
    prisma.exercicio.updateMany({
      data: { concluido: false }
    }),
    prisma.refeicao.updateMany({
      data: { concluida: false }
    })
  ])
}

// Reset manual (para o usuário poder resetar quando quiser)
export async function manualReset(): Promise<void> {
  await resetAllProgress()
  
  // Atualizar a semana atual para evitar reset automático duplicado
  const currentWeekKey = getCurrentWeekKey()
  await prisma.systemConfig.upsert({
    where: { key: 'lastResetWeek' },
    update: { value: currentWeekKey },
    create: { key: 'lastResetWeek', value: currentWeekKey }
  })

  revalidatePath('/')
}

// Obter informações sobre a semana atual
export async function getWeekInfo(): Promise<{
  weekKey: string
  weekNumber: number
  year: number
  startDate: Date
  endDate: Date
}> {
  const now = new Date()
  const weekNumber = getWeekNumber(now)
  const year = now.getFullYear()
  
  // Calcular início da semana (segunda-feira)
  const dayOfWeek = now.getDay()
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
  const startDate = new Date(now.setDate(diff))
  startDate.setHours(0, 0, 0, 0)
  
  // Calcular fim da semana (domingo)
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 6)
  endDate.setHours(23, 59, 59, 999)

  return {
    weekKey: getCurrentWeekKey(),
    weekNumber,
    year,
    startDate,
    endDate
  }
}
