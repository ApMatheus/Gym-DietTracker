'use client'

import { useState, useTransition } from 'react'
import { RotateCcw, Calendar, AlertTriangle } from 'lucide-react'
import { manualReset } from '@/actions/reset'

interface WeekHeaderProps {
  weekNumber: number
  year: number
  startDate: string
  endDate: string
}

export function WeekHeader({ weekNumber, year, startDate, endDate }: WeekHeaderProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleReset = () => {
    startTransition(async () => {
      await manualReset()
      setShowConfirm(false)
    })
  }

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-zinc-400 text-sm mb-1">
            <Calendar size={16} />
            <span>Semana {weekNumber} de {year}</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Sua Semana</h2>
          <p className="text-zinc-500 text-sm mt-1">
            {startDate} - {endDate}
          </p>
        </div>

        {/* Botão de Reset Manual */}
        <div className="relative">
          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-zinc-300 hover:text-white transition-all text-sm"
            >
              <RotateCcw size={16} />
              <span>Resetar Semana</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 p-3 bg-red-900/30 border border-red-700/50 rounded-lg">
              <AlertTriangle size={16} className="text-red-400" />
              <span className="text-red-300 text-sm">Confirmar reset?</span>
              <button
                onClick={handleReset}
                disabled={isPending}
                className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-sm rounded transition-colors disabled:opacity-50"
              >
                {isPending ? 'Resetando...' : 'Sim'}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-white text-sm rounded transition-colors"
              >
                Não
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="text-zinc-400 text-sm mt-2">
        Selecione um dia para ver detalhes do treino e dieta
      </p>
    </div>
  )
}
