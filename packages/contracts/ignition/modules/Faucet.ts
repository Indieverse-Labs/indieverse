import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const FaucetModule = buildModule('FaucetModule', (m) => {
  const owner = m.getAccount(0)
  const faucet = m.contract('Faucet', [owner])

  return { faucet }
})

export default FaucetModule
