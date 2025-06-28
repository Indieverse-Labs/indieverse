import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const FaucetModule = buildModule('FaucetModule', (m) => {
  const faucet = m.contract('Faucet')

  return { faucet }
})

export default FaucetModule
