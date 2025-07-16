import hre from 'hardhat'

import { contractABI } from '../abi'

async function main() {
  const client = await hre.viem.getPublicClient()
  const wallet = await hre.viem.getWalletClient(
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  )
  const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'

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
