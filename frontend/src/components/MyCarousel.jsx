"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import img1 from '../../public/elec.jpg';
import img2 from '../../public/Shoe.png';
import img3 from '../../public/fur.jpg';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useRouter } from 'next/navigation';

const MyCarousel = () => {
    const router = useRouter();
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);

    const handleClick = (category) => {
            router.push(`productlist?z=${category}`);
    };

    useEffect(() => {
        if (emblaApi) {
            //   console.log('hello world') 
        }
    }, [emblaApi]);

    return (
        <div className="w-11/12 mx-auto rounded-lg mt-5 lg:mt-2 overflow-hidden" ref={emblaRef}>
            <Carousel>
                <CarouselContent className="h-[250px] sm:h-[350px]">
                    {/* Furniture Carousel Item */}
                    <CarouselItem className="w-full text-white p-4 bg-gradient-to-r from-gray-100 to-gray-200">
                        <div className="flex items-center justify-around space-x-5 h-full">
                            <div className="p-4 text-black rounded-md h-full">
                                <p className="text-lg md:text-2xl font-bold mb-3">
                                    Furniture is meant to be used and <br className='hidden md:block' />
                                    enjoyed, not just admired.
                                </p>
                                <p className="text-sm md:text-lg md:mt-10">
                                    Transform your home with pieces that <br className='hidden md:block' />
                                    combine style and functionality.
                                </p>
                                <button
                                    onClick={() => handleClick('sofa')}
                                    className="text-sm md:text-lg px-2 py-1 md:px-6 md:py-2 border-2 border-black rounded-md md:rounded-full hover:bg-black hover:text-white mt-10">
                                    Shop Now
                                </button>
                            </div>
                            <div className="w-1/2 h-full hidden sm:flex items-center justify-center">
                                <Image
                                    src={img3}
                                    alt="Furniture Image"
                                    width={750} 
                                    className="object-contain rounded-md"
                                />
                            </div>
                        </div>
                    </CarouselItem>

                    {/* Shoes Carousel Item */}
                    <CarouselItem className="w-full h-[350px] text-white p-4 bg-red-600">
                        <div className="flex items-center justify-around space-x-5 h-full">
                            <div className="p-4 text-black rounded-md h-full">
                                <p className="text-lg md:text-2xl font-bold mb-3">
                                    Be the star of this summer&apos;s<br className='hidden md:block' />
                                    games
                                </p>
                                <p className="text-sm md:text-lg md:mt-10">
                                    Step up to the podium with top <br className='hidden md:block' />
                                    sneakers and great prices
                                </p>
                                <button
                                    onClick={() => handleClick('shoes')}
                                    className="text-sm md:text-lg px-2 py-1 md:px-6 md:py-2 border-2 border-black rounded-md md:rounded-full hover:bg-black hover:text-white mt-10">
                                    Shop Now
                                </button>
                            </div>
                            <div className="w-1/2 h-full hidden sm:flex items-center justify-center">
                                <Image
                                    src={img2}
                                    alt="Shoes Image"
                                    width={580}
                                    className="object-contain rounded-md"
                                />
                            </div>
                        </div>
                    </CarouselItem>

                    {/* Laptops Carousel Item */}
                    <CarouselItem className="w-full h-[350px] text-white p-4 bg-gradient-to-r from-teal-100 via-teal-300 to-teal-300">
                        <div className="flex items-center justify-around space-x-5 h-full">
                            <div className="p-4 text-black rounded-md h-full">
                                <p className="text-lg md:text-2xl font-bold mb-3">
                                    Equip yourself with the best <br className='hidden md:block' />
                                    laptops for work and play.
                                </p>
                                <p className="text-sm md:text-lg md:mt-10">
                                    Discover powerful and stylish <br className='hidden md:block' />
                                    laptops that meet your needs.
                                </p>
                                <button
                                    onClick={() => handleClick('tv')}
                                    className="text-sm md:text-lg px-2 py-1 md:px-6 md:py-2 border-2 border-black rounded-md md:rounded-full hover:bg-black hover:text-white mt-10">
                                    Shop Now
                                </button>
                            </div>
                            <div className="w-1/2 h-full hidden sm:flex items-center justify-center">
                                <Image
                                    src={img1}
                                    alt="Laptops Image"
                                    width={600} 
                                    className="object-contain rounded-md"
                                />
                            </div>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="hidden lg:flex absolute left-0 top-1/2 transform -translate-y-1/2" />
                <CarouselNext className="hidden lg:flex absolute right-0 top-1/2 transform -translate-y-1/2" />
            </Carousel>
        </div>
    );
}

export default MyCarousel;
