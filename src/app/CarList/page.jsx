"use client"; // Ensure this is at the very top of the file

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FilterCar } from "@/components/CarData";
import RefineBySearchForm from "@/components/FilterBySearchForm/page";
import NewCarForm from "@/components/RefinebyCar/page";
import Navbar from "@/components/Navbar/page";
import Filterbydealer from "@/components/RefineByDealer/page";
import { BsGrid3X3Gap } from "react-icons/bs";
import { CiGrid2H } from "react-icons/ci";
const CarList = () => {
  const [listgridView, setlistgridView] = useState(true);

  const searchParams = useSearchParams();
  const [carData, setCarData] = useState(null);
  const [cars, setCars] = useState([]);
  const [handleRefinshow, sethandleRefineshow] = useState(false);
  const [showCarForm, setShowCarForm] = useState(false);
  const [searchDealer, setSearchDealer] = useState(true);
  const [sortOption,setsortOption]=useState();
  const showDealerForm = () => {
    setSearchDealer(!searchDealer);
    if (showCarForm) setShowCarForm(false);
    if (handleRefinshow) sethandleRefineshow(false);
  };
  const refinshowHanlder = () => {
    sethandleRefineshow(!handleRefinshow);
    if (showCarForm) setShowCarForm(false);
    if (searchDealer) setSearchDealer(false);
  };
  const handleShowCarForm = () => {
    setShowCarForm(!showCarForm);
    if (handleRefinshow) sethandleRefineshow(false);
    if (searchDealer) setSearchDealer(false);
  };

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
    localStorage.setItem("RefineBySearchData", JSON.stringify(data));
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

  const handlecarfilter = (data) => {
    const filterBycar = FilterCar.filter((car) => {
      return (
        (data.make && car.make === data.make) ||
        (data.model && car.model === data.model) ||
        (data.zip && car.zippostal === data.zip)
      );
    });
    setCars(filterBycar);
  };
  const searchDealerHandler = (dealerName) => {
    const fiteredDealers = FilterCar.filter((item) => {
      return dealerName && item.dealerName === dealerName;
    });
    setCars(fiteredDealers);
  };

  const handleSort=(e)=>{
     const value=e.target.value;
     const FilterSort=FilterCar.filter((car)=>{
      return(
        (value && car.cartype === value)
      )
     });
     setCars(FilterSort);
  }
  if (!carData) return <div>Loading...</div>;

  return (
    <>
      <div>
        <Navbar style={{ color: "black" }} />
      </div>
      <div className="h-[50vh] flex flex-col justify-center items-center bg-slate-200">
        <div>
          <h1 className="text-center text-6xl font-semibold">
            {" "}
            Car <span className="text-red-500">Hub</span>
          </h1>
        </div>
      </div>
      <div className="md:flex p-2">
        <div className="md:w-[25%] p-4 h-[50%] bg-gray-300">
          <div
            className="text-center bg-gray-100 p-2 font-bold cursor-pointer hover:bg-gray-50"
            onClick={showDealerForm}
          >
            Search By Dealer
          </div>
          {searchDealer && (
            <Filterbydealer onFilterDealer={searchDealerHandler} />
          )}
          <div
            className="mt-8 text-center bg-gray-100 p-2 font-bold cursor-pointer hover:bg-gary-50"
            onClick={refinshowHanlder}
          >
            Refine Filter
          </div>
          {handleRefinshow && (
            <RefineBySearchForm onFilterSubmit={handleFilterSubmit} />
          )}
          <div
            className="mt-8 text-center bg-gray-100 p-2  font-bold cursor-pointer hover:bg-gray-50"
            onClick={handleShowCarForm}
          >
            New car
          </div>
          {showCarForm && <NewCarForm onFilterCar={handlecarfilter} />}
        </div>
        <div className="md:w-[75%] p-2">
          <div className="flex justify-between ">
            <div className=" text-xl">
              Showing 1-{cars.length} of{" "}
              <span className="text-red-500">{FilterCar.length} </span> results
            </div>
            <div >
              <form action="">
               <div className="flex flex-col">
               <label htmlFor="" className="font-semibold text-xl">Sort By:</label>
                <select name="" id=""
                onChange={handleSort}
                className="w-full p-2 border outline-none">
                  <option value="">Recentaly Added</option>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                </select>
               </div>
              </form>
            </div>
          </div>
          <div className="flex justify-end p-4 ">
            <div className="flex ">
              <span className="mr-2 text-xl">
                <BsGrid3X3Gap onClick={() => setlistgridView(true)} />{" "}
              </span>
              <span className="text-xl">
                <CiGrid2H onClick={() => setlistgridView(false)} />
              </span>
            </div>
          </div>
          <div
            className={` ${
              listgridView
                ? "flex flex-wrap  gap-4 "
                : "p-2"
            }`}
          >
            {cars.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    listgridView ? "md:w-[32%] flex" : "mb-4 rounded-lg"
                  }`}
                >
                  <div
                    className={` ${
                      listgridView
                        ? "max-w-sm rounded overflow-hidden shadow-lg"
                        : "flex items-center "
                    }  `}
                  >
                    <div className={`${listgridView ? "" : "w-[50%]"}`}>
                      <img
                        className="h-full w-full"
                        src={item.image}
                        alt="Sunset in the mountains"
                      />
                    </div>
                    <div className={`${listgridView ? "" : "w-[50%]"}`}>
                      <div className="px-2 ">
                        <div className="font-bold text-xl mb-2">
                          {item.name}
                        </div>
                        <p className="text-gray-700 text-base">
                          {item.shortDesc}
                        </p>
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarList;
