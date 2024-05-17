"use client"; // Ensure this is at the very top of the file

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FilterCar } from "@/components/CarData";
import RefineBySearchForm from "@/components/FilterBySearchForm/page";
import NewCarForm from "@/components/RefinebyCar/page";
import Navbar from "@/components/Navbar/page";

const CarList = () => {
  const searchParams = useSearchParams();
  const [carData, setCarData] = useState(null);
  const [cars, setCars] = useState([]);
  const [handleRefinshow,sethandleRefineshow]=useState(false);
  const [showCarForm,setShowCarForm]=useState(false);

  const refinshowHanlder=()=>{
    sethandleRefineshow(!handleRefinshow);
    if (showCarForm) setShowCarForm(false);
  }
  const handleShowCarForm=()=>{
    setShowCarForm(!showCarForm);
    if (handleRefinshow) sethandleRefineshow(false);
  }
  useEffect(() => {
    const data = {
      make: searchParams.get("make"),
      model: searchParams.get("model"),
      zip: searchParams.get("zip"),
      distance: searchParams.get("distance"),
      carType: searchParams.get("carType"),
    };
    setCarData(data);
    const anyFilterPresent = Object.values(data).some((value) => value);

    if (anyFilterPresent) {
      const FilteredCars = FilterCar.filter((car) => {
        return (
          (data.make && car.make === data.make) ||
          (data.model && car.model === data.model) ||
          (data.zip && car.location.includes(data.zip)) ||
          (data.distance && car.distance <= data.distance) ||
          (data.carType && car.cartype === data.carType)
        );
      });
      setCars(FilteredCars);
    } else setCars(FilterCar);
  }, [searchParams]);
  const handleFilterSubmit = (data) => {
    console.log(data);
   localStorage.setItem("RefineBySearchData",JSON.stringify(data));
   console.log(localStorage);
    
    const refineFiltered = FilterCar.filter((car) => {
      return (
        (data.make && car.make === data.make) ||
        (data.model && car.model === data.model) ||
        (data.zip && car.location.includes(data.zip)) ||
        (data.distance && car.distance <= data.distance) ||
        (data.carType && car.cartype === data.carType) ||
        (data.touring && car.touring === data.touring) ||
        (data.cylinders && car.touring === data.cylinders)
      );
    });
    setCars(refineFiltered);
  };

  const handlecarfilter=(data)=>{
    const filterBycar=FilterCar.filter((car)=>{
      return(
        (data.make && car.make === data.make) ||
        (data.model && car.model === data.model) ||
        (data.zip && car.zippostal === data.zip) 
      );
    })
    setCars(filterBycar);
    console.log(data);
  }
  if (!carData) return <div>Loading...</div>;
  
  return (
    <>
        <div >
          <Navbar style={{color:"black"}}/>
        </div>
      <div className="h-[50vh] flex flex-col justify-center items-center">
        <div>
          <h1 className="text-center"> Car Hub</h1>
        </div>
      </div>
       <div className="md:flex">
            <div className="md:w-[20%] p-4">
            <div className='text-center bg-red-500 p-2 text-white font-bold cursor-pointer hover:bg-red-400'
                   onClick={refinshowHanlder}
                   >Refine Filter</div>
              { handleRefinshow &&
                <RefineBySearchForm onFilterSubmit={handleFilterSubmit}/>
              }
              <div className='mt-4 text-center bg-red-500 p-2 text-white font-bold cursor-pointer hover:bg-red-400'
                   onClick={handleShowCarForm}
                   >New car</div>
                   {
                    showCarForm && 
                    <NewCarForm onFilterCar={handlecarfilter} />

                   }
            </div>
      <div className="md:w-[80%] flex flex-wrap  gap-4 justify-center">
        {cars.map((item, index) => {
          return (
            <div key={index} className="md:w-[30%]">
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img
                  className="h-[50%]"
                  src={item.image}
                  alt="Sunset in the mountains"
                />
                <div className="px-2 ">
                  <div className="font-bold text-xl mb-2">{item.name}</div>
                  <p className="text-gray-700 text-base">{item.shortDesc}</p>
                </div>
                <div className="px-2 pt-4 pb-1">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Dealer Name:{item.dealerName}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Millege:{item.millege}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mr-2 mb-2 ">
                    Price:{item.price}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Location:{item.location}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    PostDate:{item.postDate}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Zip/Postal:{item.zippostal}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Model:{item.model}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
      </>
  );
};

export default CarList;
