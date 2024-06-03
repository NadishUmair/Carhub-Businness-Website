import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./filterbysearch.css";
import axios from "axios";
export default function RefineBySearchForm({ onFilterSubmit }) {
  const [forForm, setforForm] = useState();
  const findcars = async () => {
    try {
      const response = await axios.get("/api/cars");
      setforForm(response.data.data);
    } catch (error) {
      console.log("error in finding cars", error);
    }
  };
  useEffect(() => {
    findcars();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    onFilterSubmit(data);
  };
  const resetRefinebySearch = () => {
    localStorage.removeItem("RefineBySearchData");
  };
  return (
    <div>
      <div className="bg-white p-2">
        <div className="">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label htmlFor="">Make</label>

              <input
                type="text"
                name="make"
                id="make"
                className="border p-2"
                {...register("make")}
              />
            </div>
            {errors.make && (
              <span className="text-red-500">Make is required</span>
            )}
            <div className="flex flex-col">
              <label htmlFor="">Model</label>
              <input
                type="text"
                name="model"
                id=""
                {...register("model")}
                className="border p-2"
              />
            </div>
            {errors.model && (
              <span className="text-red-500">Model is required</span>
            )}
            <div className="flex flex-col">
              <label htmlFor="">Touring</label>
              <input
                type="text"
                name="touring"
                className="border p-2"
                {...register("touring")}
              />
            </div>
            {errors.touring && (
              <span className="text-red-500">touring is required</span>
            )}
            <div className=" flex justify-between  ">
              <div className="flex flex-col w-[40%]">
                <label htmlFor="zippostal">Zip/Postal</label>
                <input
                  type="number"
                  name="zippostal"
                  placeholder="Ex. 90210"
                  className="border p-2"
                  {...register("zippostal", { required: true })}
                />
                <div>
                  {errors.zippostal && (
                    <span className="text-red-500 text-[0.7rem]">
                      Zip/Postal is required
                    </span>
                  )}
                </div>
              </div>

              <div className="w-[40%]">
                <label htmlFor="">Distance</label>
                <input
                  type="text"
                  className="w-full border p-2"
                  name="distance"
                  {...register("distance", { required: true })}
                />

                <div>
                  {errors.distance && (
                    <span className="text-red-500 text-[0.7rem]">
                      Distance is required
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex  justify-between">
              <div className="flex flex-col w-[40%] ">
                <label htmlFor="">Min Price</label>
                <input
                  type="number"
                  name="minprice"
                  placeholder="0"
                  className="border p-2"
                  {...register("minprice")}
                />
              </div>
              {errors.minprice && (
                <span className="text-red-500">Min Price is required</span>
              )}
              <div className=" flex flex-col w-[40%]">
                <label htmlFor="">Max Price</label>
                <input
                  type="number"
                  name="maxprice"
                  placeholder="Any"
                  className="border p-2 "
                  {...register("maxprice")}
                />
              </div>
              {errors.maxprice && (
                <span className="text-red-500">Max Price is required</span>
              )}
            </div>
            <div className="flex justify-between ">
              <div className="flex flex-col  w-[40%]">
                <label htmlFor="">Min Year</label>
                <input
                  type="number"
                  placeholder="1900"
                  name="minyear"
                  className="border p-2"
                  {...register("minyear")}
                />
              </div>
              {errors.minyear && (
                <span className="text-red-500">Min Year is required</span>
              )}
              <div className=" flex flex-col w-[40%]">
                <label htmlFor="">Max Year</label>
                <input
                  type="number"
                  name="maxyear"
                  placeholder="2024"
                  {...register("maxyear")}
                  className="border p-2 "
                />
              </div>
              {errors.zip && (
                <span className="text-red-500">Max year is required</span>
              )}
            </div>
            <div className="flex justify-between ">
              <div className="flex flex-col w-[40%]">
                <label htmlFor="">Min Millage</label>
                <input
                  type="text"
                  placeholder="0"
                  name="minmillage"
                  {...register("minmillage")}
                  className="border p-2"
                />
              </div>
              {errors.minmillage && (
                <span className="text-red-500">Minmillage is required</span>
              )}
              <div className=" flex flex-col w-[40%]">
                <label htmlFor="">Max Millage</label>
                <input
                  type="text"
                  placeholder="Any"
                  name="maxmillage"
                  className="border p-2 "
                  {...register("maxmillage")}
                />
              </div>
              {errors.maxmillage && (
                <span className="text-red-500">Max Millage is required</span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Fuel type (gas, electric ,other)</label>
              <select
                name="fuel"
                id=""
                className="border p-2"
                {...register("fuel")}
              >
                <option value="" defaultValue>
                  Select
                </option>
                <option value="gas">gas</option>
                <option value="eectric">Electric</option>
                <option value="other">other</option>
              </select>
            </div>
            {errors.fuel && (
              <span className="text-red-500">Fuel is required</span>
            )}
            <div className="flex flex-col">
              <label htmlFor="">Transmission</label>
              <div className="flex">
                <input
                  type="radio"
                  className="mr-2"
                  name="transmission"
                  defaultChecked
                  id="specifyColor"
                  value="automatic"
                  {...register("transmission")}
                />
                <h3>Automatic</h3>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  id="specifyColor"
                  className=" mr-2"
                  name="transmission"
                  value="manual"
                  {...register("transmission")}
                />{" "}
                Manual
              </div>
              <div className="flex">
                <input
                  type="radio"
                  id="specifyColor"
                  className="mr-2"
                  name="transmission"
                  value="semi-automatic"
                  {...register("transmission")}
                />{" "}
                Semi-Automatic
              </div>
              {errors.transmisson && (
                <span className="text-red-500">Zip/Postal is required</span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="" className="font-bold">
                Sale Type
              </label>
              <div className="flex">
                <input
                  type="radio"
                  name="saletype"
                  defaultChecked
                  id="specifyColor"
                  value="any"
                  {...register("saletype")}
                  className="mr-2"
                  style={{ backgroundColor: "red" }}
                />{" "}
                Any
              </div>
              <div className="flex">
                <input
                  type="radio"
                  id="specifyColor"
                  className="mr-2"
                  name="saletype"
                  value="auction"
                  {...register("saletype")}
                />{" "}
                Auction
              </div>
              <div className="flex">
                <input
                  type="radio"
                  id="specifyColor"
                  name="saletype"
                  className="mr-2"
                  value="classified"
                  {...register("saletype")}
                />{" "}
                Calssified
              </div>{" "}
            </div>
            {errors.saletype && (
              <span className="text-red-500">saletype is required</span>
            )}

            <div className="flex flex-col">
              <label htmlFor="">Body Style</label>
              <select
                name="bodystyle"
                id="bodystyle"
                {...register("bodystyle")}
                className="border p-2"
              >
                <option value="" defaultValue>
                  Select
                </option>
                {forForm?.map((car) => {
                  return <option value={car.bodystyle}>{car.bodystyle}</option>;
                })}
              </select>
            </div>
            {errors.bodystyle && (
              <span className="text-red-500">Body Style is required</span>
            )}
            <div className="flex flex-col">
              <label htmlFor="">Drive Type</label>
              <select
                name="drivetype"
                {...register("drivetype")}
                id=""
                className="border p-2"
              >
                <option value="" defaultValue>
                  Select
                </option>
                <option value="FWD">FWD</option>
                <option value="RWD">RWD</option>
                <option value="4WD">4WD</option>
                <option value="AWD">AWD</option>
              </select>
            </div>
            {errors.drivetype && (
              <span className="text-red-500">Drive Type is required</span>
            )}
            <div className="flex flex-col">
              <label htmlFor="">Exterior Color</label>
              <input
                name="exteriorcolor"
                id="exteriorcolor"
                className="border p-2"
                {...register("exteriorcolor")}
              />
              
            </div>
            {errors.exteriorcolor && (
              <span className="text-red-500">EXterior color is required</span>
            )}
            <div className="flex flex-col">
              <label htmlFor="">Interior Color</label>
              <input
                name="interiorcolor"
                id="interiorcolor"
                {...register("interiorcolor")}
                className="border p-2"/>
               
            </div>
            {errors.interiorcolor && (
              <span className="text-red-500">Interior color is required</span>
            )}
            <div className="flex flex-col">
              <label htmlFor="">Doors 2-3</label>
              <select
                name="doors"
                id=""
                className="border p-2"
                {...register("doors")}
              >
                <option value="" defaultValue>
                  Select
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>
            {errors.doors && (
              <span className="text-red-500">Doors is required</span>
            )}
            <div className="flex flex-col">
              <label htmlFor="">cylinders</label>
              <input
                type="number"
                min={0}
                max={2}
                name="cylinders"
                id=""
                className="border p-2"
                {...register("cylinders")}
              />
            </div>
            {errors.cylinders && (
              <span className="text-red-500">cylinders is required</span>
            )}
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold">
                Title
              </label>
              <select
                name="title"
                id=""
                className="border p-2"
                {...register("title")}
              >
                {forForm?.map((item) => {
                  return <option>{item.title}</option>;
                })}
                <option value="" defaultValue>
                  Select
                </option>
                <option value="bmw">BMW</option>
              </select>
            </div>
            {errors.title && (
              <span className="text-red-500">Title is required</span>
            )}
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold">
                For Sale By
              </label>
              <div className="flex">
                <input
                  type="radio"
                  defaultChecked
                  id="specifyColor"
                  className="mr-2 "
                  name="forsaleby"
                  value="any"
                  {...register("forsaleby")}
                />{" "}
                Any
              </div>
              <div className="flex">
                <input
                  type="radio"
                  className="mr-2"
                  name="forsaleby"
                  id="specifyColor"
                  value="dealer"
                  {...register("forsaleby")}
                />{" "}
                Dealer
              </div>
              <div className="flex">
                <input
                  type="radio"
                  className="mr-2"
                  name="forsaleby"
                  id="specifyColor"
                  value="private"
                  {...register("forsaleby")}
                />{" "}
                Private
              </div>
            </div>
            {errors.forsaleby && (
              <span className="text-red-500">For saleby is required</span>
            )}
            <div className="flex flex-col">
              <label htmlFor="">Keywords</label>
              <input
                type="text"
                className="border p-2"
                name="keywords"
                {...register("keywords")}
              />
            </div>
            {errors.keywords && (
              <span className="text-red-500">keywords is required</span>
            )}
            <div className="flex flex-col">
              <label htmlFor="lastofdays">Show Last # of Days</label>
              <select name="lastofdays" id="lastofdays" className="border p-2">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            {errors.lastofdays && (
              <span className="text-red-500">lastofdays is required</span>
            )}
            <div className="flex   justify-between mt-4">
              <div
                className="bg-red-500 px-2 py-1 rounded-lg w-[43%] text-white font-bold text-center"
                onClick={resetRefinebySearch}
              >
                Reset
              </div>
              <div className="bg-orange-500 px-2 py-1 rounded-lg w-[43%] text-white font-bold text-center ">
                <button type="submit ">Submitt</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div>
        <div>New Car</div>
      </div>
    </div>
  );
}
