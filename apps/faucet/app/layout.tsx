import { GeistMono } from 'geist/font/mono'

import '@indieverse/ui/globals.css'
import { RainbowProvider } from '@/app/_providers/rainbow.provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${GeistMono.className}`}>
        <RainbowProvider>{children}</RainbowProvider>
      </body>
    </html>
  )
}
