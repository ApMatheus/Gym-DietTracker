'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface DiaDaSemana {
  id: string
  nome: string
}

interface DiaNavigationProps {
  dias: DiaDaSemana[]
  currentDiaId: string
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

export function DiaNavigation({ dias, currentDiaId }: DiaNavigationProps) {
  const currentIndex = dias.findIndex((d) => d.id === currentDiaId)
  const prevDia = currentIndex > 0 ? dias[currentIndex - 1] : null
  const nextDia = currentIndex < dias.length - 1 ? dias[currentIndex + 1] : null

  // Identificar dia atual
  const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  const hoje = diasSemana[new Date().getDay()]

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Botão Anterior */}
      {prevDia ? (
        <Link
          href={`/dia/${prevDia.id}`}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 text-zinc-300 hover:text-white transition-all"
        >
          <ChevronLeft size={18} />
          <span className="text-sm hidden sm:inline">{prevDia.nome}</span>
        </Link>
      ) : (
        <div className="w-24" />
      )}

      {/* Navegação central - todos os dias */}
      <div className="flex items-center gap-1 bg-zinc-900/50 rounded-xl p-1 border border-zinc-800/50">
        {dias.map((dia) => {
          const isActive = dia.id === currentDiaId
          const isToday = dia.nome === hoje

          return (
            <Link
              key={dia.id}
              href={`/dia/${dia.id}`}
              className={`relative flex items-center justify-center w-9 h-9 rounded-lg transition-all ${
                isActive
                  ? 'bg-zinc-700 shadow-lg'
                  : 'hover:bg-zinc-800/50'
              }`}
              title={dia.nome}
            >
              <span className="text-lg">{diasEmoji[dia.nome] || '📅'}</span>
              {isToday && !isActive && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full" />
              )}
            </Link>
          )
        })}
      </div>

      {/* Botão Próximo */}
      {nextDia ? (
        <Link
          href={`/dia/${nextDia.id}`}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 text-zinc-300 hover:text-white transition-all"
        >
          <span className="text-sm hidden sm:inline">{nextDia.nome}</span>
          <ChevronRight size={18} />
        </Link>
      ) : (
        <div className="w-24" />
      )}
    </div>
  )
}

