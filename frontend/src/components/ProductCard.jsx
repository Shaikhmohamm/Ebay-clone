import React from 'react';
import Link from 'next/link';

function ProductCard({ product }) {
  const productId = product.item.itemId 

  return (
    <div className="flex flex-row justify-center items-center space-x-2 space-y-4 md:space-y-0 md:space-x-6 p-3 rounded-lg shadow-sm">
      <img
        className="rounded-lg w-32 h-32 md:w-52 md:h-52 lg:w-64 lg:h-64 object-cover"
        src={product.item.image}
        alt={product.item.title}
      />
      <div className="flex flex-col lg:space-y-5 ">
        <Link href={`/productdetail/${productId}`}>
          <p className="text-xs md:text-lg font-sans font-semibold text-gray-800 hover:underline hover:text-red-500" >
            {product.item.title}
          </p>
        </Link>
        <p className="mt-2 lg:mt-0 text-xs md:text-xl font-bold">
        ₹{(product.item.sku.def.promotionPrice * 83).toFixed(2)}
        </p>
        {product.item.sales && (
          <p className="mt-2 lg:mt-0 text-xs md:text-sm lg:text-lg text-red-500 font-bold">Sales: {product.item.sales}</p>
        )} 
        {product.item.averageStarRate && (
          <p className="text-yellow-500 font-bold text-xs md:text-sm lg:text-md">Rating: {product.item.averageStarRate} ★</p>
        )}
        <p className="hidden md:block text-sm md:text-md text-gray-700">
          {product.delivery === null ? "Free Shipping" : `Shipping: $${product.delivery.shippingFee}`}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
