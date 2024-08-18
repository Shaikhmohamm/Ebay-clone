"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import img from "../../public/images.png"
import { CgProfile } from "react-icons/cg";
import { FiShoppingCart } from "react-icons/fi";
import HamMenu from './HamMenu';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from './ui/use-toast';
  

const MobileNav = () => {
    const router = useRouter()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleCartClick = () => {
        if (isAuthenticated) {
            router.push('/cart');  // Redirect to cart page if authenticated
        } else {
            toast({
                title: "Authentication required",
                description: "Please sign in to access your cart.",
                variant: "destructive",
            });
            router.push('/signin');  // Redirect to login page
        }
    }

    const handleProfileClick = () => {
        router.push('/signin');  // Redirect to login page 
    };
    
    return (
        <>
            <nav className='block md:hidden flex justify-between'>
                <div>
                    <Image
                        src={img}
                        width={55}
                        height={100}
                        alt='logo'
                        className='p-0'
                    />
                </div>
                <div className='flex gap-5 items-center justify-center mx-2 font-semibold'>
                    <CgProfile className='text-xl' onClick={handleProfileClick} />
                    <FiShoppingCart className='text-xl' onClick={handleCartClick} />
                    <HamMenu isAuthenticated = {isAuthenticated} />
                </div>
                
            </nav>
        </>
    )
}

export default MobileNav