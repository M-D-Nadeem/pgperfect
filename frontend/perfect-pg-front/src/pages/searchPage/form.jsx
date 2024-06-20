import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { calculateRating, searchPg } from '../../redux/slice/userSlice';
import axiosInstance from '../../helper/axiosInstance';
import { calcLength } from 'framer-motion';

const FormComponent = () => {
  const dispatch=useDispatch()

  const [formData,setFormData]=useState({
    city:"",
    state:"",
    category:""
  })
  
  const handleFormData = (e) => {
    
        const {name,value}=e.target 
        setFormData({
    
            ...formData,
        
            [name]:value
    })
  };


   const handleSubmit =async (e) => {
    e.preventDefault();


    const response=await dispatch(searchPg(formData))
    
    response?.payload?.data.sort((a, b) => b.rating - a.rating);
    console.log(response);
    const propertyIds=response?.payload?.data.map((ele)=>{
        return ele.propertyId
    })
    console.log(propertyIds);
   
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="mb-4">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City:
        </label>
        <select
          id="city"
          value={formData.city}
          name="city"
          onChange={handleFormData}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select City</option>
          <option value="HOOGHLY">HOOGHLY</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Tokyo">Tokyo</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category:
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleFormData}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Category</option>
          <option value="Boy">Boy</option>
          <option value="Girl">Girl</option>
          <option value="Co">Co</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
          state:
        </label>
        <select
          id="state"
          value={formData.state}
          name="state"
          onChange={handleFormData}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select property For</option>
          <option value="KA">KA</option>
          <option value="West Bengal">West Bengal</option>
          <option value="Other">Happy Pg-Co</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

export default FormComponent;