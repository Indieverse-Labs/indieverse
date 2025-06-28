import { parseAbi } from 'viem'

export const abi = parseAbi([
  'function withdraw() external',
  'function getBalance() external view returns (uint256)',
])
