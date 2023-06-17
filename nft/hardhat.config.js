require("@nomiclabs/hardhat-waffle");
const fs = require('fs');

/*
To connect to the mumbai testnet with metamask, use the following settings:

Network Name: Mumbai
New RPC URL: https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78
Chain ID: 80001
Currency Symbol: MATIC
Block Explorer URL: https://mumbai.polygonscan.com
*/

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 80001
    },    
    mumbai: {
      // Alchemy
      url: "https://polygon-mumbai.g.alchemy.com/v2/QI5McvJ5VL2tIX4xDaSoOHpo_c1bG_7e",
      accounts: ['your private key']
    },
    /*

    matic: {
      // Infura
      // url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
      url: "https://rpc-mainnet.maticvigil.com",
      accounts: ['your private key']
    }
    */
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};

