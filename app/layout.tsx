import type { Metadata } from 'next'
import { Bebas_Neue, Source_Serif_4, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'Tech & life',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className={`${bebasNeue.variable} ${sourceSerif4.variable} ${jetBrainsMono.variable}`}>
      <body>
        <Nav />
        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
