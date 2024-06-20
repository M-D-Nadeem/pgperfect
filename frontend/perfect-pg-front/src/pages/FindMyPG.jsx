import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Nav from './Nav';
import Navbar from './HomePage/Navbar';
import PropertyCard from './HomePage/PropertySheet';
import FormCard from './HomePage/FormSheet';

const FindMyPG = () => {
    const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: 'easeInOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
  };

  const [open, setOpen] = useState(null);

  const handleToggle = (index) => {
    setOpen(open === index ? null : index);
  };

    return (
        <div className='about-page w-full'>
            <Navbar />
            <div className='about-page w-full bg-white text-black'>
                <div className="font-bold text-[30px] bg-cover bg-center flex items-center px-20 h-20" style={{ backgroundImage: `url('/bg2.jpg')` }}>
                    Property/PG list
                </div>

                <div className='flex  h-full'>
                    <div className='flex h-full py-4 w-full'>
                        <div className='flex flex-row justify-center space-around w-full'>
                            <div class="flex-1   p-2 m-2 w-2/6">
                            <FormCard />
                            </div>
                            <div class="flex-1  p-2 m-2 w-4/6">
                            <PropertyCard />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default FindMyPG;