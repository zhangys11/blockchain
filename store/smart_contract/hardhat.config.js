// https://eth-sepolia.g.alchemy.com/v2/JA5X0KC_sVNPzgVa2lalkbYW0hfq2HOY

require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/JA5X0KC_sVNPzgVa2lalkbYW0hfq2HOY",
      accounts : ['your private key (get from metamask)'],
    }
  }
}