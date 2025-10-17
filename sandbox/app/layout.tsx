import './styles/tailwind.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '../../src/components/ui/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Acrobi Design System Playground',
  description: 'Testing and demonstration environment for Acrobi Design System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider defaultMode="system" defaultTheme="base">
          <div className="min-h-screen bg-background text-foreground">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}