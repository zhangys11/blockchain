import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";

/* 
React.js uses the className prop because class is a reserved word in JavaScript.
*/


const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);


const Welcome = () => {
  const { currentAccount, connectWallet, handleChange, 
    sendTransaction, formData, setformData, isLoading } = useContext(TransactionContext);

  const handleSubmit = (e) => {

    const {addressTo, amount, batch_id, phase_id, metadata, digest} = formData;
    // console.log(addressTo, amount, batch_id, phase_id, metadata, digest)
    
    /*
    if (!addressTo){
      addressTo = 0x28c6861Faa32F6f5135eFdaBDf5af7C4D6d057F8
    }
    if (!amount){
      amount = 0
    }
    if (!batch_id){
      batch_id = '061744301002000041.T000100467'
    }
    if (!phase_id){
      phase_id = '{"id": 1, "name": "育苗"}'
    }
    if(!metadata){
      metadata = '{"modality": 高效液相色谱(HPLC), "range": "亚麻酸: 2%-10%", "value": "3%"}'
    }
    if(!digest){
      digest = '0e32dcede2d988353f09902da630e397'
    }
    */

    e.preventDefault();

    if (!addressTo || !amount || !batch_id || !phase_id || !metadata || !digest ) return;

    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-50 sm:w-96 w-full eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-20 h-20 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={36} color="#fff" />
                </div>
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  Operator id: {currentAccount}
                </p>
                {
                  ['0x29683cb5304998b83138d79d789c5d194cbff52a'].indexOf(currentAccount) >=0 ?
                  (
                    <span className="px-2 py-0.5 bg-green-500 text-white rounded font-semibold text-lg mt-1">
                      Verified operator
                    </span>
                  ):
                  (
                    <span className="px-2 py-0.5 bg-red-500 text-white rounded font-semibold text-lg mt-1">
                      Unverified operator
                    </span>
                  )
                }                
              </div>
              {!currentAccount && (
                <button
                  type="button"
                  onClick={connectWallet}
                  className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                >
                  <AiFillPlayCircle className="text-white mr-2" />
                  <p className="text-white text-base font-semibold">
                    Connect Wallet
                  </p>
                </button>
              )}
            </div>
          </div>      
          &nbsp;&nbsp;&nbsp;&nbsp;
          
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <input placeholder="Address To" name="addressTo" type="hidden" onChange={handleChange} />
            <input placeholder="Amount (ETH)" name="amount" type="hidden" onChange={handleChange} />
            <Input placeholder="Batch ID" name="batch_id" type="text" handleChange={handleChange} />
            <Input placeholder="Phase ID" name="phase_id" type="text" handleChange={handleChange} />
            <Input placeholder="Metadata (json)" name="metadata"  type="text" handleChange={handleChange} />
            <Input placeholder="Digest" name="digest" type="text" handleChange={handleChange} />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Upload Now
                </button>
              )}
          </div>
        </div>
  );
};

export default Welcome;
