import { type HardhatUserConfig, vars } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox-viem'

const config: HardhatUserConfig = {
  solidity: '0.8.28',
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${vars.get('INFURA_API_KEY')}`,
      accounts: [vars.get('SEPOLIA_PRIVATE_KEY')],
    },
  },
}

export default config
