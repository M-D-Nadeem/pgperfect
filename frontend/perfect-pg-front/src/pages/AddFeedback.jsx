import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addFeedback } from '../redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddFeedback = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
  const [feedback, setFeedback] = useState({
    cleanliness: 0,
    waterSupply: 0,
    electrical: 0,
    safety: 0,
    internet: 0,
    maintenance: 0,
    security: 0,
    bookingProcess: 0
  });

  const [properties, setProperties] = useState([]); // State to store properties
  const [modalOpen, setModalOpen] = useState(false); // State to handle modal visibility

//   const fetchProperties = async () => {
//     try {
//       const response = await axios.get('/api/properties'); // Adjust the API endpoint
//       setProperties(response.data);
//     } catch (error) {
//       console.error('Error fetching properties:', error);
//     }
//   };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      const feed={feedback}
      const res=await dispatch(addFeedback(feed))
      if(res?.payload?.sucess){
        setFeedback(
            {
                cleanliness: 0,
                waterSupply: 0,
                electrical: 0,
                safety: 0,
                internet: 0,
                maintenance: 0,
                security: 0,
                bookingProcess: 0
              }
        )
        navigate(-1)
      }

  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Submit Feedback</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {[
            { label: 'Cleanliness', name: 'cleanliness' },
            { label: 'Water Supply', name: 'waterSupply' },
            { label: 'Electrical', name: 'electrical' },
            { label: 'Safety', name: 'safety' },
            { label: 'Internet', name: 'internet' },
            { label: 'Maintenance', name: 'maintenance' },
            { label: 'Security', name: 'security' },
            { label: 'Booking Process', name: 'bookingProcess' },
          ].map(({ label, name }) => (
            <div key={name} className="form-control">
              <label htmlFor={name} className="label font-medium">{label}</label>
              <input
                type="number"
                id={name}
                name={name}
                onChange={handleChange}
                className="input input-bordered w-full"
                min="0"
                max="10"
              />
            </div>
          ))}

          <button type="submit" className="btn btn-primary w-full">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};

export default AddFeedback;
