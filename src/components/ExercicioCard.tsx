'use client'

import { useState, useTransition } from 'react'
import { Check, Pencil, Trash2, X, Dumbbell } from 'lucide-react'
import { toggleExercicio, updateExercicio, deleteExercicio } from '@/actions/exercicio'

interface Exercicio {
  id: string
  nome: string
  series: number
  repeticoes: number
  carga: number
  concluido: boolean
}

interface ExercicioCardProps {
  exercicio: Exercicio
}

export function ExercicioCard({ exercicio }: ExercicioCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    nome: exercicio.nome,
    series: exercicio.series,
    repeticoes: exercicio.repeticoes,
    carga: exercicio.carga,
  })

  const handleToggle = () => {
    startTransition(async () => {
      await toggleExercicio(exercicio.id)
    })
  }

  const handleUpdate = () => {
    startTransition(async () => {
      await updateExercicio({
        id: exercicio.id,
        ...formData,
      })
      setIsEditing(false)
    })
  }

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir este exercício?')) {
      startTransition(async () => {
        await deleteExercicio(exercicio.id)
      })
    }
  }

  if (isEditing) {
    return (
      <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700">
        <div className="space-y-2">
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-emerald-500"
            placeholder="Nome do exercício"
          />
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs text-zinc-500">Séries</label>
              <input
                type="number"
                value={formData.series}
                onChange={(e) => setFormData({ ...formData, series: parseInt(e.target.value) || 0 })}
                className="w-full bg-zinc-900 border border-zinc-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500">Reps</label>
              <input
                type="number"
                value={formData.repeticoes}
                onChange={(e) => setFormData({ ...formData, repeticoes: parseInt(e.target.value) || 0 })}
                className="w-full bg-zinc-900 border border-zinc-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500">Carga (kg)</label>
              <input
                type="number"
                step="0.5"
                value={formData.carga}
                onChange={(e) => setFormData({ ...formData, carga: parseFloat(e.target.value) || 0 })}
                className="w-full bg-zinc-900 border border-zinc-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setIsEditing(false)}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors"
              disabled={isPending}
            >
              <X size={16} />
            </button>
            <button
              onClick={handleUpdate}
              className="p-1.5 text-emerald-500 hover:text-emerald-400 transition-colors"
              disabled={isPending}
            >
              <Check size={16} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`group flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
        exercicio.concluido
          ? 'bg-emerald-900/20 border-emerald-800/50'
          : 'bg-zinc-800/50 border-zinc-700/50 hover:border-zinc-600'
      }`}
    >
      <button
        onClick={handleToggle}
        disabled={isPending}
        className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
          exercicio.concluido
            ? 'bg-emerald-500 border-emerald-500'
            : 'border-zinc-500 hover:border-emerald-500'
        }`}
      >
        {exercicio.concluido && <Check size={12} className="text-white" />}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate ${
            exercicio.concluido ? 'text-zinc-400 line-through' : 'text-white'
          }`}
        >
          {exercicio.nome}
        </p>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="text-xs text-zinc-500">
            {exercicio.series}x{exercicio.repeticoes}
          </span>
          {exercicio.carga > 0 && (
            <span className="text-xs text-amber-500 flex items-center gap-1">
              <Dumbbell size={10} />
              {exercicio.carga}kg
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
    </div>
  )
}

