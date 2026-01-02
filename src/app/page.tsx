import { getDiasDaSemana } from '@/actions/dia'
import { checkWeeklyReset, getWeekInfo } from '@/actions/reset'
import { Header } from '@/components/Header'
import { DiaPreviewCard } from '@/components/DiaPreviewCard'
import { WeekHeader } from '@/components/WeekHeader'
import { WeekResetHandler } from '@/components/WeekResetHandler'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // Verificar se precisa resetar (sem executar ainda)
  const [resetCheck, dias, weekInfo] = await Promise.all([
    checkWeeklyReset(),
    getDiasDaSemana(),
    getWeekInfo()
  ])

  // Identificar o dia atual
  const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  const hoje = diasSemana[new Date().getDay()]

  // Formatar datas
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {dias.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏋️</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Nenhum dia cadastrado ainda
            </h2>
            <p className="text-zinc-400 mb-8">
              Execute o seed para criar os dias da semana com exemplos
            </p>
            <code className="bg-zinc-800 text-emerald-400 px-4 py-2 rounded-lg text-sm">
              npx prisma db seed
            </code>
          </div>
        ) : (
          <>
            {/* Handler de reset automático (client component) */}
            <WeekResetHandler needsReset={resetCheck.needsReset} />

            <WeekHeader 
              weekNumber={weekInfo.weekNumber}
              year={weekInfo.year}
              startDate={formatDate(weekInfo.startDate)}
              endDate={formatDate(weekInfo.endDate)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {dias.map((dia) => (
                <DiaPreviewCard 
                  key={dia.id} 
                  dia={dia} 
                  isToday={dia.nome === hoje}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-zinc-800/50 py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-zinc-600 text-sm">
            Gym & Diet Tracker - Controle sua rotina de treino e alimentação
          </p>
        </div>
      </footer>
    </div>
  )
}
