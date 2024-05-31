"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminAddCar from '@/components/AdminAddCar/page';

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
const AdminAccess = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [dealerlogo,setdealerlogo]=useState();
  console.log(dealerlogo);
  const onSubmit = async (data) => {
    const dealerData = {
      ...data,
     dealerlogo,
    };
    try {
      const response = await axios.post('http://localhost:3000/api/dealer', dealerData);
     
      
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while submitting the form.");
      }
    }
  };

  return (
    <div>
      <h1 className='text-center text-4xl mt-2 font-semibold'>
        Admin <span className='text-red-500'>Panel</span>
      </h1>
      <div className='flex flex-col justify-center items-center '>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-[90%] md:w-[60%] flex flex-col  justify-center items-center text-center'
        >
          <div className='flex flex-col mt-2 w-full'>
            <label htmlFor="dealerName" className='font-semibold'>Add Dealer Name</label>
            <input
              type="text"
              id="dealerName"
              {...register('dealerName', { required: true })}
              className='w-full mt-2 border p-2'
              placeholder='add dealer name'
            />
            {errors.dealerName && <span className='text-red-500'>This field is required</span>}
          </div>
          <div className='flex flex-col mt-2'>
            <label htmlFor="dealerlogo" className='font-bold mb-2'>Select Dealer Logo</label>
            <FileBase64 onDone={setdealerlogo} />
          </div>
          <div className='mt-4 w-full'>
            <button
              type='submit'
              className='text-white font-bold bg-red-500 px-4 py-1 w-[30%]'>
              Add
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />

      <AdminAddCar/>
    </div>
  );
};

export default AdminAccess;
