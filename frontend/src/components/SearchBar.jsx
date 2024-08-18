"use client"; 
import React from 'react'
import Image from 'next/image'
import MyDropdownMenu from './ui/MyDropdownMenu'
import { IoSearchOutline } from "react-icons/io5"
import logo from '../../public/images.png'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import Link from 'next/link';


const SearchBar = () => {
// for storing search input value
const [searchInput, setSearchInput] = useState('');  // State to store the search input
const router = useRouter();


 // Function to handle search button click
 const handleSearch = async () => {
  if (!searchInput.trim()) {
    // If input is empty, do nothing
    return;
  }

  try {
    // Make the API call
    const response = await axios.get('https://ebay-25ak.onrender.com/api/products', {
      params: { name: searchInput, page: 1 }  // Passing the input and page number
    });

    const products = response.data;  // Assuming the data contains the products
    console.log(products)

    

    // Redirecting to the product list page with the fetched data
    router.push(`/productlist?q=${encodeURIComponent(searchInput)}`);

    // clear the search bar text
    setSearchInput('')

  } catch (error) {
    console.error('Error fetching the products:', error);
  }
};

  return (
    <>
      <div className='flex justify-center space-x-3 items-center'>
        <Link href="/" passHref legacyBehavior>
          <a>
            <Image
              className='hidden md:block w-24'
              width={100}
              height={100}
              src={logo}
              alt="Logo"
            />
          </a>
        </Link>
        <MyDropdownMenu className='' />
        <div className='mx-4 w-11/12 md:w-1/2'>
          <div className="relative my-2 rounded-md shadow-sm">
            <div className="hidden pointer-events-none absolute inset-y-0 left-0 md:flex items-center md:pl-2">
              <IoSearchOutline />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}  // Update state on input change
              className="block w-full h-10 md:h-12 md:rounded-full md:border-2 border-black py-1.5 pl-7 pr-20 text-gray-900 ring-1 
              ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
              focus:ring-inset ring-black sm:text-sm sm:leading-6 text-xs sm:text-md"
              placeholder="Search for anything"
            />
          </div>
        </div>
        <div className=''>
          <button
            onClick={handleSearch}  // Handle search button click
            className='mr-2 sm:w-20 md:w-40 mb-1 md:mb-0 h-8 md:h-10 bg-blue-600 text-white text-xs md:text-lg md:rounded-full md:font-bold rounded-md mt-1 px-2
            hover:bg-blue-700'>
            Search
          </button>
          <button className='hidden lg:inline text-xs ml-2 hover:text-blue-500'>
            Advanced
          </button>
        </div>
      </div>
      <hr />
    </>
  )
}

export default SearchBar