'use client'

import Link from 'next/link'
import { Dumbbell, Utensils, Flame, Beef, ChevronRight } from 'lucide-react'

interface Exercicio {
  id: string
  concluido: boolean
}

interface Treino {
  id: string
  nome: string
  exercicios: Exercicio[]
}

interface Alimento {
  id: string
}

interface Refeicao {
  id: string
  nome: string
  calorias: number
  proteinas: number
  concluida: boolean
  alimentos: Alimento[]
}

interface DiaDaSemana {
  id: string
  nome: string
  treinos: Treino[]
  refeicoes: Refeicao[]
}

interface DiaPreviewCardProps {
  dia: DiaDaSemana
  isToday?: boolean
}

const diasEmoji: Record<string, string> = {
  Segunda: '🔵',
  Terça: '🟢',
  Quarta: '🟡',
  Quinta: '🟠',
  Sexta: '🔴',
  Sábado: '🟣',
  Domingo: '⚪',
}

export function DiaPreviewCard({ dia, isToday = false }: DiaPreviewCardProps) {
  // Calcular totais de exercícios
  const totalExercicios = dia.treinos.reduce((acc, treino) => acc + treino.exercicios.length, 0)
  const exerciciosConcluidos = dia.treinos.reduce(
    (acc, treino) => acc + treino.exercicios.filter((e) => e.concluido).length,
    0
  )
  const percentExercicios = totalExercicios > 0 ? Math.round((exerciciosConcluidos / totalExercicios) * 100) : 0

  // Calcular totais de refeições
  const totalRefeicoes = dia.refeicoes.length
  const refeicoesConcluidas = dia.refeicoes.filter((r) => r.concluida).length
  const percentRefeicoes = totalRefeicoes > 0 ? Math.round((refeicoesConcluidas / totalRefeicoes) * 100) : 0

  // Calcular totais de calorias e proteínas
  const totalCalorias = dia.refeicoes.reduce((acc, r) => acc + r.calorias, 0)
  const totalProteinas = dia.refeicoes.reduce((acc, r) => acc + r.proteinas, 0)

  return (
    <Link href={`/dia/${dia.id}`}>
      <div
        className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer ${
          isToday
            ? 'bg-gradient-to-br from-emerald-900/40 to-zinc-900 border-emerald-700/50 shadow-lg shadow-emerald-900/20'
            : 'bg-gradient-to-br from-zinc-900/80 to-zinc-950 border-zinc-800/50 hover:border-zinc-700'
        }`}
      >
        {/* Badge "Hoje" */}
        {isToday && (
          <div className="absolute top-3 right-3 px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold uppercase rounded-full">
            Hoje
          </div>
        )}

        <div className="p-5">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{diasEmoji[dia.nome] || '📅'}</span>
            <div>
              <h3 className="text-lg font-bold text-white">{dia.nome}</h3>
              <p className="text-xs text-zinc-500">
                {dia.treinos.length} treino{dia.treinos.length !== 1 ? 's' : ''} • {totalRefeicoes} refeições
              </p>
            </div>
          </div>

          {/* Progress bars */}
          <div className="space-y-3 mb-4">
            {/* Exercícios */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-zinc-400 flex items-center gap-1">
                  <Dumbbell size={12} className="text-emerald-500" />
                  Exercícios
                </span>
                <span className="text-zinc-300">
                  {exerciciosConcluidos}/{totalExercicios}
                </span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                  style={{ width: `${percentExercicios}%` }}
                />
              </div>
            </div>

            {/* Refeições */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-zinc-400 flex items-center gap-1">
                  <Utensils size={12} className="text-orange-500" />
                  Refeições
                </span>
                <span className="text-zinc-300">
                  {refeicoesConcluidas}/{totalRefeicoes}
                </span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 transition-all duration-500 rounded-full"
                  style={{ width: `${percentRefeicoes}%` }}
                />
              </div>
            </div>
          </div>

          {/* Macros totais */}
          <div className="flex items-center justify-between pt-3 border-t border-zinc-800/50">
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1 text-orange-400">
                <Flame size={12} />
                <span>{totalCalorias} kcal</span>
              </div>
              <div className="flex items-center gap-1 text-rose-400">
                <Beef size={12} />
                <span>{totalProteinas.toFixed(0)}g</span>
              </div>
            </div>
            <ChevronRight 
              size={18} 
              className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" 
            />
          </div>
        </div>
      </div>
    </Link>
  )
}

