import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { hardhat, sepolia } from 'wagmi/chains'

const isDev = process.env.NODE_ENV === 'development'

export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: isDev ? [sepolia, hardhat] : [sepolia],
  ssr: true,
})
