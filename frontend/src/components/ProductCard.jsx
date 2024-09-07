import React from 'react';
import Link from 'next/link';

function ProductCard({ product }) {

  return (
    <div className="flex flex-row items-center space-y-4 md:space-y-0 space-x-6 p-3 rounded-lg shadow-sm">
      <img
        className="rounded-lg w-32 h-32 md:w-52 md:h-52 lg:w-64 lg:h-64 object-contain p-2 border-2"
        src={product.images[0]}
        alt={product.title}
      />
      <div className="flex flex-col lg:space-y-5 ">
        <Link href={`/productdetail/${product._id}`}>
          <p className="text-xs md:text-lg font-sans font-semibold text-gray-800 hover:underline hover:text-red-500 whitespace-pre-line" >
            {product.title}
          </p>
        </Link>
        <p className="mt-2 lg:mt-0 text-xs md:text-xl font-bold">
        ₹{(product.price)}
        </p>
        {product.sales && (
          <p className="mt-2 lg:mt-0 text-xs md:text-sm lg:text-lg text-red-500 font-bold">Sales: {product.sales}</p>
        )} 
        {product.rating && (
          <p className="text-yellow-500 font-bold text-xs md:text-sm lg:text-md">Rating: {product.rating} ★</p>
        )}
        <p className="hidden md:block text-sm md:text-md text-gray-700">
          Shipping fees: {product.shippingFee}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
