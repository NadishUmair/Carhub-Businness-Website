"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
// import { FilterCar } from "@/components/CarData";
import RefineBySearchForm from "@/components/FilterBySearchForm/page";
import NewCarForm from "@/components/RefinebyCar/page";
import Navbar from "@/components/Navbar/page";
import Filterbydealer from "@/components/RefineByDealer/page";
import { BsGrid3X3Gap } from "react-icons/bs";
import { CiGrid2H } from "react-icons/ci";
import { TiStar } from "react-icons/ti";
import axios from "axios";
import { toast } from "react-toastify";

const CarList = () => {
  const [listgridView, setlistgridView] = useState(true);
  const searchParams = useSearchParams();
  const [carData, setCarData] = useState(null);
  const [cars, setCars] = useState([]);
  const [handleRefinshow, sethandleRefineshow] = useState(false);
  const [showCarForm, setShowCarForm] = useState(false);
  const [searchDealer, setSearchDealer] = useState(true);
  const [sortOption, setsortOption] = useState();
  const [FilterCar, setFilterCar] = useState([]);
  const [loading, setLoading] = useState(true); 

  const findcars = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/cars");
      console.log(response.data.data);
      setFilterCar(response.data.data);
      setCars(response.data.data);
      setLoading(false); 
    } catch (error) {
      console.log("error in finding cars", error);
    }
  };

  console.log(cars);

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
    findcars();
  }, []);

  console.log(FilterCar);

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

    if (FilterCar.length > 0) {
      if (anyFilterPresent) {
        const FilteredCars = FilterCar.filter((car) => {
          return (
            (data.make && car.make === data.make) ||
            (data.model && car.model === data.model) ||
            (data.zip && car.zippostal === data.zip) ||
            (data.distance && car.distance === data.distance) ||
            (data.carType && car.cartype === data.carType)
          );
        });
        setCars(FilteredCars);
      } else {
        setCars(FilterCar);
      }
    }
  }, [searchParams, FilterCar]); 

  const handleFilterSubmit = (data) => {
    // console.log("data from refine", data);
    // console.log("filtered car", FilterCar);

    const refinefilter = FilterCar.filter((car) => {
      console.log("data from refine",data);
      console.log("car distance",car.distance);
      if (String(data.distance) === String(car.distance)) {
        console.log("hy");
    }
      return (
        // (data.make && car.make === data.make) ||
        // (data.model && car.model === data.model) ||
        (data.zippostal && String(car.zippostal) === String(data.zippostal))||
        (data.distance && String(data.distance) === String(car.distance)) ||
        (data.doors && String(car.doors)=== String(data.doors))
        //  ||
        // (data.cylinders && car.cylinders === data.cylinders) ||
        // (data.fuel && car.fuel === data.fuel) ||
        // (data.transmission && car.transmission === data.transmission) ||
        // (data.drivetype && car.drivetype === data.drivetype) ||
        // (data.minprice && car.price >= data.minprice) ||
        // (data.maxprice && car.price <= data.maxprice) ||
        //  (data.minmillage && car.millage >= data.minmillage) ||
        // (data.maxmillage && car.millage <= data.maxmillage) ||
        // (data.minyear && car.year >= data.minyear) ||
        // (data.maxyear && car.year <= data.maxyear) ||
        // (data.bodystyle && car.bodystyle === data.bodystyle) ||
        // (data.exteriorcolor && car.exteriorcolor === data.exteriorcolor) ||
        // (data.interiorcolor && car.interiorcolor === data.interiorcolor) ||
        // (data.saletype && car.saletype === data.saletype) ||
        // (data.forsaleby && car.forsaleby === data.forsaleby) ||
        // (data.keywords && car.keywords.includes(data.keywords))
      
    );
    });
    console.log("refine filter",refinefilter);
    setCars(refinefilter);
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
      return dealerName && item.dealername === dealerName;
    });
    setCars(fiteredDealers);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    if (value === "recentlyadded") {
      FilterCar.map((car)=>{
          console.log(car.updatedAt);
      })
      
    }
    console.log(value);
    const FilterSort = FilterCar.filter((car) => {
      return value && car.cartype === value;
    });
    setCars(FilterSort);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="relative">
        <div className="">
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
          <div className="md:w-[25%] p-4 h-[50%]  border bg-gray-300 hidden md:block">
            <div
              className="text-center bg-gray-100 p-2 font-bold cursor-pointer hover:bg-gray-50"
              onClick={showDealerForm}
            >
              Search By Dealer
            </div>
            {searchDealer && (
              <Filterbydealer
                onFilterDealer={searchDealerHandler}
                className="bg-white"
              />
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
                Showing 1-{cars?.length} of{" "}
                <span className="text-red-500">{FilterCar?.length} </span>{" "}
                results
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
                      <option value="recentlyadded">Recently Added</option>
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
              className={`${listgridView ? "flex flex-wrap  gap-4 " : "p-2"}`}
            >
              {cars?.map((item, index) => {
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
                      <div
                        className={`${
                          listgridView ? "]" : "w-[50%]"
                        } h-[40%] relative`}
                      >
                        <img
                          className="h-full w-full"
                          src={item.carImg}
                          alt="Car"
                        />
                        <div className="absolute top-0 right-0 ">
                          <span className="inline-block rounded-lg bg-red-500 px-3 py-1 text-lg text-white ">
                            {item.dealername}
                          </span>
                        </div>
                      </div>
                      <div className={`${listgridView ? "" : "w-[50%]"}`}>
                        <div className="px-2 ">
                          <div className="font-bold text-xl mb-2">
                            {item.title}
                          </div>
                          <div>
                            <div className="flex text-yellow-400 text-xl">
                              <TiStar />
                              <TiStar />
                              <TiStar />
                              <TiStar />
                              <TiStar />
                              <p className="text-black text-sm">(5 Reviews)</p>
                            </div>
                          </div>
                          <p className="text-gray-700 text-base">
                            {item.description}
                          </p>
                        </div>
                        <div className="px-2 pt-4 pb-1">
                          <div className="flex">
                            <span className=" rounded-full px-3 py-1 text-[0.8rem] mr-2 mb-2">
                              <span className="font-bold"></span> {item.millage}
                            </span>
                            <span className=" rounded-full px-3 py-1  text-[0.8rem] mr-2 mb-2">
                              <span className="font-bold"></span>{" "}
                              {item.location}
                            </span>
                            <span className=" rounded-full px-3 py-1   text-[0.8rem] mr-2 mb-2">
                              <span className="font-bold"></span>
                              {
                                new Date(item.createdAt)
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="inline-block rounded-full px-3 py-1 text-sm font-bold mr-2 mb-2">
                              <span className="font-bold">$</span>
                              {item.price}
                            </span>
                            <span className="text-red-500">Share</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="md:hidden fixed top-[90%] flex justify-between w-screen px-4">
          <div className="p-2 rounded-sm bg-white shadow-xl text-gray-900">
            DEALERS
          </div>
          <div className="p-2 rounded-sm bg-white shadow-xl text-gray-900">
            REFINE
          </div>
          <div className="p-2 rounded-sm bg-white shadow-xl text-gray-900">
            NEW
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
