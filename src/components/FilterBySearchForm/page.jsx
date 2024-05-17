import React, { useState } from 'react'
import { useForm } from "react-hook-form";
export default function RefineBySearchForm({onFilterSubmit}) {
 
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    const onSubmit = (data) => {
      onFilterSubmit(data);
      };
      const resetRefinebySearch=(()=>{
         localStorage.removeItem("RefineBySearchData")
      })
  return (
    <div>
            
              <div>
                 
                
                  <div className="">
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex flex-col">
                        <label htmlFor="">Make</label>
                        <select name="make" id="make" className="border p-2" {...register("make", { required: true })}>
                          <option value="" defaultValue >Select</option>
                          <option value="make2">Make</option>
                        </select>
                      </div>
                      {errors.make && (
                      <span className="text-red-500">
                        Make is required
                      </span>
                    )}
                      <div className="flex flex-col">
                        <label htmlFor="">Model</label>
                        <select name="model" id="" {...register("model", { required: true })} className="border p-2">
                          <option value="" defaultValue >Select</option>
                          <option value="2017">Mode 2017</option>
                          <option value="2018">Model 2018</option>
                          <option value="2019">Model 2019</option>
                        </select>
                      </div>
                      {errors.model && (
                      <span className="text-red-500">
                        Model is required
                      </span>
                    )}
                      <div className="flex flex-col">
                        <label htmlFor="">Touring</label>
                        <input type="text" name='touring' className="border p-2" {...register("touring", { required: true })} />
                      </div>
                      {errors.touring && (
                      <span className="text-red-500">
                       touring is required
                      </span>
                    )}
                      <div className=" ">
                        <div className="flex flex-col ">
                          <label htmlFor="">Zip/Postal</label>
                          <input type="text" name='zippostal' className="border p-2" {...register("zippostal", { required: true })}  />
                        </div>{errors.zippostal && (
                      <span className="text-red-500">
                        Zip/Postal is required
                      </span>
                    )}
                        <div className="">
                          <label htmlFor="">Distance</label>
                          <select className="w-full border p-2" name='distance'  {...register("distance", { required: true })}>
                            <option value="" defaultValue >Select</option>
                            <option value="300">300km</option>
                          </select>
                        </div>
                        {errors.distance && (
                      <span className="text-red-500">
                        Distance is required
                      </span>
                    )}
                      </div>
                      <div className=" ">
                        <div className="flex flex-col ">
                          <label htmlFor="">Min Price</label>
                          <input type="text" name='minprice' className="border p-2"  {...register("minprice", { required: true })}/>
                        </div>
                        {errors.minprice && (
                      <span className="text-red-500">
                       Min Price is required
                      </span>
                    )}
                        <div className=" flex flex-col">
                          <label htmlFor="">Max Price</label>
                          <input type="text" name='maxprice' className="border p-2 "  {...register("maxprice", { required: true })} />
                        </div>
                        {errors.maxprice && (
                      <span className="text-red-500">
                        Max Price is required
                      </span>
                    )}
                      </div>
                      <div className=" ">
                        <div className="flex flex-col ">
                          <label htmlFor="">Min Year</label>
                          <input type="text" name='minyear' className="border p-2"  {...register("minyear", { required: true })}/>
                        </div>
                        {errors.minyear && (
                      <span className="text-red-500">
                      Min Year is required
                      </span>
                    )}
                        <div className=" flex flex-col">
                          <label htmlFor="">Max Year</label>
                          <input type="text" name='maxyear'  {...register("maxyear", { required: true })} className="border p-2 " />
                        </div>
                        {errors.zip && (
                      <span className="text-red-500">
                      Max year is required
                      </span>
                    )}
                      </div>
                      <div className=" ">
                        <div className="flex flex-col ">
                          <label htmlFor="">Min Millage</label>
                          <input type="text" name='minmillage' {...register("minmillage", { required: true })}  className="border p-2" />
                        </div>
                        {errors.minmillage && (
                      <span className="text-red-500">
                        Minmillage is required
                      </span>
                    )}
                        <div className=" flex flex-col">
                          <label htmlFor="">Max Millage</label>
                          <input type="text" name='maxmillage' className="border p-2 " {...register("maxmillage", { required: true })} />
                        </div>
                        {errors.maxmillage && (
                      <span className="text-red-500">
                      Max Millage is required
                      </span>
                    )}
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Fuel type (gas, electric ,other)</label>
                        <select name="fuel" id="" className="border p-2" {...register("fuel", { required: true })}>
                          <option value="" defaultValue >Select</option>
                          <option value="gas">Fuel</option>
                        </select>
                      </div>
                      {errors.fuel && (
                      <span className="text-red-500">
                        Fuel is required
                      </span>
                    )}
                      <div className="flex flex-col">
    <label htmlFor="">Transmission</label>
    <input type="radio" name="transmission" value="automatic"  {...register("transmission",{ required: true })} /> Automatic
    <input type="radio" name="transmission" value="manual"  {...register("transmission",{ required: true })}/> Manual
    <input type="radio" name="transmission" value="semi-automatic" {...register("transmission",{ required: true })}/> Semi-Automatic
                </div>
                {errors.transmisson && (
                      <span className="text-red-500">
                        Zip/Postal is required
                      </span>
                    )}
                      <div className="flex flex-col">
    <label htmlFor="">Sale Type</label>
<input type="radio" name="saletype" value="automatic"  {...register("saletype",{ required: true })}/> Any
    <input type="radio" name="saletype" value="manual"  {...register("saletype",{ required: true })} /> Auction
    <input type="radio" name="saletype" value="semi-automatic" {...register("saletype",{ required: true })}/> Calssified
              </div>
              {errors.saletype && (
                      <span className="text-red-500">
                       saletype is required
                      </span>
                    )}

              <div className="flex flex-col">
                        <label htmlFor="">Body Style</label>
                        <select name="bodystyle" id=""  {...register("bodystyle", { required: true })} className="border p-2">
                          <option value="" defaultValue >Select</option>
                          <option value="curve">Body</option>
                        </select>
                      </div>
                      {errors.bodystyle && (
                      <span className="text-red-500">
                        Body Style is required
                      </span>
                    )}
              <div className="flex flex-col">
                        <label htmlFor="">Drive Type</label>
                        <select name="drivetype"  {...register("drivetype", { required: true })} id="" className="border p-2">
                          <option value="" defaultValue >Select</option>
                          <option value="single">Drive Type</option>
                        </select>
                      </div>
                      {errors.drivetype && (
                      <span className="text-red-500">
                       Drive Type is required
                      </span>
                    )}
              <div className="flex flex-col">
                        <label htmlFor="">Exterior Color</label>
                        <select name="" id="" className="border p-2"  {...register("exteriorcolor", { required: true })}>
                          <option value="" defaultValue >Select</option>
                          <option value="blue">Any</option>
                        </select>
                      </div>
                      {errors.exteriorcolor && (
                      <span className="text-red-500">
                       EXterior color is required
                      </span>
                    )}
              <div className="flex flex-col">
                        <label htmlFor="">Interior Color</label>
                        <select name="interiorcolor" id=""  {...register("interiorcolor", { required: true })} className="border p-2">
                          <option value="" defaultValue >Select</option>
                          <option value="gray">Any</option>
                        </select>
                      </div>
                      {errors.interiorcolor && (
                      <span className="text-red-500">
                       Interior color is required
                      </span>
                    )}
              <div className="flex flex-col">
                        <label htmlFor="">Doors 2-3</label>
                        <select name="doors" id="" className="border p-2"  {...register("doors", { required: true })}>
                          <option value="" defaultValue >Select</option>
                          <option value="2">Any</option>
                        </select>
                      </div>
                      {errors.doors && (
                      <span className="text-red-500">
                       Doors is required
                      </span>
                    )}
              <div className="flex flex-col">
                        <label htmlFor="">cylinders</label>
                        <select name="cylinders" id="" className="border p-2"  {...register("cylinders", { required: true })}>
                          <option value="" defaultValue >Select</option>
                          <option value="2">Any</option>
                        </select>
                      </div>
                      {errors.cylinders && (
                      <span className="text-red-500">
                        cylinders is required
                      </span>
                    )}
              <div className="flex flex-col">
                        <label htmlFor="">Title</label>
                        <select name="title" id="" className="border p-2" {...register("title", { required: true })} >
                          <option value="" defaultValue >Select</option>
                          <option value="bmw">BMW</option>
                        </select>
                      </div>
                      {errors.title && (
                      <span className="text-red-500">
                        Title is required
                      </span>
                    )}
                      <div className="flex flex-col">
    <label htmlFor="">For Sale By</label>
    <input type="radio" name="forsaleby" value="automatic" {...register("forsaleby", { required: true })} /> Any
    <input type="radio" name="forsaleby" value="manual"  {...register("forsaleby", { required: true })}/> Dealer
    <input type="radio" name="forsaleby" value="semi-automatic" {...register("forsaleby", { required: true })}/> Private
              </div>
              {errors.forsaleby && (
                      <span className="text-red-500">
                For saleby is required
                      </span>
                    )}
                <div className='flex flex-col'>
                    <label htmlFor="">Keywords</label>
                    <input type="text" className='border p-2' name='keywords'  {...register("keywords", { required: true })} />
                </div>
                {errors.keywords && (
                      <span className="text-red-500">
                        Zip/Postal is required
                      </span>
                    )}
                <div className="flex flex-col">
    <label htmlFor="">Show Last # of Days</label>
       <select name="" id="" className='border p-2'>
        <option value="">1</option>
        <option value="">2</option>
        <option value="">3</option>
        <option value="">4</option>
       </select>
              </div>
              {errors.zip && (
                      <span className="text-red-500">
                        Zip/Postal is required
                      </span>
                    )}
              <div className='flex   justify-between mt-4'>
                <div className='bg-red-500 px-2 py-1 rounded-lg w-[43%] text-white font-bold text-center' onClick={resetRefinebySearch}>
                 Reset
                </div>
                <div className='bg-orange-500 px-2 py-1 rounded-lg w-[43%] text-white font-bold text-center ' >
                    <button type='submit '>Submitt</button>
                </div>
              </div>
                    </form>
                   </div>
                   
              </div>
              <div>
                     <div>New Car</div>
              </div>
    </div>
  )
}
