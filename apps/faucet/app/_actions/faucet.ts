'use server'

import { contractABI } from '@indieverse/contracts/abi'
import {
  http,
  type Address,
  createPublicClient,
  createWalletClient,
} from 'viem'
import { hardhat } from 'viem/chains'

const publicClient = createPublicClient({
  chain: hardhat,
  transport: http(),
})

const wallet = createWalletClient({
  chain: hardhat,
  transport: http(),
})

const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'

export const faucet = async ({ address }: { address: Address }) => {
  const initial = await publicClient.readContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getBalance',
  })
  console.log('Initial value:', initial.toString())

  const txHash = await wallet.writeContract({
    account: address,
    address: contractAddress,
    abi: contractABI,
    functionName: 'sendMe',
  })
  console.log('Transaction hash:', txHash)

  await publicClient.waitForTransactionReceipt({ hash: txHash })

  const current = await publicClient.readContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getBalance',
  })
  console.log('Current value:', current.toString())
}
