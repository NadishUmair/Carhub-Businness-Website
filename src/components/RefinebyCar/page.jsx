import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PuffLoader } from 'react-spinners';

export default function NewCarForm({ onFilterCar, initialValues }) {

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const [cars, setcars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uniqueMakes, setUniqueMakes] = useState([]);
  const [modelsByMake, setModelsByMake] = useState({});
  const [selectedMake, setSelectedMake] = useState(initialValues?.make || "");
  const findCars = async () => {
    try {
      const response = await axios.get('/api/cars');
      console.log(response.data.data);
      setcars(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log('Error in finding cars', error);
      setLoading(false);
    }
  };
 console.log(uniqueMakes)
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
  useEffect(() => {
    if (initialValues) {
      Object.keys(initialValues).forEach((key) => {
        setValue(key, initialValues[key]);
      });
      setSelectedMake(initialValues.make || "");
    }
  }, [initialValues, setValue]);


  const onSubmit = (data) => {
    onFilterCar(data);
  };
  const handleMakeChange = (e) => {
    const newMake = e.target.value;
    setSelectedMake(newMake);
    setValue("model", ""); // Reset model when make changes
  };
  const watchMake = watch("make");

  useEffect(() => {
    if (watchMake && modelsByMake[watchMake]) {
      setSelectedMake(watchMake);
      // Set the default value for the model select element
      setValue("model", initialValues?.model || "");
    }
  }, [watchMake, modelsByMake, setValue, initialValues]);
  return (
    <div className='bg-white p-4'>
      <h3>Select options and see pricing on new vehicles from nearby dealers.</h3>
      {loading ? (
        <div className='flex flex-col justify-center items-center'>
          <PuffLoader color="red" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className='flex flex-col'>
            <label htmlFor="make" className='font-semibold'>Make</label>
            <select
              name="make"
              id="make"
              {...register("make", { required: "Make is required" })}
              defaultValue={initialValues?.make || ""}
              onChange={handleMakeChange}
              className="p-2 border"
            >
              <option value="" disabled>Select</option>
              {uniqueMakes.map((make) => (
                <option value={make}>{make}</option>
              ))}
            </select>
            {errors.make && <span className='text-red-500 text-sm'>{errors.make.message}</span>}
          </div>

          <div className='flex flex-col'>
            <label htmlFor="model" className='font-semibold'>Model</label>
            <select
              name="model"
              id="model"
              defaultValue={initialValues?.model || ""}
              {...register("model", { required: "Model is required" })}
              className="p-2 border"
            >
              <option value="" disabled>Select</option>
              {modelsByMake[selectedMake]?.map((model) => (
                <option value={model}>{model}</option>
              ))}
            </select>
            {errors.model && <span className='text-red-500 text-sm'>{errors.model.message}</span>}
          </div>

          <div className='flex flex-col'>
            <label htmlFor="zip" className='font-semibold'>Zip*</label>
            <input
              className='border p-2'
              type="number"
              name='zip'
              id="zip"
              {...register('zip', {
                required: 'Zip code is required',
                pattern: {
                  value: /^[0-9]{5}$/,
                  message: 'Enter a valid zip code'
                }
              })}
            />
            {errors.zip && <span className='text-red-500 text-sm'>{errors.zip.message}</span>}
          </div>

          <button type="submit" className='w-full mt-4 bg-orange-500 text-white font-bold p-2 rounded-lg hover:bg-orange-400'>Submit</button>
        </form>
      )}
    </div>
  );
}
