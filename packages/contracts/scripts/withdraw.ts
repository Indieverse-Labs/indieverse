import hre from 'hardhat'

import type { Address } from 'viem'
import { contractABI } from '../abi'

async function main() {
  const client = await hre.viem.getPublicClient()
  const wallet = await hre.viem.getWalletClient(
    '0xBc9ba6aDb3733E2d8A91e2d094642F9b9576C86d',
  )
  console.log(wallet)
  const contractAddress =
    '0x77CB2F9690352b9405a8bfB34aAB0DB2BA20DE44' as Address

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
