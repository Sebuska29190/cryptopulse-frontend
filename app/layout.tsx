import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Crypto Pulse Now',
  description: 'Latest cryptocurrency news and analysis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-slate-900 text-white p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Crypto Pulse Now</h1>
            <nav>
              <a href="/" className="mr-4 hover:text-blue-400">Home</a>
              <a href="/about" className="hover:text-blue-400">About</a>
            </nav>
          </div>
        </header>
        <main className="max-w-7xl mx-auto p-4">
          {children}
        </main>
        <footer className="bg-slate-900 text-white p-4 text-center">
          <p>&copy; 2023 Crypto Pulse Now. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}