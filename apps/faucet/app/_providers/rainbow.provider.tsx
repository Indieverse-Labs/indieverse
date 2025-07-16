'use client'

import '@rainbow-me/rainbowkit/styles.css'
import { config } from '@/app/_providers/config'
import {
  RainbowKitProvider,
  type Theme,
  lightTheme,
} from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

const queryClient = new QueryClient()

const defaultTheme = lightTheme()

const theme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    accentColor: 'var(--accent)',
    accentColorForeground: 'var(--accent-foreground)',
    connectButtonBackground: 'var(--accent)',
    connectButtonInnerBackground: 'var(--accent)',
    connectButtonText: 'var(--accent-foreground)',
    connectButtonBackgroundError: 'var(--destructive)',
    connectButtonTextError: 'var(--destructive-foreground)',
    modalBackground: 'var(--background)',
    modalBorder: 'var(--border)',
    modalText: 'var(--foreground)',
    modalTextSecondary: 'var(--secondary-foreground)',
    profileForeground: 'var(--background)',
    profileAction: 'var(--accent)',
    profileActionHover: 'var(--accent)',
  },
  fonts: {
    body: 'var(--font-sans)',
  },
  shadows: {
    connectButton: 'var(--shadow-xs)',
    dialog: 'var(--shadow-xs)',
    profileDetailsAction: 'var(--shadow-xs)',
    selectedOption: 'var(--shadow-xs)',
    selectedWallet: 'var(--shadow-xs)',
    walletLogo: 'var(--shadow-xs)',
  },
  radii: {
    actionButton: 'var(--radius)',
    connectButton: 'var(--radius)',
    menuButton: 'var(--radius)',
    modal: 'var(--radius)',
    modalMobile: 'var(--radius)',
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
