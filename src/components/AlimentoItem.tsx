'use client'

import { useState, useTransition } from 'react'
import { Pencil, Trash2, Check, X } from 'lucide-react'
import { updateAlimento, deleteAlimento } from '@/actions/alimento'

interface Alimento {
  id: string
  nome: string
  quantidade: string | null
  calorias: number
  proteinas: number
}

interface AlimentoItemProps {
  alimento: Alimento
}

export function AlimentoItem({ alimento }: AlimentoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    nome: alimento.nome,
    quantidade: alimento.quantidade || '',
    calorias: alimento.calorias,
    proteinas: alimento.proteinas,
  })

  const handleUpdate = () => {
    startTransition(async () => {
      await updateAlimento({
        id: alimento.id,
        ...formData,
        quantidade: formData.quantidade || null,
      })
      setIsEditing(false)
    })
  }

  const handleDelete = () => {
    startTransition(async () => {
      await deleteAlimento(alimento.id)
    })
  }

  if (isEditing) {
    return (
      <div className="bg-zinc-800/50 rounded p-2 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            className="col-span-2 bg-zinc-900 border border-zinc-600 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-orange-500"
            placeholder="Nome do alimento"
          />
          <input
            type="text"
            value={formData.quantidade}
            onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
            className="bg-zinc-900 border border-zinc-600 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-orange-500"
            placeholder="Qtd (ex: 100g)"
          />
          <div className="flex gap-1">
            <input
              type="number"
              value={formData.calorias}
              onChange={(e) => setFormData({ ...formData, calorias: parseInt(e.target.value) || 0 })}
              className="w-1/2 bg-zinc-900 border border-zinc-600 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-orange-500"
              placeholder="kcal"
            />
            <input
              type="number"
              step="0.1"
              value={formData.proteinas}
              onChange={(e) => setFormData({ ...formData, proteinas: parseFloat(e.target.value) || 0 })}
              className="w-1/2 bg-zinc-900 border border-zinc-600 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-orange-500"
              placeholder="prot"
            />
          </div>
        </div>
        <div className="flex gap-1 justify-end">
          <button
            onClick={() => setIsEditing(false)}
            className="p-1 text-zinc-400 hover:text-white transition-colors"
            disabled={isPending}
          >
            <X size={12} />
          </button>
          <button
            onClick={handleUpdate}
            className="p-1 text-orange-500 hover:text-orange-400 transition-colors"
            disabled={isPending}
          >
            <Check size={12} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="group flex items-center justify-between py-1 px-2 rounded hover:bg-zinc-800/30 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-300">{alimento.nome}</span>
          {alimento.quantidade && (
            <span className="text-xs text-zinc-500">({alimento.quantidade})</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-zinc-500">
          <span>{alimento.calorias} kcal</span>
          <span>•</span>
          <span>{alimento.proteinas}g prot</span>
        </div>
      </div>
      <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsEditing(true)}
          className="p-1 text-zinc-500 hover:text-white transition-colors"
        >
          <Pencil size={10} />
        </button>
        <button
          onClick={handleDelete}
          className="p-1 text-zinc-500 hover:text-red-500 transition-colors"
          disabled={isPending}
        >
          <Trash2 size={10} />
        </button>
      </div>
    </div>
  )
}

