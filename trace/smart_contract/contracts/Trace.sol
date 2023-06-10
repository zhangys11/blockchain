// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Trace {
    uint256 transactionCount;

    event Transfer(address operator, address receiver, string batch_id, string phase_id, string data_modality, string data_digest, uint256 timestamp);
  
    struct TransferStruct {
        address sender; // operator
        address receiver; // fixed. platform account
        // uint amount; // always 0
        string batch_id;
        string phase_id;
        string metadata; // Metadata for data, e.g., analysis result; code of instrument type; data type, etc. 
        string digest; // md5 digest
        uint256 timestamp;
    }

    TransferStruct[] transactions;

    function addToBlockchain(address payable receiver, string memory batch_id, 
    string memory phase_id, string memory metadata, string memory digest) public {
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, batch_id, phase_id, 
        metadata, digest, block.timestamp));

        // emit an event in solidity, which notifies the client (e.g., update UI) in Dapp.
        emit Transfer(msg.sender, receiver, batch_id, phase_id, 
        metadata, digest, block.timestamp);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}