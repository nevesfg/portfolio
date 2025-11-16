import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '</Victor Neves>',
  description: 'Portfolio inspirado no perfil da Steam',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}