"use client"; // Ensure this is at the very top of the file

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FilterCar } from '@/components/CarData';
const CarList = () => {
  const searchParams = useSearchParams();
  const [carData, setCarData] = useState(null);
 const [cars,setCars]=useState([]);

  useEffect(() => {
    const data = {
      make: searchParams.get('make'),
      model: searchParams.get('model'),
      zip: searchParams.get('zip'),
      distance: searchParams.get('distance'),
      carType: searchParams.get('carType'),
    };
    setCarData(data);
    const FilteredCars = FilterCar.filter(car => {
      return (
        (data.make && car.make === data.make) ||
        (data.model && car.model === data.model) ||
        (data.zip && car.location.includes(data.zip)) ||
        (data.distance && car.distance <= data.distance) ||
        (data.carType && car.carType === data.carType)
      );
    });
    setCars(FilteredCars);
  }, [searchParams]);

  if (!carData) return <div>Loading...</div>;
console.log(FilterCar);
  return (
    <div>
             <div className='h-[50vh] flex flex-col justify-center items-center'>
          <div>
          <h1 className='text-center'>  Car Hub</h1>
          </div>
             </div>
   
          <div className='flex flex-wrap  gap-4 justify-center'>

          {/* image: '/Assets/Images/_CJWghhfJsWYs47ERRJHfV3BR58.jpg',
    name: 'BMW1',
    redirection: '#',
    dealerName: 'carHub',
    Currency: '$',
    price : '139,000',
    millege: '29,200 mi',
    location: 'Los Angeles, CA',
    postDate: '12 days ago',
    shortDesc: 'I bought this car August 2020 from Livermore Porsche. At the time, it had about 2200 miles',
    alt: 'img1',
  }, */}
            {
              cars.map((item,index)=>{
                return(
                      <div key={index} className=''>
                        <div class="max-w-sm rounded overflow-hidden shadow-lg">
           <img class="h-[50%]" src={item.image} alt="Sunset in the mountains"/>
             <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">{item.name}</div>
               <p class="text-gray-700 text-base">
              {item.shortDesc}
               </p>
           </div>
            <div class="px-6 pt-4 pb-2">
             <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Dealer Name:{item.dealerName}</span>
             <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Millege:{item.millege}</span>
             <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mr-2 mb-2 ">Price:{item.price}</span>
             <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Location:{item.location}</span>
             <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">PostDate:{item.postDate}</span>
             <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Zip/Postal:{item.zippostal}</span>
             <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Model:{item.model}</span>
          
                  </div>
           </div>
                        </div>
                )
              })
            }
          </div>

  
    {/* // <div>
    //   <h1>Car List</h1>
    //   <p>Make: {carData.make}</p>
    //   <p>Model: {carData.model}</p>
    //   <p>Zip: {carData.zip}</p>
    //   <p>Distance: {carData.distance}</p>
    //   <p>Car Type: {carData.carType}</p>
    // </div> */}
    </div>
  );
};

export default CarList;
