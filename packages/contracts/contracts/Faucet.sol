pragma solidity ^0.8.28;

import "hardhat/console.sol";

contract Faucet {
    address payable public owner;

    uint256 public constant AMOUNT = 0.1 ether;

    uint256 public constant WITHDRAWAL_INTERVAL = 1 minutes;

    mapping (address => uint256) public lastWithdrawal;

    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    receive() external payable {}

    function withdraw() external {
        require(address(this).balance >= AMOUNT, "Insufficient funds in faucet");
        require(
            block.timestamp >= lastWithdrawal[msg.sender] + WITHDRAWAL_INTERVAL,
            "You must wait before requesting again"
        );

        lastWithdrawal[msg.sender] = block.timestamp;

        payable(msg.sender).transfer(AMOUNT);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

}