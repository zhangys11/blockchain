import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

import {
  marketplaceAddress
} from '../config'

import {Web3Storage_token} from '../api_token'

// use web3 storage: https://web3.storage/docs/reference/js-client-library/?js-lib=browser
import { Web3Storage } from 'web3.storage';

// Construct with token and endpoint
const client = new Web3Storage({ token: Web3Storage_token });

// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import { constructImgUrl } from "../utils/image_url_helper";


export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '0.01', name: '大碗岛的星期天下午', 
  description: `作品名:大碗岛的星期天下午 A Sunday Afternoon on the Ile de la Grande Jatte
  艺术家：乔治·修拉
  创作时间：1884－1886年
  作品材质:布面油画 207.5x308.1cm
  现藏地点:美国-芝加哥-芝加哥艺术学院`, guid: '63e0a4b77cbde0fcea0835f414c0f230' })
  const router = useRouter()

  async function onChange(e) {
    updateFormInput({ ...formInput, guid: e.target.value })
    setFileUrl(constructImgUrl(e.target.value)) //'/images/' + e.target.value + '.jpg'

    /*
    const file = e.target.files[0]
    try {

      // Pack files into a CAR and send to web3.storage
      const onRootCidReady = rootCid => console.log('root cid:', rootCid);
      const onStoredChunk = chunkSize => console.log(`stored chunk of ${chunkSize} bytes`);
      const rootCid = await client.put([file], {
        name: 'evidence', // new Date().toLocaleString(), // The name is not stored alongside the data on IPFS, but it is viewable within the file listing on the web3.storage site.
        maxRetries: 3,
        onRootCidReady, 
        onStoredChunk,
      });

      const url = client.get(rootCid); // `https://${rootCid}.ipfs.w3s.link/`
      console.log(url);
      setFileUrl(url)
    } catch {
      console.log('Error uploading file.')
    }  
    */
  }


  async function listNFTForSale() {
    const url = formInput.guid
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* next, create the item */
    const price = ethers.utils.parseUnits(formInput.price, 'ether')
    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()
    let transaction = await contract.createToken(url, price, { value: listingPrice })
    await transaction.wait()
   
    router.push('/')
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          value = {formInput.name}
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4 h-36"
          value={formInput.description}
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          value = {formInput.price}
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <input
          placeholder="Input Assert GUID/DIGEST/HASH"
          className="mt-2 border rounded p-4"
          value = {formInput.guid}
          onChange={onChange}
        />
        {
          fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )
        }
        <button onClick={listNFTForSale} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create NFT
        </button>
      </div>
    </div>
  )
}