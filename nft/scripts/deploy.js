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
  export const Web3Storage_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEE5YjFCMzJDYzI3YzJlMWFBNDFGQzg2ZmE1ZUFjRDMyYmNmNDZiNjkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODY5MzA3MTI1NTYsIm5hbWUiOiJuZnQifQ.t_pWBYILN8Rkq5HKl51cUhQpNJpvaCjYzu1FpeWrdHA'
  `) 
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
