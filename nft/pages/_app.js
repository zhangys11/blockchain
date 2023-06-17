/* pages/_app.js */
import '../styles/globals.css'
import Link from 'next/link'
import {
  marketplaceAddress
} from '../config'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">NFT Market</p>
        <i className="font-fold">Contract Address: {marketplaceAddress}</i>
        <div className="flex mt-4">
          <Link className="mr-4 text-white  bg-black p-3" style={{'border-radius': 30}} href="/">
            Home
          </Link>
          <Link href="/create-nft" className="mr-6 text-white  bg-black p-3" style={{'border-radius': 30}}>
            Create/Sell NFT
          </Link>
          <Link href="/my-nfts" className="mr-6 text-white  bg-black p-3" style={{'border-radius': 30}}>
            My NFTs
          </Link>
          <Link href="/dashboard" className="mr-6 text-white  bg-black p-3" style={{'border-radius': 30}}>
            Dashboard
          </Link>
          <Link href="https://web3.storage" className="mr-6 text-white  bg-black p-3" style={{'border-radius': 30}}>
            Storage
          </Link>
          <Link href="https://mumbai.polygonscan.com/" className="mr-6 text-white  bg-black p-3" style={{'border-radius': 30}}>
            Blocks
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp