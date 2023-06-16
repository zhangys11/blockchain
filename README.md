# Web 3.0 Blockchain Applications

## 1. Dapp1 - store

This project is based on this Web3.0 tutorial (https://www.youtube.com/watch?v=Wn_Kb3MR_cU).

![Screenshot](./images/gui.png)

This dApp allows users to store the hash code (unique digital fingerprint) of an asset (e.g., images) to the blockchain via an ethereum smart contract.  
Note: The image is stored in local server, but its hash code is stored in the blockchain.

## 2. Dapp2 - trace

This project is modified from the above dApp. We revised the smart contract to add more tracing-related data fields.

![Screenshot](./images/trace.png)

## 3. Dapp3 - NFT

This project is based on this tutorial (https://www.youtube.com/watch?v=GKJBEEXUha0)

# Steps

## configure hardhat.config.js

1. Copy and paste your private key from metamask (see below)

![metamask](./images/metamask.png)

2. create a dApp on Alchemy (https://www.alchemy.com/)

![alchemy](./images/alchemy.png)  
Note: The dApp is deployed on sepolia testnet, not the mainnet.  

Note: Why we use a 3rd-party node provider, other than use our own node?   
By running our own Node we mean that your server stores the entire blockchain. You may choose whether your Node should validate every block of data before adding it to the blockchain (mining, PoW). A Full Node sync can take around a month or two for
downloading the whole blockchain. The Light Node sync can take up to several weeks. 
Hardware requirements to run your own node: 
At least 2TB of SDD; 4GB Ram; Connected to the internet 24*7. 
[Check this](3rd_node_vs_own_node.pdf). 

Note: Popular 3rd-party node provider comparison (Alchemy vs Infura) 
<table>
<tbody>
<tr>
<td>&nbsp;</td>
<td>Alchemy</td>
<td>Infura</td>
</tr>
<tr>
<td>Supported Layer 1 networks</td>
<td>Ethereum Mainnet, Solana&nbsp;<br><br>Tesnets – Rinkeby, Goerli, Kovan, and the Ropsten network</td>
<td>Ethereum Mainnet &nbsp;<br><br>Testnets – Rinkeby, Goerli, Kovan, and the Ropsten network</td>
</tr>
<tr>
<td>Supported Layer 2 Network</td>
<td>Polygon, Arbitrum network, and Optimism</td>
<td>Polygon, Arbitrum, Optimism, and the Palm network</td>
</tr>
<tr>
<td>Miscellaneous Services</td>
<td>Alchemy Notify, NFT API</td>
<td>IPFS API</td>
</tr>
<tr>
<td>Free Plans</td>
<td>300 million compute units per month, for up to 5 applications</td>
<td>100,000 requests per day, for up to 3 different applications &nbsp;<br>Free 5GB IPFS storage</td>
</tr>
</tbody>
</table>
<hr/>

3. Copy and paste the https link.

![dApp](./images/dApp.png)

4. The completed hardhat.config.js file should look like this:

```
require("@nomiclabs/hardhat-waffle");
module.exports = {
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/JA5X0KC_sVNPzgVa2lalkbYW0hfq2HOY",
      accounts : ['your prviate key (get from metamask)'],
    }
  }
}
```

or if you use polygon mumbai testnet, the hardhat.config.js file should look like this:
```
require("@nomiclabs/hardhat-waffle");
module.exports = {
  networks: {
    hardhat: {
      chainId: 80001
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/QI5McvJ5VL2tIX4xDaSoOHpo_c1bG_7e",
      accounts: ['your private key (get from metamask)']
    },
  }
}
```
You also need to specify the mumbai testnet RPC url anywhere needed:  
```
const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com") // otherwise, will use localhost:8545
```

## Write the smart contract (Transaction.sol).

This contract defines and stores a struct to the blockchain.  
In solidity, `msg` is a global variable in Solidity which handles everything related to the blockchain in the properties that it holds. Right from the gas fees to the amount of ether required to call any function in the smart contract, all of these values are stored inside the msg global variable and can be accessed by using the dot(.) operator.

1. Setup env and compile the contract.

```
cd smart_contract
npm install hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-etherscan
npx hardhat help
npx hardhat test
npx hardhat run scripts/deploy.js --network sepolia (or mumbai)

    Transactions address: 0xE2DaBD738A3f5F434925d32Ff1e8B4AF3b63Fe94 (copy this to contractAddress in constants.js; each run will differ)

Sensative data that need kept locally:  
    hardhat.config.js (contains private key)
```

2. copy the Transaction.json file to the client/src/abis folder.

Transaction.json is the ABI (Application Binary Interface) file that defines the smart contract.

3. Copy the contract address to the client/src/constants.js file.

## Build the nodejs app.

```
cd client
npm init vite@latest
npm install tailwindcss react-icons ethers
npm run dev
```

The dApp needs gas to operate. Get some sepoliaETH from https://faucet.sepolia.com/ (you need to have a sepolia account).   
If you use polygon mumbai, get Matic tokens from https://mumbaifaucet.com/

![faucet](./images/faucet.png)

Run prepare_imageset.ipynb to resize and rename images and store them to the ./client/images folder.

## Deploy on CentOS + nginx

```
# curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -
# sudo yum install -y nodejs
```

Enter the src folder in server.  
```
sudo npm install
sudo npm run build
``` 

Copy /images to /dist and set the /dist as the website's working folder.   
Set the website's php version to static (php not needed).  

Finished.