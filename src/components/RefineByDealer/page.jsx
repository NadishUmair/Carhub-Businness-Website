import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PuffLoader } from 'react-spinners';

export default function Filterbydealer({ onFilterDealer }) {
  const [dealers, setDealers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const findDealers = async () => {
    try {
      const response = await axios.get('/api/dealer');
      setDealers(response.data.data);
    } catch (error) {
      console.log("error in finding dealers", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    findDealers();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center bg-white items-center mt-4">
         <PuffLoader color="red" />
        </div>
      ) : (
        <div className='flex flex-wrap justify-center gap-4 mt-4 bg-white p-2'>
          {dealers?.map((item, index) => (
            <div className='w-[40%] shadow-lg' key={index}>
              <img
                className='w-full h-full'
                src={item.dealerlogo}
                alt={item.dealerName}
                onClick={() => onFilterDealer(item.dealerName)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}








