'use client'

interface ProgressBarProps {
  completed: number
  total: number
  label?: string
  colorClass?: string
}

export function ProgressBar({
  completed,
  total,
  label,
  colorClass = 'bg-emerald-500',
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs mb-1">
          <span className="text-zinc-400">{label}</span>
          <span className="text-zinc-300 font-medium">
            {completed}/{total} ({percentage}%)
          </span>
        </div>
      )}
      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClass} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}


