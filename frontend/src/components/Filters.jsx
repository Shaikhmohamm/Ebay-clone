import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
  
const Filters = () => {
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
      <div className='hidden border-2 border-black mx-3 p-4 rounded-lg'>
          <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                  <AccordionTrigger className='p-2 w-52 text-md text-center'>category</AccordionTrigger>
                  <AccordionContent>
                      {categories.map((category) => (
                          <div key={category.id}>
                              <Link href={`productlist?q=${encodeURIComponent(category.name)}`} className="">
                                  <div className="flex gap-5 justify-start items-center">
                                      <img
                                          src={category.image}
                                          alt="img"
                                          className="w-12 h-12 object-contain rounded-lg"
                                      />
                                      <div className="text-sm text-start">{category.name}</div>
                                  </div>
                              </Link>
                          </div>
                      ))}
                  </AccordionContent>
              </AccordionItem>
          </Accordion>
      </div>
  )
}

export default Filters