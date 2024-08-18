"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Categories = () => {  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://ebay-25ak.onrender.com/api/category');
      const slicedArr = response.data.result.resultList.slice(2, 8);
      setLoading(false);
      setCategories(slicedArr);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  const handleClick = (cat) => {
    // Construct the URL with the query parameter
    const url = `/productlist?q=${encodeURIComponent(cat)}`;
    // Navigate to the URL
    router.push(url);
  };

  if (loading) return <div className='text-xl text-center'>Loading..</div>;

  return (
    <div className='mt-5 px-4 md:px-6 lg:px-10 xl:px-16'>
      <h1 className='text-center text-xl md:text-2xl lg:text-3xl font-bold mb-8'>
        Explore Popular Categories
      </h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 justify-items-center'>
        {categories.map((category) => (
          <div key={category.id} className='group flex flex-col items-center hover:bg-slate-100 p-4 rounded-lg transition-all duration-300'>
            <div
              className='w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-blue-50 hover:shadow-xl transition duration-300 ease-in-out'
            >
              <img
                onClick={()=> handleClick(category.name)}
                src={category.image}
                className='w-full h-full object-cover rounded-md md:rounded-full cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg'
                alt='img'
              />
            </div>
            <p className='text-center text-sm md:text-base lg:text-lg font-medium mt-4'>
              {category.name}
            </p>
            <hr className='w-20 sm:w-24 md:w-28 border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
