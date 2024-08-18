"use client";

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useEffect, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { fetchCategories } from '@/services/categoryService';
import { useRouter } from 'next/navigation';

function MyDropdownMenu() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter()


  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories(); // Call the fetchCategories function
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    loadCategories();
  }, []);

  const handleSubItemClick = (subItemName) => {
    // navigate to productlist page with subitem name
    router.push(`/productlist?q=${encodeURIComponent(subItemName)}`)
  }

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger className="hidden md:block text-xs text-left border-white">
        <div className="flex items-center">
          Shop by
          <IoIosArrowDown className="ml-1 text-lg" />
        </div>
        <p className="text-xs">
          <span>category</span>
        </p>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        className="relative top-3 border-2 left-[50px] lg:left-[200px] w-1/3 mt-2 bg-white shadow-xl rounded-xl z-10 p-4"
        onMouseLeave={() => setOpen(false)} // Close dropdown on mouse leave
      >
        <div className="flex flex-wrap gap-2 justify-around w-full">
          {categories.map((item, index) => (
            <div key={index} className="flex flex-col w-1/4">
              <DropdownMenu.Item className="font-bold text-gray-700 my-2 text-center">
                  {item.name}
              </DropdownMenu.Item>
              <div className="w-full flex flex-col">
                {item.list.slice(0, 4).map((subItem, subIndex) => (
                  <button
                    key={subIndex}
                    className="w-full text-sm text-gray-700 hover:bg-slate-100 py-1 px-5 rounded transition duration-300 ease-in-out whitespace-nowrap overflow-hidden text-ellipsis"
                    onClick={()=> handleSubItemClick(subItem.name)} 
                  >
                    {subItem.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default MyDropdownMenu;
