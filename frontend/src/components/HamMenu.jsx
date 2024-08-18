"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { Separator } from './ui/separator';
import Link from 'next/link';
import axios from 'axios';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

const HamMenu = () => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://ebay-25ak.onrender.com/api/category');
            const slicedArr = response.data.result.resultList.slice(2, 8);
            setCategories(slicedArr);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);
  return (
      <div>
          <Sheet>
              <SheetTrigger asChild>
                  <GiHamburgerMenu className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent side="right" className="w-full overflow-y-auto">
                  <h1 className='font-semibold text-2xl font-sans'>
                      Welcome to Ebay
                  </h1>
                  <Separator className="my-1 mt-5" />
                  <SheetHeader className="mt-6">
                      <SheetTitle className="text-base font-normal flex flex-col gap-5 text-start ">
                          {categories.map((category) => (
                              <div key={category.id}>
                                  <Link href={`productlist?q=${encodeURIComponent(category.name)}`} className="">
                                      <SheetClose className="flex gap-5 justify-start items-center">
                                          <img
                                              src={category.image}
                                              alt="img"
                                              className="w-12 h-12 object-contain rounded-lg"
                                          />
                                          <div className="text-sm text-start">{category.name}</div>
                                      </SheetClose>
                                  </Link>
                              </div>
                          ))}
                      </SheetTitle>
                      <Separator className="my-1 mt-12" />
                      <div className='flex gap-5 justify-center items-center'>
                          <Link href='/signin' className='font-bold text-xl text-blue-800'>
                              Sign in
                          </Link>
                          <p className='text-xl'>Or</p>
                          <Link href='/register' className='font-bold text-xl text-blue-800'>
                              Register
                          </Link>
                      </div>
                  </SheetHeader>
              </SheetContent>
          </Sheet>
      </div>
  )
}

export default HamMenu