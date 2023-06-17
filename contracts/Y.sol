// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Y {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function withdrawAnyAmount(uint amount) public {
        require(msg.sender == owner, "Only the contract owner can withdraw funds");
        require(address(this).balance >= amount, "Insufficient funds");
        owner.transfer(amount);
    }

    function checkBalance() public view returns (uint) {
        return address(this).balance;
    }

    function withdrawAllFromContract() public {
        require(msg.sender == owner, "Only the contract owner can withdraw funds");
        require(address(this).balance > 0, "Contract has no funds to withdraw");
        owner.transfer(address(this).balance);
    }

    receive() external payable {
        
    }
}
