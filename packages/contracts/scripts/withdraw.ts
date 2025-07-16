import hre from 'hardhat'

import type { Address } from 'viem'
import { contractABI } from '../abi'

async function main() {
  const client = await hre.viem.getPublicClient()
  const wallet = await hre.viem.getWalletClient(
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  )
  const contractAddress = process.env.FAUCET_CONTRACT_ADDRESS as Address

  const initial = await client.readContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getBalance',
  })
  console.log('Initial value:', initial.toString())

  const txHash = await wallet.writeContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'sendMe',
  })
  console.log('Transaction hash:', txHash)

  await client.waitForTransactionReceipt({ hash: txHash })

  const current = await client.readContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getBalance',
  })
  console.log('Current value:', current.toString())
}

main().catch(console.error)
