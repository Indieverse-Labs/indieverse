import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { cookieStorage, createStorage } from 'wagmi'
import { hardhat, sepolia } from 'wagmi/chains'

const isDev = process.env.NODE_ENV === 'development'

export const config = getDefaultConfig({
  storage: createStorage({
    storage: cookieStorage,
  }),
  appName: 'Faucet',
  projectId: 'a8af82025fcd4f8403d9e65ad8872736',
  chains: isDev ? [sepolia, hardhat] : [sepolia],
  ssr: true,
})
