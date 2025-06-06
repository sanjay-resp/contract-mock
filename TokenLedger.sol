// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
interface ITokenLedger {
    function mint(address user, uint256 amount) external returns (string memory);
    function transfer(address from, address to, uint256 amount) external returns (string memory);
    function balanceOf(address user) external view returns (uint256);
}

contract TokenLedger is ITokenLedger {
    mapping(address => uint256) balances;
    mapping(address => bool) minted;

    function mint(address user, uint256 amount) public returns (string memory) {
        if (minted[user]) {
            return "User already minted.";
        }

        balances[user] += amount;
        minted[user] = true;

        return "Mint successful.";
    }

    function transfer(address from, address to, uint256 amount) public returns (string memory) {
        if (balances[from] < amount) {
            return "Insufficient balance.";
        }

        balances[from] -= amount;
        balances[to] += amount;

        return "Transfer successful.";
    }

    function balanceOf(address user) public view returns (uint256) {
        return balances[user];
    }
}
