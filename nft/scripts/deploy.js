const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftMarketplace = await NFTMarketplace.deploy();
  await nftMarketplace.deployed();
  console.log("nftMarketplace deployed to:", nftMarketplace.address);

  fs.writeFileSync('./config.js', `export const marketplaceAddress = "${nftMarketplace.address}"
  export const jsonRpcApi = 'https://rpc-mumbai.maticvigil.com'
  
  // Web3Storage_token must be kept secret
  export const Web3Storage_token = 'your key here'
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
