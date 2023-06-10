import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";

import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ({ addressTo, addressFrom, timestamp, batch_id, phase_id, 
  metadata, digest }) => {
  //const gifUrl = useFetch({ message });
  const jpgUrl = digest.endsWith('.jpg')? '/images/' + digest: '/images/' + digest + '.jpg';

  return (
    <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">Operator/Uploader: {shortenAddress(addressFrom)}</p>
          </a>
          <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">Chain: {shortenAddress(addressTo)}</p>
          </a>
          {batch_id && (
            <p className="text-white text-base">{batch_id.length > 32? batch_id.substring(0,30) + '...': batch_id}</p>
            
          )}
          {phase_id && (
            <p className="text-white text-base">{phase_id.length > 32? phase_id.substring(0,30) + '...': phase_id}</p>
            
          )}
          {metadata && (
            <p className="text-white text-base">{metadata.length > 72? metadata.substring(0,70) + '...': metadata}</p>
            
          )}
          {digest && (
            <p className="text-white text-base">{digest.length > 32? digest.substring(0,30) + '...': digest}</p>
            
          )}
        </div>
        <img
          src={jpgUrl}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h4 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h4>
        ) : (
          <h4 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h4>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {[...dummyData, ...transactions].reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
