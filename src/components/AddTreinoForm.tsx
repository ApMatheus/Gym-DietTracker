'use client'

import { useState, useTransition } from 'react'
import { Plus, X } from 'lucide-react'
import { createTreino } from '@/actions/treino'

interface AddTreinoFormProps {
  diaDaSemanaId: string
}

export function AddTreinoForm({ diaDaSemanaId }: AddTreinoFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [nome, setNome] = useState('')

  const handleSubmit = () => {
    if (!nome.trim()) return

    startTransition(async () => {
      await createTreino({ nome, diaDaSemanaId })
      setNome('')
      setIsOpen(false)
    })
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 border border-dashed border-zinc-700 rounded-xl text-sm text-zinc-400 hover:text-emerald-400 hover:border-emerald-600 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={16} />
        Novo Treino
      </button>
    )
  }

  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-white">Novo Treino</h4>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 text-zinc-400 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Ex: Treino de Peito"
        className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 mb-3"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit()
          if (e.key === 'Escape') setIsOpen(false)
        }}
      />
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={isPending || !nome.trim()}
          className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors disabled:opacity-50"
        >
          Criar Treino
        </button>
      </div>
    </div>
  )
}


