import React, { useEffect, useState } from 'react'
import { FilterCar } from '../CarData'
import axios from 'axios';
export default function Filterbydealer ({onFilterDealer}) {
  const [dealers,setDealers]=useState();

  const findDealers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/dealer');
      setDealers(response.data.data);
    } catch (error) {
      console.log("error in finding dealers", error);
    }
  };

  useEffect(() => {
    findDealers();
  }, []);
  return (
    <div>
        <div className='flex flex-wrap justify-center gap-4 mt-4 bg-white p-2'>
            {
                dealers?.map((item,index)=>{
                    return(
                       <div className='w-[40%] shadow-lg' key={index}> 
                        <img 
                        className='w-full h-full'
                        src={item.dealerlogo}
                        key={item.dealerName}
                        alt={item.dealerName} 
                        onClick={()=>onFilterDealer(item.dealerName)}
                        />
                       </div>
                    )

                })
            }
        </div>
    </div>
  )
}
