import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { NotificationHoverCard, CartHoverCard, MyebayHoverCard } from './ui/HoverCards';
import * as HoverCard from '@radix-ui/react-hover-card';
import { toast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth, logout } from '@/redux/slice/authSlice';

const NavBar = () => {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const router = useRouter()

    useEffect(() => {
        dispatch(checkAuth()); // Check authentication status when the component mounts
      }, [dispatch]);
      

    const handleLogout = async () => {
        try {
            // Remove the UserAuth token from cookies
            Cookies.remove("UserAuth");
            dispatch(logout()); // Update the auth state in Redux
    
            // Show a success message
            toast({
                title: "Success",
                description: "Logged out successfully",
                variant: "destructive",
            });
            console.log(`hello 1st`)
            // Test a simple redirect
            router.push("/"); // Test if redirect to home works
            console.log(`hello 2nd`)
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    

    return (
        <>
            <nav className='hidden mx-auto md:block w-3/4 lg:w-full md:flex md:space-x-1 lg:space-x-10 bg-slate-50 p-1 md:justify-between lg:justify-around'>
                {isAuthenticated? (
                    <HoverCard.Root className=''>
                        <HoverCard.Trigger asChild>
                            <div className='text-sm cursor-pointer'>
                                Hi, user
                            </div>
                        </HoverCard.Trigger>
                        <HoverCard.Content className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-10">
                            <button
                                onClick={handleLogout}
                                className='font-medium w-20 rounded-md hover:bg-gray-200'>
                                Sign out
                            </button>
                        </HoverCard.Content>
                    </HoverCard.Root>
                ) : (
                    <div className='flex space-x-4 text-xs items-center'>
                        <span>Hi</span>
                        <Link href='/signin' className='text-blue-500 underline'>
                            Sign in
                        </Link>
                        <Link href='/register' className='text-blue-500 underline'>
                            Register
                        </Link>
                        <Link href='/dailydeals'>
                            Daily deals
                        </Link>
                        <Link href='/contacts' className='hidden lg:block'>
                            Help & contacts
                        </Link>
                    </div>
                )}
                <div className='flex space-x-6 items-center'>
                    <Link href='/sell' className='text-xs'>
                        Sell
                    </Link>
                    <Link href='/watchlist' className='hidden lg:block text-xs'>
                        Watchlist
                    </Link>
                    <Link href='/myebay' className='text-xs'>
                        <MyebayHoverCard />
                    </Link>
                    <Link href='/notification' className='text-2xl'>
                        <NotificationHoverCard />
                    </Link>
                    {isAuthenticated ? (
                        <Link href='/cart' className='text-xl'>
                            <CartHoverCard isAuthenticated={isAuthenticated} />
                        </Link>
                    ) : (
                        <Link href='/signin' className='text-xl' onClick={(e) => {
                            e.preventDefault(); // Prevent navigation
                            toast({
                                title: "Authentication required",
                                description: "Please sign in to access your cart.",
                                variant: "destructive",
                            });
                        }}>
                            <CartHoverCard />
                        </Link>
                    )}

                </div>
            </nav>
            <hr className='text-red-500' />
        </>
    );
};

export default NavBar;
