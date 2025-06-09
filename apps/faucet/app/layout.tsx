import { GeistMono } from 'geist/font/mono'

import '@indieverse/ui/globals.css'

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
      <body className={`${GeistMono.className}`}>{children}</body>
    </html>
  )
}
