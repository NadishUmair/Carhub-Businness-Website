import React from 'react'
import { FilterCar } from '../CarData'
export default function Filterbydealer ({onFilterDealer}) {
  return (
    <div>
        <div className='flex flex-wrap justify-center gap-4 mt-4'>
            {
                FilterCar.map((item,index)=>{
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
