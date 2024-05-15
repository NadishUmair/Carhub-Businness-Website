import React from 'react';
import sliderImg from '../CarData';

export default function ExploreCar() {
  return (
    <div className='mt-8 mb-10'>
      <h1 className='text-center text-4xl font-bold mt-4'>Explore</h1>
      <div className='md:flex flex-wrap justify-center gap-5 p-2 mt-2'>
        {sliderImg.map((item, index) => {
          return (
            <div key={index} className='md:w-[20%] px-4 py-4 rounded-lg bg-gray-200 m-2 flex flex-col items-center'>
             <div className='w-full h-70%'>
             <img src={item.image} className='w-full h-auto' alt={item.name} />
             </div>
               <div className='h-[30%] flex flex-col justify-center items-center'>
               <h1 className='mt-2 font-bold'>{item.name}</h1>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
