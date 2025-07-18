// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract Faucet is Ownable {
    uint256 public constant AMOUNT = 0.01 ether;
    uint256 public constant WITHDRAWAL_INTERVAL = 24 hours;
    mapping (address => uint256) public lastWithdrawal;

    constructor(address initialOwner) Ownable(initialOwner) {}

    receive() external payable {}

    fallback() external payable {}

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function _send(address sender) private {
        uint256 balance = getBalance();

        require(balance >= AMOUNT, "Insufficient funds in faucet");
        require(
            block.timestamp >= lastWithdrawal[sender] + WITHDRAWAL_INTERVAL,
            "You must wait before requesting again"
        );

        lastWithdrawal[sender] = block.timestamp;

        payable(sender).transfer(AMOUNT);
    }

    function send(address to) public onlyOwner {
        _send(to);
    }

    function sendMe() external {
        _send(msg.sender);
    }
}