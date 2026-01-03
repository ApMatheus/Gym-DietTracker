import { notFound } from 'next/navigation'
import { getDiaDaSemana, getDiasDaSemana } from '@/actions/dia'
import { Header } from '@/components/Header'
import { DiaNavigation } from '@/components/DiaNavigation'
import { TreinoCard } from '@/components/TreinoCard'
import { RefeicaoCard } from '@/components/RefeicaoCard'
import { AddTreinoForm } from '@/components/AddTreinoForm'
import { AddRefeicaoForm } from '@/components/AddRefeicaoForm'
import { ProgressBar } from '@/components/ProgressBar'
import { Dumbbell, Utensils, Flame, Beef, Home } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ id: string }>
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

export default async function DiaPage({ params }: PageProps) {
  const { id } = await params
  const [dia, todosDias] = await Promise.all([
    getDiaDaSemana(id),
    getDiasDaSemana(),
  ])

  if (!dia) {
    notFound()
  }

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

  // Identificar dia atual
  const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  const hoje = diasSemana[new Date().getDay()]
  const isToday = dia.nome === hoje

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <Home size={16} />
            <span>Voltar para a semana</span>
          </Link>
        </div>

        {/* Navegação entre dias */}
        <DiaNavigation dias={todosDias} currentDiaId={id} />

        {/* Header do dia */}
        <div className={`rounded-2xl border p-6 mb-6 ${
          isToday 
            ? 'bg-gradient-to-r from-emerald-900/30 to-zinc-900/50 border-emerald-800/50' 
            : 'bg-gradient-to-r from-zinc-900/50 to-zinc-900/30 border-zinc-800/50'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{diasEmoji[dia.nome] || '📅'}</span>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-white">{dia.nome}</h1>
                  {isToday && (
                    <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold uppercase rounded-full">
                      Hoje
                    </span>
                  )}
                </div>
                <p className="text-zinc-400 text-sm mt-1">
                  {dia.treinos.length} treino{dia.treinos.length !== 1 ? 's' : ''} • {totalRefeicoes} refeições
                </p>
              </div>
            </div>
          </div>

          {/* Stats resumidas */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <ProgressBar
              completed={exerciciosConcluidos}
              total={totalExercicios}
              label="Exercícios"
              colorClass="bg-emerald-500"
            />
            <ProgressBar
              completed={refeicoesConcluidas}
              total={totalRefeicoes}
              label="Refeições"
              colorClass="bg-orange-500"
            />
          </div>

          {/* Totais de macros */}
          {totalRefeicoes > 0 && (
            <div className="flex gap-6 text-sm pt-4 border-t border-zinc-800/50">
              <div className="flex items-center gap-2 text-orange-400">
                <Flame size={16} />
                <span className="text-zinc-300">
                  <span className="font-semibold text-white">{caloriasConsumidas}</span>
                  <span className="text-zinc-500"> / {totalCalorias} kcal</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-rose-400">
                <Beef size={16} />
                <span className="text-zinc-300">
                  <span className="font-semibold text-white">{proteinasConsumidas.toFixed(0)}</span>
                  <span className="text-zinc-500"> / {totalProteinas.toFixed(0)}g proteína</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Seção de Treinos */}
          <section className="bg-zinc-900/50 rounded-2xl border border-zinc-800/50 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Dumbbell size={20} className="text-emerald-500" />
              </div>
              <h2 className="text-lg font-semibold text-white">Treinos</h2>
            </div>

            <div className="space-y-3">
              {dia.treinos.length > 0 ? (
                dia.treinos.map((treino) => (
                  <TreinoCard key={treino.id} treino={treino} />
                ))
              ) : (
                <p className="text-zinc-500 text-sm py-4 text-center">
                  Nenhum treino cadastrado para este dia
                </p>
              )}
              <AddTreinoForm diaDaSemanaId={dia.id} />
            </div>
          </section>

          {/* Seção de Refeições */}
          <section className="bg-zinc-900/50 rounded-2xl border border-zinc-800/50 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Utensils size={20} className="text-orange-500" />
              </div>
              <h2 className="text-lg font-semibold text-white">Refeições</h2>
            </div>

            <div className="space-y-3">
              {dia.refeicoes.length > 0 ? (
                dia.refeicoes.map((refeicao) => (
                  <RefeicaoCard key={refeicao.id} refeicao={refeicao} />
                ))
              ) : (
                <p className="text-zinc-500 text-sm py-4 text-center">
                  Nenhuma refeição cadastrada para este dia
                </p>
              )}
              <AddRefeicaoForm diaDaSemanaId={dia.id} />
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-zinc-800/50 py-6 mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-zinc-600 text-sm">
            Gym & Diet Tracker - Controle sua rotina de treino e alimentação
          </p>
        </div>
      </footer>
    </div>
  )
}


