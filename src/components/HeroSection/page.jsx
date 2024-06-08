"use client"; // Ensure this is at the very top of the file

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader"; // Import the spinner component

const HeroSection = () => {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [uniqueMakes, setUniqueMakes] = useState([]);
  const [modelsByMake, setModelsByMake] = useState({});
  const [selectedMake, setSelectedMake] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const findCars = async () => {
    try {
      const response = await axios.get("/api/cars");
      setCars(response.data.data);
    } catch (error) {
      console.log("error in finding cars", error);
    }
  };

  useEffect(() => {
    findCars();
  }, []);

  useEffect(() => {
    if (cars) {
      const makes = [...new Set(cars.map((car) => car.make))];
      setUniqueMakes(makes);

      const models = cars.reduce((acc, car) => {
        if (!acc[car.make]) {
          acc[car.make] = [];
        }
        if (!acc[car.make].includes(car.model)) {
          acc[car.make].push(car.model);
        }
        return acc;
      }, {});

      setModelsByMake(models);
    }
  }, [cars]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [carType, setCarType] = useState("used");

  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true when form is submitted
    const carTypeValue = carType === "used" ? "Used Car" : "New Car";
    const carData = {
      make: data.make,
      model: data.model,
      zip: data.zip,
      distance: data.distance,
      carType: carTypeValue,
    };

    const query = new URLSearchParams(carData).toString();
    console.log("Query String:", query); // Debugging output
    router.push(`/CarList?${query}`);
  };

  const handleMakeChange = (e) => {
    setSelectedMake(e.target.value);
  };

  return (
    <>
      <div className="md:relative md:h-[95vh]">
        <section className="h-[100%]">
          <video
            preload="auto"
            autoPlay={true}
            muted={true}
            playsInline={false}
            loop={true}
            className="banner-video h-full w-full md:object-fill object-cover"
            src="Assets/home-banner-video.mp4"
          >
            <source src="Assets/home-banner-video.mp4" type="video/mp4" />
          </video>

          <div className="md:absolute h-[30%] bottom-3 left-0 right-0 flex justify-center items-center">
            <div className="w-[90%] h-[100%]">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="h-[100%] mt-2"
              >
                <div className="h-[30%] flex ">
                  <button
                    type="button"
                    className={`h-full px-6 py-4 font-bold ${
                      carType === "used"
                        ? "bg-[#0A1C26] text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => setCarType("used")}
                  >
                    Used Car
                  </button>
                  <button
                    type="button"
                    className={`h-full px-6 py-4 font-bold ${
                      carType === "new"
                        ? "bg-[#0A1C26] text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => setCarType("new")}
                  >
                    New Car
                  </button>
                </div>
                <div className="md:flex justify-between items-center h-auto md:h-[70%] bg-white">
                  <div className="flex flex-col md:w-[17%] p-2">
                    <label htmlFor="make">Make</label>
                    <select
                      name="make"
                      id="make"
                      {...register("make")} 
                      className="p-2 border"
                      onChange={handleMakeChange}
                      value={selectedMake}
                    >
                      <option value="">Select</option>
                      {uniqueMakes.map((make) => (
                        <option key={make} value={make}>
                          {make}
                        </option>
                      ))}
                    </select>
                    {errors.make && (
                      <span className="text-red-500">Make is required</span>
                    )}
                  </div>
                  <div className="flex flex-col md:w-[17%] p-2">
                    <label htmlFor="model">Model</label>
                    <select
                      name="model"
                      id="model"
                      {...register("model")}
                      className="p-2 border"
                      disabled={!selectedMake} 
                    >
                      <option value="">Select</option>
                      {modelsByMake[selectedMake]?.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col md:w-[17%] p-2">
                    <label htmlFor="zip">Zip/Postal*</label>
                    <input
                      type="text"
                      id="zip"
                      placeholder="eg:90210"
                      {...register("zip", { required: true })}
                      className="p-2 border"
                    />
                    {errors.zip && (
                      <span className="text-red-500">
                        Zip/Postal is required
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col md:w-[17%] p-2">
                    <label htmlFor="distance">Distance</label>
                    <select
                      name="distance"
                      id="distance"
                      {...register("distance", { required: true })}
                      className="p-2 border"
                    >
                      <option value="">Select</option>
                      <option value="10">10 miles</option>
                      <option value="25">25 miles</option>
                      <option value="50">50 miles</option>
                      <option value="100">100 miles</option>
                    </select>
                    {errors.distance && (
                      <span className="text-red-500">Distance is required</span>
                    )}
                  </div>
                  <div className="md:w-[17%] p-2">
                    <button
                      type="submit"
                      className="bg-[#b91c1c] w-full h-full py-4 text-white font-bold hover:bg-[#0A1C26] transition duration-300 ease-in-out"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <ClipLoader color="#b91c1c" loading={loading} size={150} />
          </div>
        )}
      </div>
    </>
  );
};

export default HeroSection;
