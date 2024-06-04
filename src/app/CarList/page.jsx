"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
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
  const [cars, setCars] = useState();
  const [handleRefinshow, sethandleRefineshow] = useState(false);
  const [showCarForm, setShowCarForm] = useState(false);
  const [searchDealer, setSearchDealer] = useState(true);
  const [sortOption, setsortOption] = useState();
  const [FilterCar, setFilterCar] = useState();
  const [loading, setLoading] = useState(true); 
  const [showcars,setshowcars]=useState();

  const findcars = async () => {
    try {
      const response = await axios.get("/api/cars");
      setFilterCar(response.data.data);
      setLoading(false);
      console.log(response.data.data); 
    } catch (error) {
      console.log("error in finding cars", error);
    }
  };

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
    if (FilterCar?.length > 0) {
      if (anyFilterPresent) {
        const FilteredCars = FilterCar?.filter((car) => {
          return (
            (data.make && car.make === data.make) ||
            (data.model && car.model === data.model) ||
            (data.zip && car.zippostal === data.zip) ||
            (data.distance && car.distance === data.distance) ||
            (data.carType && car.cartype === data.carType)
          );
        });
        setCars(FilteredCars);
        setshowcars(FilteredCars)
      } else {
        setCars(FilterCar);
      }
    }
  }, [searchParams, FilterCar]); 

  const handleFilterSubmit = (data) => {
    const refinefilter = FilterCar.filter((car) => {
    const minPrice = Number(data.minprice);
    const maxPrice = Number(data.maxprice);
    const minMillage = Number(data.minmillage);
    const maxMillage = Number(data.maxmillage);
    const minYear = Number(data.minyear);
    const maxYear = Number(data.maxyear);
    const distance = Number(data.distance);
    const cylinders = Number(data.cylinders);
    const doors = Number(data.doors);
    const zippostal= Number(data.zippostal)
  
      return (
        (data.make && car.make === data.make) ||
        (data.model && car.model === data.model) ||
        (data.zippostal && car.zippostal === zippostal)||
        (data.distance && car.distance === distance) ||
        (data.doors && car.doors === doors) ||
        (data.cylinders && car.cylinders === cylinders)   ||
        (data.fuel && car.fuel === data.fuel) ||
        (data.transmission && car.transmission === data.transmission) ||
        (data.drivetype && car.drivetype === data.drivetype) ||
        (data.minprice && car.price >= minPrice) ||
        (data.maxprice && car.price <= maxPrice) ||
        (data.minmillage && car.millage >= minMillage) ||
        (data.maxmillage && car.millage <= maxMillage)||
        (data.minyear && car.year >= minYear)  ||
        (data.maxyear && car.year <= maxYear) ||
        (data.bodystyle && car.bodystyle === data.bodystyle) ||
        (data.exteriorcolor && car.exteriorcolor === data.exteriorcolor) ||
        (data.interiorcolor && car.interiorcolor === data.interiorcolor) ||
        (data.saletype && car.saletype === data.saletype)  ||
        (data.forsaleby && car.forsaleby === data.forsaleby) ||
        (data.keywords && car.keywords.includes(data.keywords))
      
    );
    });
    setCars(refinefilter);
    setshowcars(refinefilter);
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
    setshowcars(filterBycar);
  };

  const searchDealerHandler = (dealerName) => {
    const filteredDealers = cars.filter((item) => {
      return dealerName && item.dealername === dealerName;
    });
    setshowcars(filteredDealers);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    if (value === "recentlyadded"){
      const today = new Date().toISOString().split('T')[0];
      const filteredCars = cars?.filter((car) => {
        return (car.updatedAt.split('T')[0] === today);
      });
      
      // setCars(filteredCars || []); 
      setshowcars(filteredCars || [])
    } else {
      const FilterSort = cars.filter((car) => {
        return value && car.cartype === value;
      });
      // setCars(FilterSort);
      setshowcars(FilterSort);
    }
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
              <RefineBySearchForm onFilterSubmit={handleFilterSubmit} initialValues={carData} />
            )}
            <div
              className="mt-8 text-center bg-gray-100 p-2 font-bold cursor-pointer hover:bg-gray-50"
              onClick={handleShowCarForm}
            >
              New car
            </div>
            {showCarForm && <NewCarForm onFilterCar={handlecarfilter} initialValues={carData} />}
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
                      <option value="" defaultValue>Select</option>
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
              {showcars?.map((item, index) => {
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
