import { z } from 'zod'

// Schemas de validação para Treino
export const createTreinoSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').max(100),
  diaDaSemanaId: z.string().min(1, 'Dia da semana é obrigatório'),
})

export const updateTreinoSchema = z.object({
  id: z.string().min(1),
  nome: z.string().min(1, 'Nome é obrigatório').max(100),
})

// Schemas de validação para Exercício
export const createExercicioSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').max(100),
  series: z.number().int().min(1).max(20).default(3),
  repeticoes: z.number().int().min(1).max(100).default(10),
  carga: z.number().min(0).max(1000).default(0),
  treinoId: z.string().min(1, 'Treino é obrigatório'),
})

export const updateExercicioSchema = z.object({
  id: z.string().min(1),
  nome: z.string().min(1, 'Nome é obrigatório').max(100).optional(),
  series: z.number().int().min(1).max(20).optional(),
  repeticoes: z.number().int().min(1).max(100).optional(),
  carga: z.number().min(0).max(1000).optional(),
  concluido: z.boolean().optional(),
})

// Schemas de validação para Refeição
export const createRefeicaoSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').max(100),
  calorias: z.number().int().min(0).max(5000).default(0),
  proteinas: z.number().min(0).max(500).default(0),
  diaDaSemanaId: z.string().min(1, 'Dia da semana é obrigatório'),
})

export const updateRefeicaoSchema = z.object({
  id: z.string().min(1),
  nome: z.string().min(1, 'Nome é obrigatório').max(100).optional(),
  calorias: z.number().int().min(0).max(5000).optional(),
  proteinas: z.number().min(0).max(500).optional(),
  concluida: z.boolean().optional(),
})

// Types inferidos dos schemas
export type CreateTreinoInput = z.infer<typeof createTreinoSchema>
export type UpdateTreinoInput = z.infer<typeof updateTreinoSchema>
export type CreateExercicioInput = z.infer<typeof createExercicioSchema>
export type UpdateExercicioInput = z.infer<typeof updateExercicioSchema>
export type CreateRefeicaoInput = z.infer<typeof createRefeicaoSchema>
export type UpdateRefeicaoInput = z.infer<typeof updateRefeicaoSchema>


