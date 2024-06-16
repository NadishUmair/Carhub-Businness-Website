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
  const [handlerefinembl,sethandlerefinembl]=useState(false);
  const [handlesearchcarmbl,sethandlesearchcarmbl]=useState(false);
  const [handlesearchdealermbl,sethandlesearchdealermbl]=useState(false);

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
    console.log("params of the data",data);
    localStorage.setItem("savedFormData", JSON.stringify(data));
    setCarData(data);
    const anyFilterPresent = Object.values(data).some((value) => value);
    
    if (!anyFilterPresent) {
      setCars(FilterCar);
      setshowcars(FilterCar);
      return; 
    }
  
   
    if (FilterCar?.length > 0) {
      const FilteredCars = FilterCar.filter((car) => {
        return (
          (!data.make || car.make === data.make) &&
          (!data.model || car.model === data.model) ||
          (!data.zip && car.zippostal === data.zip) ||
          (!data.distance && car.distance === data.distance) ||
          (!data.carType && car.cartype === data.carType)
        );
      });
      setCars(FilteredCars);
      setshowcars(FilteredCars);
    } else {
   
      setCars([]);
      setshowcars([]);
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
    sethandlerefinembl(false);
};

const handlecarfilter = (data) => {
  const filterBycar = FilterCar.filter((car) => {
    return (
      (data.make && data.model && car.make === data.make && car.model === data.model) ||
      (data.zip && car.zippostal === data.zip)
    );
    
  });

  // setCars(filterBycar);
 
  setshowcars(filterBycar);
  setCars(filterBycar)
  sethandlesearchcarmbl(false);
};


  const searchDealerHandler = (dealerName) => {
    const filteredDealers = cars?.filter((item) => {
      return dealerName && item.dealername === dealerName;
    });
    setshowcars(filteredDealers);
    // setCars(filteredDealers);
    sethandlesearchdealermbl(false);
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
      const FilterSort = cars?.filter((car) => {
        return value && car.cartype === value;
      });
      // setCars(FilterSort);
      setshowcars(FilterSort);
    }
  };
  console.log("cars",cars)
  const handleResetSearchParams = () => {
    const queryParams = new URLSearchParams();
    queryParams.delete("make");
    queryParams.delete("model");
    queryParams.delete("zip");
    queryParams.delete("distance");
    queryParams.delete("carType");
    window.history.replaceState({}, document.title, window.location.pathname + "?" + queryParams.toString());

  };
  const handlesearhdealers=()=>{
    sethandlesearchdealermbl(!handlesearchdealermbl)
    if(handlerefinembl) sethandlerefinembl(false);
    if(handlesearchcarmbl) sethandlesearchdealermbl(false);
    if (!handlesearchdealermbl) window.scrollTo(0, 0);
  }
  const handlebyrefine=()=>{
    sethandlerefinembl(!handlerefinembl);
    if(handlesearchcarmbl) sethandlesearchdealermbl(false);
    if(handlesearchdealermbl) sethandlesearchdealermbl(false);
    window.scrollTo(0, 0);
  }
const handlenewcar=()=>{
sethandlesearchcarmbl(!handlesearchcarmbl);
if(handlesearchdealermbl) sethandlesearchdealermbl(false);
if(handlerefinembl) sethandlerefinembl(false);
if (!handlesearchcarmbl) window.scrollTo(0, 0);
}
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
        <div className="md:flex p-2 ">
          <div className="md:w-[25%]  p-4 h-[50%]  border bg-gray-300 hidden md:block">
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
              <RefineBySearchForm onFilterSubmit={handleFilterSubmit} onResetSearchParams={handleResetSearchParams}  />
            )}
            <div
              className="mt-8 text-center bg-gray-100 p-2 font-bold cursor-pointer hover:bg-gray-50"
              onClick={handleShowCarForm}
            >
              New car
            </div>
            {showCarForm && <NewCarForm onFilterCar={handlecarfilter} initialValues={carData}/>}
          </div>
          <div className="md:w-[75%] p-2">
            <div className="flex justify-between ">
              <div className="text-xl">
                Showing 1-{showcars?.length} of
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
            <div className="flex justify-end  mt-4">
              <div className="hidden md:flex ">
                <span className="mr-2 text-xl">
                  <BsGrid3X3Gap onClick={() => setlistgridView(true)} />{" "}
                </span>
                <span className="text-xl">
                  <CiGrid2H onClick={() => setlistgridView(false)} />
                </span>
              </div>
            </div>
            <div
              className={`${listgridView ? "flex flex-wrap  gap-4 h-full mt-4" : "p-2"}`}
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
                          listgridView ? "" : "md:w-[40%]"
                        } h-[50%] relative`}
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
                            <div className="flex text-yellow-400 text-xl mt-2">
                              <TiStar />
                              <TiStar />
                              <TiStar />
                              <TiStar />
                              <TiStar />
                              <p className="text-black text-sm">(5 Reviews)</p>
                            </div>
                          </div>
                          <p className="text-gray-700 text-base mt-2">
                            {item.description}
                          </p>
                        </div>
                        <div className="px-2 pt-4 ">
                          <div className="flex ">
                            <div className=" rounded-full  px-3  text-[1rem] mr-2 mb-2">
                              <span className="font-bold text-blue-500 mr-1">Doors:</span>
                              <span>{item.doors}</span>
                            </div>
                            <div className="rounded-full px-3  text-[1rem] mr-2 mb-2">
                              <span className="font-bold text-blue-500 mr-1">Location:</span>{" "}
                             <span> {item.location}</span>
                            </div>
                            <div className="rounded-full px-3   text-[1rem] mr-2 mb-2">
                              <span className="font-bold text-blue-500 mr-1">  Posted:</span>
                           <span> {
                                new Date(item.createdAt)
                                  .toISOString()
                                  .split("T")[0]
                              }</span>
                            </div>
                          </div>
                          
                        </div>
                        <div className="px-2  ">
                          <div className="flex ">
                            <div className=" rounded-full flex flex-col px-3  text-[1rem] mr-2 mb-2">
                              <span className="font-bold text-blue-500 mr-1">Millage:</span>
                              <span>{item.millage}</span>
                            </div>
                            <div className="flex flex-col rounded-full px-3   text-[1rem] mr-2 mb-2">
                              <span className="font-bold text-blue-500 mr-1">CarType:</span>{" "}
                             <span> {item.cartype}</span>
                            </div>
                            <div className="flex flex-col rounded-full px-3   text-[1rem] mr-2 mb-2">
                              <span className="font-bold text-blue-500 mr-1">  Posted:</span>
                           <span> {
                                new Date(item.createdAt)
                                  .toISOString()
                                  .split("T")[0]
                              }</span>
                            </div>
                          </div>
                          
                        </div>
                        
                        <div className="flex justify-between">
                            <span className="inline-block rounded-full px-3 py-1 text-sm font-bold mr-2 mb-2">
                              <span className="font-bold">$</span>
                              {item.price}
                            </span>
                            <span className="text-red-500 font-semibold">Share</span>
                          </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
       {
        handlerefinembl && ( 
        <div className="absolute md:hidden z-10 top-0 w-full bg-white"> 
        <div className="flex justify-end">
          <button className="text-red-500 text-4xl mr-4" onClick={()=>sethandlerefinembl(false)}>x</button>
        </div>
         <RefineBySearchForm onFilterSubmit={handleFilterSubmit} onResetSearchParams={handleResetSearchParams}  />
        </div>
        
       )}

       {
         handlesearchcarmbl && ( 
          <div className="fixed md:hidden z-10 top-0 w-full bg-white"> 
          <div className="flex justify-end">
            <button className="text-red-500 text-4xl mr-4" onClick={()=>sethandlesearchcarmbl(false)}>x</button>
          </div>
          <NewCarForm onFilterCar={handlecarfilter} initialValues={carData}/>
          </div>
      )}
       {
         handlesearchdealermbl && ( 
          <div className="fixed md:hidden z-10 top-0 w-full bg-white"> 
          <div className="flex justify-end">
            <button className="text-red-500 text-4xl mr-4" onClick={()=>sethandlesearchdealermbl(false)}>x</button>
          </div>
          <Filterbydealer
                onFilterDealer={searchDealerHandler}
                className="bg-white"
              />
          </div>
      )}
        <div className="md:hidden fixed top-[90%] flex justify-between w-full px-4 border">
          <div onClick={handlesearhdealers} className="p-2 rounded-sm bg-white shadow-xl text-gray-900">
            DEALERS
          </div>
          <div onClick={handlebyrefine}  className="p-2 rounded-sm bg-white shadow-xl text-gray-900">
            REFINE
          </div>
          <div onClick={handlenewcar} className="p-2 rounded-sm bg-white shadow-xl text-gray-900">
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
