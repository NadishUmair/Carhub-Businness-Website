import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const FileBase64 = ({ onDone }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onDone(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <input type="file" onChange={handleFileChange} className="p-2 border" />
  );
};

export default function AdminAddCar() {
  const [dealers, setDealers] = useState([]);
  const [carImage, setCarImage] = useState("");

  const findDealers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/dealer');
      setDealers(response.data.data);
    } catch (error) {
      console.log("error in finding dealers", error);
    }
  };

  useEffect(() => {
    findDealers();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit =async (data) => {
    const carData = {
      ...data,
      carImage,
    };
    console.log("cardata",carData);
  console.log("car",data);
    try {
         const response=await axios.post('http://localhost:3000/api/cars',carData);
         if (response.data.success) {
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
    } catch (error) {
        if (error.response) {
            // Access the response data from the server
            toast.error(error.response.data.message);
          } else {
            toast.error("An error occurred while submitting the form.");
          }
    }
   
  };

  return (
    <div className="mt-4">
      <h1 className="text-center font-bold">Add Car Detail</h1>
      <div className="bg-white flex flex-col justify-center items-center p-2">
        <div className="w-[80%]">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Form fields for car details */}
            <div className="flex justify-between">
              <div className="flex flex-col w-[45%]">
                <label htmlFor="make">Make</label>
                <input
                  type="text"
                  id="make"
                  className="p-2 border"
                  {...register("make", { required: true })}
                />
                {errors.make && (
                  <span className="text-red-500">Make is required</span>
                )}
              </div>
              <div className="flex flex-col w-[45%]">
                <label htmlFor="model">Model</label>
                <input
                  type="text"
                  placeholder="eg:2017"
                  className="p-2 border"
                  id="model"
                  {...register("model", { required: true })}
                />
                {errors.model && (
                  <span className="text-red-500">Model is required</span>
                )}
              </div>
            </div>
            {/* Additional form fields */}
            <div className="flex justify-between">
              <div className="flex flex-col w-[45%]">
                <label htmlFor="touring">Touring</label>
                <input
                  type="text"
                  id="touring"
                  className="border p-2"
                  {...register("touring", { required: true })}
                />
                {errors.touring && (
                  <span className="text-red-500">Touring is required</span>
                )}
              </div>
              <div className="flex flex-col w-[45%]">
                <label htmlFor="dealer">Select Dealer Name</label>
                <select
                  id="dealer"
                  className="p-2 border"
                  type="text"
                  {...register("dealer", { required: true })}
                >
                   <option value="" disabled selected>
                        Select
                      </option>
                  {dealers.map((item) => (
                    <option key={item._id} value={item.dealerName}>
                      {item.dealerName}
                    </option>
                  ))}
                </select>
                {errors.dealer && (
                  <span className="text-red-500">Dealer is required</span>
                )}
              </div>
            </div>
            {/* More form fields */}
            <div className="flex justify-between">
              <div className="flex flex-col w-[45%]">
                <label htmlFor="zippostal">Zip/Postal</label>
                <input
                  type="number"
                  id="zippostal"
                  placeholder="Ex. 90210"
                  className="border p-2"
                  {...register("zippostal", { required: true })}
                />
                {errors.zippostal && (
                  <span className="text-red-500">Zip/Postal is required</span>
                )}
              </div>
              <div className="flex flex-col w-[45%]">
                <label htmlFor="distance">Distance</label>
                <input
                  type="number"
                  id="distance"
                  className="p-2 border"
                  {...register("distance", { required: true })}
                />
                {errors.distance && (
                  <span className="text-red-500">Distance is required</span>
                )}
              </div>
            </div>
            {/* Additional form fields */}
            <div className="flex justify-between">
              <div className="flex flex-col w-[45%]">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="enter price"
                  className="border p-2"
                  {...register("price", { required: true })}
                />
                {errors.price && (
                  <span className="text-red-500">Min Price is required</span>
                )}
              </div>
              <div className="flex flex-col w-[45%]">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="enter location"
                  className="border p-2"
                  {...register("location", { required: true })}
                />
                {errors.price && (
                  <span className="text-red-500">Min Price is required</span>
                )}
              </div>
              
            </div>
            {/* Add more form fields as needed */}
            <div className="flex justify-between">
              <div className="flex flex-col w-[45%]">
                <label htmlFor="year">Year</label>
                <input
                  type="number"
                  id="year"
                  placeholder="1900"
                  className="border p-2"
                  {...register("year", { required: true })}
                />
                {errors.year && (
                  <span className="text-red-500">Year is required</span>
                )}
              </div>
             
              <div className="flex flex-col w-[45%]">
                <label htmlFor="cartype">Car Type</label>
                <select name="cartype" type='text' className="border p-2" id="cartype" {...register("cartype", { required: true })}>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                </select>
                {errors.cartype && (
                  <span className="text-red-500">Year is required</span>
                )}
              </div>
             
               
            </div>
            {/* Continue adding fields */}
            <div className="flex justify-between">
              <div className="flex flex-col w-[45%]">
                <label htmlFor="millage">Millage</label>
                <input
                  type="number"
                  id="millage"
                  placeholder="0"
                  className="border p-2"
                  {...register("millage", { required: true })}
                />
                {errors.millage && (
                  <span className="text-red-500">Min Millage is required</span>
                )}
              </div>
             
             
            </div>
            {/* More fields */}
            <div className="flex justify-between">
              <div className="flex flex-col w-[45%]">
                <label htmlFor="fuel">Fuel Type (gas, electric, other)</label>
                <input
                  type="text"
                  id="fuel"
                  placeholder="gas, electric, other"
                  className="border p-2"
                  {...register("fuel", { required: true })}
                />
                {errors.fuel && (
                  <span className="text-red-500">Fuel is required</span>
                )}
              </div>
              <div className="flex flex-col w-[45%]">
                <label htmlFor="transmission">Transmission</label>
                <select
                type="text"
                  id="transmission"
                  className="p-2 border"
                  {...register("transmission", { required: true })}
                >
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                  <option value="semi-automatic">Semi-Automatic</option>
                </select>
                {errors.transmission && (
                  <span className="text-red-500">Transmission is required</span>
                )}
              </div>
            </div>
            {/* Add the remaining fields */}
            <div className="flex justify-between">
              <div className="flex flex-col w-[45%]">
                <label htmlFor="saletype">Sale Type</label>
                <input
                  type="text"
                  id="saletype"
                  placeholder="saletype"
                  className="border p-2"
                  {...register("saletype", { required: true })}
                />
                {errors.saletype && (
                  <span className="text-red-500">Sale Type is required</span>
                )}
              </div>
              <div className="flex flex-col w-[45%]">
                <label htmlFor="bodystyle">Body Style</label>
                <input
                  type="text"
                  id="bodystyle"
                  placeholder="bodystyle"
                  className="border p-2"
                  {...register("bodystyle", { required: true })}
                />
                {errors.bodystyle && (
                  <span className="text-red-500">Body Style is required</span>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col w-[45%]">
                <label htmlFor="drivetype">Drive Type</label>
                <select name="drivetype" id="drivetype"   className="border p-2" {...register("drivetype", { required: true })} >
                  <option value="FWD">FWD</option>
                  <option value="RWD">RWD</option>
                  <option value="4WD">4WD</option>
                  <option value="AWD">AWD</option>
                </select>
                {errors.drivetype && (
                  <span className="text-red-500">Drive Type is required</span>
                )}
              </div>
              <div className="flex flex-col w-[45%]">
                <label htmlFor="exteriorcolor">Exterior Color</label>
                <input
                  type="text"
                  id="exteriorcolor"
                  placeholder="exterior color"
                  className="border p-2"
                  {...register("exteriorcolor", { required: true })}
                />
                {errors.exteriorcolor && (
                  <span className="text-red-500">Exterior Color is required</span>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col w-[45%]">
                <label htmlFor="interiorcolor">Interior Color</label>
                <input
                  type="text"
                  id="interiorcolor"
                  placeholder="interior color"
                  className="border p-2"
                  {...register("interiorcolor", { required: true })}
                />
                {errors.interiorcolor && (
                  <span className="text-red-500">Interior Color is required</span>
                )}
              </div>
              <div className="flex flex-col w-[45%]">
                <label htmlFor="doors">Doors (2-3)</label>
                <input
                  type="number"
                  id="doors"
                  min={1}
                  max={8}
                  placeholder="number of doors"
                  className="border p-2"
                  {...register("doors", { required: true })}
                />
                {errors.doors && (
                  <span className="text-red-500">Doors is required</span>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col w-[45%]">
                <label htmlFor="cylinder">Cylinders</label>
                <input
                  type="number"
                  id="cylinder"
                  placeholder="cylinder"
                  className="border p-2"
                  {...register("cylinder", { required: true })}
                />
                {errors.cylinder && (
                  <span className="text-red-500">Cylinders is required</span>
                )}
              </div>
              <div className="flex flex-col w-[45%]">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  className="border p-2"
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <span className="text-red-500">Title is required</span>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col w-[45%]">
                <label htmlFor="forsaleby">For Sale By</label>
                <select
                  id="forsaleby"
                  type="text"
                  className="p-2 border"
                  {...register("forsaleby", { required: true })}
                >
                  <option value="any">Any</option>
                  <option value="private">Private</option>
                  <option value="dealer">Dealer</option>
                </select>
                {errors.forsaleby && (
                  <span className="text-red-500">For Sale By is required</span>
                )}
              </div>
              <div className="flex flex-col w-[45%]">
                <label htmlFor="keywords">Keywords</label>
                <input
                  type="text"
                  id="keywords"
                  className="border p-2"
                  {...register("keywords", { required: true })}
                />
                {errors.keywords && (
                  <span className="text-red-500">Keywords is required</span>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <label htmlFor="carImage">Select Car Image</label>
                <FileBase64 onDone={setCarImage} />
              </div>
              
            </div>
            <div className="flex flex-col w-[45%]">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  placeholder="description"
                  className="p-2 border"
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <span className="text-red-500">Description is required</span>
                )}
              </div>
            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="bg-red-500 px-2 py-1 rounded-lg w-[43%] text-white font-bold text-center"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
