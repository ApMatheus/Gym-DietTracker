'use client'

import { Dumbbell, Utensils, Flame, Beef } from 'lucide-react'
import { TreinoCard } from './TreinoCard'
import { RefeicaoCard } from './RefeicaoCard'
import { AddTreinoForm } from './AddTreinoForm'
import { AddRefeicaoForm } from './AddRefeicaoForm'
import { ProgressBar } from './ProgressBar'

interface Exercicio {
  id: string
  nome: string
  series: number
  repeticoes: number
  carga: number
  concluido: boolean
}

interface Treino {
  id: string
  nome: string
  exercicios: Exercicio[]
}

interface Alimento {
  id: string
  nome: string
  quantidade: string | null
  calorias: number
  proteinas: number
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

interface DiaCardProps {
  dia: DiaDaSemana
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

export function DiaCard({ dia }: DiaCardProps) {
  // Calcular totais de exercícios
  const totalExercicios = dia.treinos.reduce((acc, treino) => acc + treino.exercicios.length, 0)
  const exerciciosConcluidos = dia.treinos.reduce(
    (acc, treino) => acc + treino.exercicios.filter((e) => e.concluido).length,
    0
  )

  // Calcular totais de refeições
  const totalRefeicoes = dia.refeicoes.length
  const refeicoesConcluidas = dia.refeicoes.filter((r) => r.concluida).length

  // Calcular totais de calorias e proteínas
  const totalCalorias = dia.refeicoes.reduce((acc, r) => acc + r.calorias, 0)
  const totalProteinas = dia.refeicoes.reduce((acc, r) => acc + r.proteinas, 0)
  const caloriasConsumidas = dia.refeicoes.filter((r) => r.concluida).reduce((acc, r) => acc + r.calorias, 0)
  const proteinasConsumidas = dia.refeicoes.filter((r) => r.concluida).reduce((acc, r) => acc + r.proteinas, 0)

  return (
    <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-950 rounded-2xl border border-zinc-800/50 overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 px-5 py-4 border-b border-zinc-800/50">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{diasEmoji[dia.nome] || '📅'}</span>
          <h2 className="text-xl font-bold text-white">{dia.nome}</h2>
        </div>

        {/* Stats resumidas */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          {totalExercicios > 0 && (
            <ProgressBar
              completed={exerciciosConcluidos}
              total={totalExercicios}
              label="Exercícios"
              colorClass="bg-emerald-500"
            />
          )}
          {totalRefeicoes > 0 && (
            <ProgressBar
              completed={refeicoesConcluidas}
              total={totalRefeicoes}
              label="Refeições"
              colorClass="bg-orange-500"
            />
          )}
        </div>

        {/* Totais de macros */}
        {totalRefeicoes > 0 && (
          <div className="mt-3 flex gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-orange-400">
              <Flame size={12} />
              <span>
                {caloriasConsumidas}/{totalCalorias} kcal
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-rose-400">
              <Beef size={12} />
              <span>
                {proteinasConsumidas.toFixed(0)}/{totalProteinas.toFixed(0)}g proteína
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-5 space-y-6">
        {/* Seção de Treinos */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Dumbbell size={18} className="text-emerald-500" />
            <h3 className="font-semibold text-zinc-300">Treinos</h3>
          </div>

          <div className="space-y-3">
            {dia.treinos.map((treino) => (
              <TreinoCard key={treino.id} treino={treino} />
            ))}
            <AddTreinoForm diaDaSemanaId={dia.id} />
          </div>
        </section>

        {/* Seção de Refeições */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Utensils size={18} className="text-orange-500" />
            <h3 className="font-semibold text-zinc-300">Refeições</h3>
          </div>

          <div className="space-y-2">
            {dia.refeicoes.map((refeicao) => (
              <RefeicaoCard key={refeicao.id} refeicao={refeicao} />
            ))}
            <AddRefeicaoForm diaDaSemanaId={dia.id} />
          </div>
        </section>
      </div>
    </div>
  )
}
