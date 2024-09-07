"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import CarouselForDetail from '@/components/CarouselForDetail';
import Description from '@/components/Description';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import Cookies from 'js-cookie';



export default function ProductDetail({ params }) {

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1)

  // get productId from params
  const { productId } = params;

  // getting isauth state from redux store to manage the state
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter()

  // to fetch the data from api based on product id
  useEffect(() => {

    const fetchProduct = async () => {
      try {
        console.log(`initially`,product)
        const response = await axios.get(`https://ebay-25ak.onrender.com/api/products/${productId}`);
        setProduct(response.data);
        console.log(`after changing`,product)
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // to check the state of product
  useEffect(() => {
    console.log("Product state updated:", product);
  }, [product]);


  // function handling add to cart feature
  const handleAddToCart = async (item, quantity) => {
    if (!isAuthenticated) {
      toast({
        title: "You need to log in first",
        className: "text-red-600 bg-white hover:bg-gray-100 font-bold",
      });;
      return;
    } 

      try {
        let token = Cookies.get('UserAuth')
        const response = await axios.post("https://ebay-25ak.onrender.com/api/cart/add",
          {
            productId: `${product._id}`,
            title: `${product.title}`,
            price: (product.price),
            image: `${product.images[0]}`,
            quantity: `${quantity}`,
            size: "m",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(`api response`, response.data)
        toast({
          title: "Item added to cart",
          className: "text-red-600 bg-white hover:bg-gray-100 font-bold",
        });
      } catch (error) {
        console.log("ERROR adding to cart: ", error);
      }
  };
  
  
  // if product is not available display loading
  if (!product) return <div>Loading...</div>;

  return (
    <>
      <div className="p-4 lg:flex lg:space-x-5 mx-auto overflow-x-hidden">
        <div className='hidden lg:block p-1'>
          {/* small images section */}
          {product.images.map((image, index) => (
            <Image
              key={index}
              src={`${image}`}
              alt={`${product.title} image ${index + 1}`}
              width={100}
              height={100}
              className="mb-4 border-2 rounded-lg object-contain"
            />
          ))}
        </div>
        {/* central image section */}
        <div className="w-full lg:w-3/4 p-5">
          <CarouselForDetail
            images={product.images}
          />
        </div>
        {/* product details like title, price, sold numbers etc */}
        <div className='flex flex-col space-y-5 lg:w-1/2 px-5 py-4'>
          <h1 className="text-lg md:text-2xl font-semibold mb-4">
            {product.title}
            <hr className='mt-2' />
          </h1>
          <div className='flex flex-col space-y-1 font-medium'>
            <h1 className="text-lg md:text-2xl font-bold mb-5">₹ {product.price}</h1>
            <div className="mt-2 flex items-center space-x-4">
              
              <label htmlFor="quantity" className="text-sm font-medium text-gray-900">Quantity:</label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                className="w-20 h-12 rounded-lg border border-gray-500 py-2 px-3 text-gray-900 placeholder-black focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                placeholder="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)} 
              />

              
              <p className="hidden md:flex font-bold text-sm text-gray-500">More than 10 available</p>

              
              <p className="hidden md:flex font-bold text-sm text-red-500">{product.sales}+ Sold</p>

              
            </div>
          </div>
          <div>
            <button className='w-full h-12 bg-blue-600 text-white font-bold rounded-full mt-3 px-4 py-2
             hover:bg-blue-700'>
              Buy it now
            </button>
            <button
              onClick={() => handleAddToCart(product.title, quantity)}
              className='w-full h-12 bg-white border-2 border-blue-400 text-blue-400 font-bold rounded-full mt-3 px-4 py-2 hover:bg-gray-100'>
              Add to cart
            </button>
            <button className='w-full h-12 bg-white border-2 border-blue-400 text-blue-400 font-bold rounded-full mt-3 px-4 py-2 hover:bg-gray-100'>
              Add to wishlist
            </button>
          </div>
          <div className='border-2 bg-gray-100 rounded-lg p-2'>
              <div className=''>
                <p className='font-bold mt-2 text-md underline'>
                Fast delivery
                </p>
                <p className='text-sm'>
                Collect a $1.00 coupon if your order arrives after the estimated delivery date.
                </p>
              </div>
              <div className=''>
                <p className='font-bold mt-2 text-md underline'>
                Buyer protection
                </p>
                <p className='text-sm'>
                Get a refund if the item arrives late or not as described.
                </p>
              </div>
          </div>
        </div>
      </div>
      {/* description section contains item specs, shiping, delivery and handling with images */}
      <Description product={product} />
    </>
  );
}
