'use client'

import { useState, useTransition } from 'react'
import { Plus, X } from 'lucide-react'
import { createRefeicao } from '@/actions/refeicao'

interface AddRefeicaoFormProps {
  diaDaSemanaId: string
}

export function AddRefeicaoForm({ diaDaSemanaId }: AddRefeicaoFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    nome: '',
    calorias: 0,
    proteinas: 0,
  })

  const handleSubmit = () => {
    if (!formData.nome.trim()) return

    startTransition(async () => {
      await createRefeicao({ ...formData, diaDaSemanaId })
      setFormData({ nome: '', calorias: 0, proteinas: 0 })
      setIsOpen(false)
    })
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 border border-dashed border-zinc-700 rounded-xl text-sm text-zinc-400 hover:text-orange-400 hover:border-orange-600 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={16} />
        Nova Refeição
      </button>
    )
  }

  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-white">Nova Refeição</h4>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 text-zinc-400 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      <div className="space-y-3">
        <input
          type="text"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          placeholder="Ex: Café da Manhã"
          className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
          autoFocus
        />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-zinc-500 mb-1 block">Calorias</label>
            <input
              type="number"
              value={formData.calorias}
              onChange={(e) => setFormData({ ...formData, calorias: parseInt(e.target.value) || 0 })}
              className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label className="text-xs text-zinc-500 mb-1 block">Proteínas (g)</label>
            <input
              type="number"
              step="0.1"
              value={formData.proteinas}
              onChange={(e) => setFormData({ ...formData, proteinas: parseFloat(e.target.value) || 0 })}
              className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2 justify-end mt-4">
        <button
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={isPending || !formData.nome.trim()}
          className="px-4 py-2 text-sm bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors disabled:opacity-50"
        >
          Criar Refeição
        </button>
      </div>
    </div>
  )
}


