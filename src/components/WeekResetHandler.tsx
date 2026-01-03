'use client'

import { useEffect, useState, useTransition } from 'react'
import { RotateCcw } from 'lucide-react'
import { executeWeeklyReset } from '@/actions/reset'

interface WeekResetHandlerProps {
  needsReset: boolean
}

export function WeekResetHandler({ needsReset }: WeekResetHandlerProps) {
  const [wasReset, setWasReset] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (needsReset && !wasReset) {
      startTransition(async () => {
        const result = await executeWeeklyReset()
        if (result.reset) {
          setWasReset(true)
        }
      })
    }
  }, [needsReset, wasReset])

  if (!wasReset) {
    return null
  }

  return (
    <div className="mb-4 p-4 bg-emerald-900/30 border border-emerald-700/50 rounded-xl flex items-center gap-3 animate-fade-in">
      <div className="p-2 bg-emerald-500/20 rounded-lg">
        <RotateCcw size={20} className="text-emerald-400" />
      </div>
      <div>
        <p className="text-emerald-300 font-medium">Nova semana iniciada! 🎉</p>
        <p className="text-emerald-400/70 text-sm">
          Todos os exercícios e refeições foram resetados automaticamente.
        </p>
      </div>
    </div>
  )
}


