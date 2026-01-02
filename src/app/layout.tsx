import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gym & Diet Tracker',
  description: 'Controle sua rotina de treino e alimentação de forma simples e visual',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${outfit.variable} font-sans antialiased bg-zinc-950 text-white`}>
        {children}
      </body>
    </html>
  )
}
