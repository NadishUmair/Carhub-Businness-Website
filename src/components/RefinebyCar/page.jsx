import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PuffLoader } from 'react-spinners';

export default function NewCarForm({ onFilterCar }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [forForm, setForForm] = useState([]);
  const [loading, setLoading] = useState(true);

  const findCars = async () => {
    try {
      const response = await axios.get('/api/cars');
      console.log(response.data.data);
      setForForm(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log('Error in finding cars', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    findCars();
  }, []);

  const onSubmit = (data) => {
    onFilterCar(data);
  };

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
              className="p-2 border"
            >
              {forForm.map((item, index) => (
                <option key={index} value={item.make}>{item.make}</option>
              ))}
            </select>
            {errors.make && <span className='text-red-500 text-sm'>{errors.make.message}</span>}
          </div>

          <div className='flex flex-col'>
            <label htmlFor="model" className='font-semibold'>Model</label>
            <select
              name="model"
              id="model"
              {...register("model", { required: "Model is required" })}
              className="p-2 border"
            >
              {forForm.map((item, index) => (
                <option key={index} value={item.model}>{item.model}</option>
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
