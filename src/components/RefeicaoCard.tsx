'use client'

import { useState, useTransition } from 'react'
import { Check, Pencil, Trash2, X, Flame, Beef, Plus, ChevronDown, ChevronUp, Apple } from 'lucide-react'
import { toggleRefeicao, updateRefeicao, deleteRefeicao } from '@/actions/refeicao'
import { createAlimento } from '@/actions/alimento'
import { AlimentoItem } from './AlimentoItem'

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

interface RefeicaoCardProps {
  refeicao: Refeicao
}

export function RefeicaoCard({ refeicao }: RefeicaoCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showAddAlimento, setShowAddAlimento] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    nome: refeicao.nome,
  })
  const [novoAlimento, setNovoAlimento] = useState({
    nome: '',
    quantidade: '',
    calorias: 0,
    proteinas: 0,
  })

  const handleToggle = () => {
    startTransition(async () => {
      await toggleRefeicao(refeicao.id)
    })
  }

  const handleUpdate = () => {
    startTransition(async () => {
      await updateRefeicao({
        id: refeicao.id,
        nome: formData.nome,
      })
      setIsEditing(false)
    })
  }

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir esta refeição e todos os alimentos?')) {
      startTransition(async () => {
        await deleteRefeicao(refeicao.id)
      })
    }
  }

  const handleAddAlimento = () => {
    if (!novoAlimento.nome.trim()) return

    startTransition(async () => {
      await createAlimento({
        ...novoAlimento,
        quantidade: novoAlimento.quantidade || undefined,
        refeicaoId: refeicao.id,
      })
      setNovoAlimento({ nome: '', quantidade: '', calorias: 0, proteinas: 0 })
      setShowAddAlimento(false)
    })
  }

  if (isEditing) {
    return (
      <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700">
        <div className="space-y-2">
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-orange-500"
            placeholder="Nome da refeição"
          />
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
              className="p-1.5 text-orange-500 hover:text-orange-400 transition-colors"
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
      className={`rounded-lg border transition-all duration-200 overflow-hidden ${
        refeicao.concluida
          ? 'bg-orange-900/20 border-orange-800/50'
          : 'bg-zinc-800/50 border-zinc-700/50 hover:border-zinc-600'
      }`}
    >
      {/* Header da Refeição */}
      <div className="group flex items-center gap-3 p-3">
        <button
          onClick={handleToggle}
          disabled={isPending}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
            refeicao.concluida
              ? 'bg-orange-500 border-orange-500'
              : 'border-zinc-500 hover:border-orange-500'
          }`}
        >
          {refeicao.concluida && <Check size={12} className="text-white" />}
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 min-w-0 text-left"
        >
          <p
            className={`text-sm font-medium truncate ${
              refeicao.concluida ? 'text-zinc-400 line-through' : 'text-white'
            }`}
          >
            {refeicao.nome}
          </p>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-xs text-orange-400 flex items-center gap-1">
              <Flame size={10} />
              {refeicao.calorias} kcal
            </span>
            <span className="text-xs text-rose-400 flex items-center gap-1">
              <Beef size={10} />
              {refeicao.proteinas}g
            </span>
            <span className="text-xs text-zinc-500 flex items-center gap-1">
              <Apple size={10} />
              {refeicao.alimentos.length} itens
            </span>
          </div>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            disabled={isPending}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Lista de Alimentos */}
      {isExpanded && (
        <div className="border-t border-zinc-700/50 p-3 pt-2">
          {refeicao.alimentos.length > 0 ? (
            <div className="space-y-1 mb-3">
              {refeicao.alimentos.map((alimento) => (
                <AlimentoItem key={alimento.id} alimento={alimento} />
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-500 mb-3">Nenhum alimento adicionado</p>
          )}

          {showAddAlimento ? (
            <div className="bg-zinc-900/50 rounded p-2 space-y-2">
              <input
                type="text"
                value={novoAlimento.nome}
                onChange={(e) => setNovoAlimento({ ...novoAlimento, nome: e.target.value })}
                placeholder="Nome do alimento"
                className="w-full bg-zinc-800 border border-zinc-600 rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                autoFocus
              />
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  value={novoAlimento.quantidade}
                  onChange={(e) => setNovoAlimento({ ...novoAlimento, quantidade: e.target.value })}
                  placeholder="Qtd (100g)"
                  className="bg-zinc-800 border border-zinc-600 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-orange-500"
                />
                <input
                  type="number"
                  value={novoAlimento.calorias}
                  onChange={(e) => setNovoAlimento({ ...novoAlimento, calorias: parseInt(e.target.value) || 0 })}
                  placeholder="kcal"
                  className="bg-zinc-800 border border-zinc-600 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-orange-500"
                />
                <input
                  type="number"
                  step="0.1"
                  value={novoAlimento.proteinas}
                  onChange={(e) => setNovoAlimento({ ...novoAlimento, proteinas: parseFloat(e.target.value) || 0 })}
                  placeholder="prot (g)"
                  className="bg-zinc-800 border border-zinc-600 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowAddAlimento(false)}
                  className="px-2 py-1 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddAlimento}
                  disabled={isPending || !novoAlimento.nome.trim()}
                  className="px-2 py-1 text-xs bg-orange-600 hover:bg-orange-500 text-white rounded transition-colors disabled:opacity-50"
                >
                  Adicionar
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddAlimento(true)}
              className="w-full py-1.5 border border-dashed border-zinc-700 rounded text-xs text-zinc-400 hover:text-orange-400 hover:border-orange-600 transition-colors flex items-center justify-center gap-1"
            >
              <Plus size={12} />
              Adicionar Alimento
            </button>
          )}
        </div>
      )}
    </div>
  )
}
