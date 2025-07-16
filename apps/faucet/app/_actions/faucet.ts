'use server'

import { contractABI } from '@indieverse/contracts/abi'
import {
  http,
  type Address,
  createPublicClient,
  createWalletClient,
} from 'viem'
import { hardhat, sepolia } from 'viem/chains'

const contractAddress = process.env.FAUCET_CONTRACT_ADDRESS as Address

export const faucet = async ({
  address,
  chainId,
}: { address: Address; chainId: number }) => {
  const chain = chainId === 11155111 ? sepolia : hardhat

  const publicClient = createPublicClient({
    chain: chain,
    transport: http(),
  })

  const wallet = createWalletClient({
    chain: chain,
    transport: http(),
  })

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
