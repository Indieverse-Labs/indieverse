'use client'

import '@rainbow-me/rainbowkit/styles.css'
import {
  RainbowKitProvider,
  type Theme,
  darkTheme,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { hardhat, sepolia } from 'wagmi/chains'

const queryClient = new QueryClient()

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [sepolia, hardhat],
  ssr: true,
})

const defaultTheme = darkTheme()

const theme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    accentColor: 'var(--accent)',
    accentColorForeground: 'var(--accent-foreground)',
  },
  fonts: {
    ...defaultTheme.fonts,
    body: 'var(--font-sans)',
  },
  shadows: {
    ...defaultTheme.shadows,
    connectButton: 'var(--shadow-xs)',
  },
  radii: {
    ...defaultTheme.radii,
    connectButton: '0',
  },
}

export function RainbowProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={theme}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
