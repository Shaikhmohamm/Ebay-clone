"use client";

import * as HoverCard from '@radix-ui/react-hover-card';
import { MdOutlineNotificationsNone } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from './use-toast';

function NotificationHoverCard() {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <div className='text-2xl cursor-pointer'>
          <MdOutlineNotificationsNone />
        </div>
      </HoverCard.Trigger>
      <HoverCard.Content className="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-10">
        <p className="px-4 py-2 text-sm font-medium">You have no new notifications</p>
      </HoverCard.Content>
    </HoverCard.Root>
  );
}

function CartHoverCard({ isAuthenticated }) {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <div className='text-xl cursor-pointer'>
          <FiShoppingCart />
        </div>
      </HoverCard.Trigger>
      <HoverCard.Content className="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-10">
        {isAuthenticated ?
          (<p className="px-4 py-2 text-sm font-medium">Your cart is empty</p>) :
          (
            <p className="px-4 py-2 text-sm font-medium">Please login first</p>
          )}
      </HoverCard.Content>
    </HoverCard.Root>
  );
}

function MyebayHoverCard() {
    let list = ["Summary", "Recently viewed", "Bids/offer", "watchlist", "purchase history",
        "Buy again", "selling", "saved sellers", "messages"
      ];
    return (
        <HoverCard.Root>
            <HoverCard.Trigger asChild>
                <div className='text-xs cursor-pointer'>
                    My ebay
                </div>
            </HoverCard.Trigger>
            <HoverCard.Content className="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-10">
                {list.map((item, index) => (
                    <div className='flex flex-col rounded-full w-40' key={index}>
                        <button className='p-2 rounded-md hover:bg-gray-200'>
                            {item}
                        </button>
                    </div>
                ))}
            </HoverCard.Content>
        </HoverCard.Root>
    )
}


export { NotificationHoverCard, CartHoverCard, MyebayHoverCard  };
