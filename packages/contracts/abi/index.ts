import { parseAbi } from 'viem'

export const contractABI = parseAbi([
  'function sendMe() external',
  'function send(address to) external',
  'function getBalance() public view returns (uint256)',
])
