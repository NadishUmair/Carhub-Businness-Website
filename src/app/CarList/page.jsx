"use client"; 

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
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
  const [sortOption, setsortOption] = useState();

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

  const handleSort = (e) => {
    const value = e.target.value;
    const FilterSort = FilterCar.filter((car) => {
      return (value && car.cartype === value);
    });
    setCars(FilterSort);
  };

  if (!carData) return <div>Loading...</div>;

  return (
    <>
      <div>
        <Navbar style={{ color: "black" }} />
      </div>
      <div className="h-[50vh] flex flex-col justify-center items-center bg-slate-200">
        <div>
          <h1 className="text-center text-6xl font-semibold">
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
            className="mt-8 text-center bg-gray-100 p-2 font-bold cursor-pointer hover:bg-gray-50"
            onClick={handleShowCarForm}
          >
            New car
          </div>
          {showCarForm && <NewCarForm onFilterCar={handlecarfilter} />}
        </div>
        <div className="md:w-[75%] p-2">
          <div className="flex justify-between ">
            <div className="text-xl">
              Showing 1-{cars.length} of{" "}
              <span className="text-red-500">{FilterCar.length} </span> results
            </div>
            <div>
              <form action="">
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold text-xl">
                    Sort By:
                  </label>
                  <select
                    name=""
                    id=""
                    onChange={handleSort}
                    className="w-full p-2 border outline-none"
                  >
                    <option value="">Recently Added</option>
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
            className={`${
              listgridView ? "flex flex-wrap  gap-4 " : "p-2"
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
                    <div className={`${listgridView ? "" : "w-[50%]"} relative`}>
                      <img
                        className="h-full w-full"
                        src={item.image}
                        alt="Car"
                      />
                      <div className="absolute top-0 right-0 ">
                        <span className="inline-block rounded-lg bg-red-500 px-3 py-1 text-lg text-white ">
                          {item.dealerName}
                        </span>
                      </div>
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
                        <div>
                          <span className="inline-block bg-yellow-100 rounded-full px-3 py-1 text-sm text-yellow-800 mr-2 mb-2">
                            <span className="font-bold">Mileage:</span> {item.millege}
                          </span>
                          <span className="inline-block bg-green-100 rounded-full px-3 py-1 text-sm text-green-800 mr-2 mb-2">
                            <span className="font-bold">Price:</span> {item.price}
                          </span>
                        </div>
                        <span className="inline-block bg-purple-100 rounded-full px-3 py-1 text-sm text-purple-800 mr-2 mb-2">
                          <span className="font-bold">Location:</span> {item.location}
                        </span>
                        <span className="inline-block bg-red-100 rounded-full px-3 py-1 text-sm text-red-800 mr-2 mb-2">
                          <span className="font-bold">Post Date:</span> {item.postDate}
                        </span>
                        <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-800 mr-2 mb-2">
                          <span className="font-bold">Zip/Postal:</span> {item.zippostal}
                        </span>
                        <span className="inline-block bg-teal-100 rounded-full px-3 py-1 text-sm text-teal-800 mr-2 mb-2">
                          <span className="font-bold">Model:</span> {item.model}
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

const CarListPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarList />
    </Suspense>
  );
};

export default CarListPage;
