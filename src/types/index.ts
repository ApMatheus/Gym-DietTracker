export interface Exercicio {
  id: string
  nome: string
  series: number
  repeticoes: number
  carga: number
  concluido: boolean
  treinoId: string
  createdAt: Date
  updatedAt: Date
}

export interface Treino {
  id: string
  nome: string
  diaDaSemanaId: string
  exercicios: Exercicio[]
  createdAt: Date
  updatedAt: Date
}

export interface Alimento {
  id: string
  nome: string
  quantidade: string | null
  calorias: number
  proteinas: number
  refeicaoId: string
  createdAt: Date
  updatedAt: Date
}

export interface Refeicao {
  id: string
  nome: string
  calorias: number
  proteinas: number
  concluida: boolean
  diaDaSemanaId: string
  alimentos: Alimento[]
  createdAt: Date
  updatedAt: Date
}

export interface DiaDaSemana {
  id: string
  nome: string
  ordem: number
  treinos: Treino[]
  refeicoes: Refeicao[]
  createdAt: Date
  updatedAt: Date
}
