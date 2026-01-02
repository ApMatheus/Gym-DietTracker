'use client'

import { useState, useTransition } from 'react'
import { Pencil, Trash2, Plus, Check, X, ChevronDown, ChevronUp } from 'lucide-react'
import { updateTreino, deleteTreino } from '@/actions/treino'
import { createExercicio } from '@/actions/exercicio'
import { ExercicioCard } from './ExercicioCard'
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

interface TreinoCardProps {
  treino: Treino
}

export function TreinoCard({ treino }: TreinoCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)
  const [showAddExercicio, setShowAddExercicio] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [nome, setNome] = useState(treino.nome)
  const [novoExercicio, setNovoExercicio] = useState({
    nome: '',
    series: 3,
    repeticoes: 10,
    carga: 0,
  })

  const exerciciosConcluidos = treino.exercicios.filter((e) => e.concluido).length
  const totalExercicios = treino.exercicios.length

  const handleUpdate = () => {
    startTransition(async () => {
      await updateTreino({ id: treino.id, nome })
      setIsEditing(false)
    })
  }

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir este treino e todos os exercícios?')) {
      startTransition(async () => {
        await deleteTreino(treino.id)
      })
    }
  }

  const handleAddExercicio = () => {
    if (!novoExercicio.nome.trim()) return

    startTransition(async () => {
      await createExercicio({
        ...novoExercicio,
        treinoId: treino.id,
      })
      setNovoExercicio({ nome: '', series: 3, repeticoes: 10, carga: 0 })
      setShowAddExercicio(false)
    })
  }

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden">
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between gap-2">
          {isEditing ? (
            <div className="flex items-center gap-2 flex-1">
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="flex-1 bg-zinc-800 border border-zinc-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-emerald-500"
                autoFocus
              />
              <button
                onClick={handleUpdate}
                className="p-1.5 text-emerald-500 hover:text-emerald-400"
                disabled={isPending}
              >
                <Check size={16} />
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setNome(treino.nome)
                }}
                className="p-1.5 text-zinc-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 flex-1 text-left"
              >
                <h4 className="font-semibold text-white">{treino.nome}</h4>
                {isExpanded ? (
                  <ChevronUp size={16} className="text-zinc-500" />
                ) : (
                  <ChevronDown size={16} className="text-zinc-500" />
                )}
              </button>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors"
                  disabled={isPending}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </>
          )}
        </div>

        {totalExercicios > 0 && (
          <div className="mt-3">
            <ProgressBar
              completed={exerciciosConcluidos}
              total={totalExercicios}
              label="Exercícios"
              colorClass="bg-emerald-500"
            />
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="p-4">
          {treino.exercicios.length > 0 ? (
            <div className="space-y-2 mb-4">
              {treino.exercicios.map((exercicio) => (
                <ExercicioCard key={exercicio.id} exercicio={exercicio} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-500 mb-4">Nenhum exercício cadastrado</p>
          )}

          {showAddExercicio ? (
            <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700 space-y-2">
              <input
                type="text"
                value={novoExercicio.nome}
                onChange={(e) => setNovoExercicio({ ...novoExercicio, nome: e.target.value })}
                placeholder="Nome do exercício"
                className="w-full bg-zinc-900 border border-zinc-600 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                autoFocus
              />
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs text-zinc-500">Séries</label>
                  <input
                    type="number"
                    value={novoExercicio.series}
                    onChange={(e) =>
                      setNovoExercicio({ ...novoExercicio, series: parseInt(e.target.value) || 0 })
                    }
                    className="w-full bg-zinc-900 border border-zinc-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-500">Reps</label>
                  <input
                    type="number"
                    value={novoExercicio.repeticoes}
                    onChange={(e) =>
                      setNovoExercicio({ ...novoExercicio, repeticoes: parseInt(e.target.value) || 0 })
                    }
                    className="w-full bg-zinc-900 border border-zinc-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-500">Carga (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={novoExercicio.carga}
                    onChange={(e) =>
                      setNovoExercicio({ ...novoExercicio, carga: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full bg-zinc-900 border border-zinc-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowAddExercicio(false)}
                  className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddExercicio}
                  disabled={isPending || !novoExercicio.nome.trim()}
                  className="px-3 py-1.5 text-sm bg-emerald-600 hover:bg-emerald-500 text-white rounded transition-colors disabled:opacity-50"
                >
                  Adicionar
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddExercicio(true)}
              className="w-full py-2 border border-dashed border-zinc-700 rounded-lg text-sm text-zinc-400 hover:text-emerald-400 hover:border-emerald-600 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={14} />
              Adicionar Exercício
            </button>
          )}
        </div>
      )}
    </div>
  )
}

