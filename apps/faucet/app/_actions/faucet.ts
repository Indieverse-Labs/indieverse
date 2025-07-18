'use server'

import { actionClient } from '@/app/_actions/safe-action'
import { contractABI } from '@indieverse/contracts/abi'
import {
  http,
  type Address,
  type Hex,
  createWalletClient,
  isAddress,
  publicActions,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { hardhat, sepolia } from 'viem/chains'
import z from 'zod'

const contractAddress = process.env.FAUCET_CONTRACT_ADDRESS as Address

export const faucet = actionClient
  .inputSchema(
    z.object({
      address: z.string().refine(isAddress, {
        message: 'Invalid address',
      }) as z.ZodType<Address>,
      chainId: z.number(),
    }),
  )
  .action(async ({ parsedInput: { address, chainId } }) => {
    const chain = chainId === 11155111 ? sepolia : hardhat

    const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as Hex)

    const walletClient = createWalletClient({
      account,
      chain,
      transport: http(process.env.RPC_NODE_URL),
    }).extend(publicActions)

    console.log('Faucet contract address:', contractAddress)
    console.log('User address:', address)

    const initial = await walletClient.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'getBalance',
    })
    console.log('Initial value:', initial.toString())

    const { request } = await walletClient.simulateContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'send',
      args: [address],
    })

    const txHash = await walletClient.writeContract(request)
    console.log('Transaction hash:', txHash)

    await walletClient.waitForTransactionReceipt({ hash: txHash })

    const current = await walletClient.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'getBalance',
    })
    console.log('Current value:', current.toString())
  })
