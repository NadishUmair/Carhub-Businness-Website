import React from 'react';
import { useForm } from 'react-hook-form';

export default function NewCarForm({onFilterCar}) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    onFilterCar(data);
    
  };

  return (
    <div className='bg-white p-2'>

      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3>Select options and see pricing on new vehicles from nearby dealers.</h3>
        </div>
        <div className='flex flex-col'>
        <label htmlFor="make" className='font-semibold'>Make</label>
                    <select
                      name="make"
                      id="make"
                      {...register("make",{required:"Make is required"})}
                      className="p-2 border"
                    >
                      <option value=""  defaultValue>
                        Select
                      </option>
                      <option value="make2">Make</option>
                      <option value="make3">Make</option>
                      <option value="make4">Make</option>
                      
                    </select>
        
        </div>
        {errors.make && <span className='text-red-500 text-sm'>{errors.make.message}</span>}
        <div className='flex flex-col'>
               <label htmlFor="model" className='font-semibold'>Model</label>
                    <select
                      name="model"
                      id="model"
                      {...register("model",{required:"Model required"})}
                      className="p-2 border"
                    >
                      <option value=""  defaultValue>
                        Select
                      </option>
                      <option value="2017">Model 2017</option>
                      <option value="2018">Model 2018</option>
                      <option value="2019">Model 2019</option>
                      <option value="2020">Model 2020</option>
                    </select>
          
        </div>
        {errors.model && <span className='text-red-500 text-sm'>{errors.model.message}</span>}
        <div className='flex flex-col'>
          <label htmlFor="zip" className='font-semibold'>Zip*</label>
          <input
            className='border p-2'
            type="text"
            id="zip"
            {...register('zip', {
              required: 'Zip code is required',
            //   pattern: {
            //     value: /^[0-9]{5}$/,
            //     message: 'Enter a valid zip code'
            //   }
            })}
          />
          {errors.zip && <span className='text-red-500 text-sm'>{errors.zip.message}</span>}
        </div>
        <button type="submit " className='w-full mt-4 bg-orange-500 text-white font-bold p-2 rounded-lg hover:bg-orange-400'>Submit</button>
      </form>
    </div>
  );
}
