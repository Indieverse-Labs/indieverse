import hre from 'hardhat'
import { parseAbi } from 'viem'

const contractABI = parseAbi([
  'function withdraw() external',
  'function getBalance() external view returns (uint256)',
])

async function main() {
  const client = await hre.viem.getPublicClient()
  const wallet = await hre.viem.getWalletClient(
    '0xBc9ba6aDb3733E2d8A91e2d094642F9b9576C86d',
  )
  const contractAddress = '0xe5Bbc2bA6AE4acBBF63baC57477d4cE515e2D596'

  const initial = await client.readContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getBalance',
  })
  console.log('Initial value:', initial.toString())

  const txHash = await wallet.writeContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'withdraw',
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
