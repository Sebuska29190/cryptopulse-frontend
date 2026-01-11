import type { Metadata } from 'next'
import '../styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
    <html lang="en" className="dark">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <div id="page" className="site">
          <Header />

          <div id="content" className="container-fluid home">
            <div className="row">
              {children}
            </div>
          </div>

          <Footer />
        </div>
      </body>
    </html>
  )
}