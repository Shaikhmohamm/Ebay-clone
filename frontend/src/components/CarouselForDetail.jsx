import React, { useEffect } from 'react';
import Image from 'next/image';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

const CarouselForDetail = ({ images }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);

    useEffect(() => {
        if (emblaApi) {
            // we can access the Embla API here if needed
        }
    }, [emblaApi]);

    return (
        <div className="" ref={emblaRef}>
            <Carousel>
                <CarouselContent className="flex">
                    {images.map((image, index) => (
                        <CarouselItem key={index} className="">
                            <div className="flex justify-center p-5">
                                <Image
                                    src={`${image}`} 
                                    alt='item image'
                                    width={550}     
                                    height={300} 
                                    className=""
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden lg:flex w-12 h-12 absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 cursor-pointer" />
                <CarouselNext className="hidden lg:flex w-12 h-12 absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 cursor-pointer" />
            </Carousel>
        </div>
    );
};

export default CarouselForDetail;
