'use client'

import Link from 'next/link'
import { Dumbbell, Calendar } from 'lucide-react'

export function Header() {
  const today = new Date()
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
  const formattedDate = today.toLocaleDateString('pt-BR', options)

  return (
    <header className="bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-900 border-b border-zinc-800/50 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/20">
              <Dumbbell size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Gym & Diet Tracker
              </h1>
              <p className="text-xs text-zinc-500">Sua rotina de treino e alimentação</p>
            </div>
          </Link>

          <div className="flex items-center gap-2 text-zinc-400">
            <Calendar size={16} />
            <span className="text-sm capitalize hidden sm:inline">{formattedDate}</span>
            <span className="text-sm capitalize sm:hidden">
              {today.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
