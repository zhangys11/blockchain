// https://eth-sepolia.g.alchemy.com/v2/JA5X0KC_sVNPzgVa2lalkbYW0hfq2HOY

require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/vJP8us2FG1U_F6tTBYRF7X4-m3sg8HE3",
      accounts : ['[Your private key (get from metamask)]'],
    }
  }
}