"use client"; 
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import axios from 'axios';


// Mock Data
// incase of api calls reached to its limit below data will be useful
const mockProducts = {
  "resultList": [
    {
      "item": {
        "itemId": "3256803705009551",
        "title": "Apple iPhone 6 Mobile Cell Phone Original Used Unlocked4.7\" 16/32/128GB ROM Dual Core IOS 8MP Camera 3G 4G LTE Fingerprint",
        "sales": 150,
        "itemUrl": "//www.aliexpress.com/item/3256806563280913.html",
        "image": "//ae01.alicdn.com/kf/S0f5d4decb53a4967bc4020da5a451a1ay.jpg",
        "sku": {
          "def": {
            "price": 99.99,
            "promotionPrice": 67.44
          }
        },
        "averageStarRate": 4.5,
        "type": "natural"
      },
      "delivery": {
        "freeShipping": true,
        "shippingFee": 0
      },
      "sellingPoints": [
        {
          "name": "Free shipping",
          "id": "m0000064"
        }
      ]
    },
    {
      "item": {
        "itemId": "1234567890123456",
        "title": "Samsung Galaxy S10 128GB ROM Unlocked 4G LTE Smartphone with Triple Camera",
        "sales": 250,
        "itemUrl": "//www.aliexpress.com/item/1234567890123456.html",
        "image": "//ae-pic-a1.aliexpress-media.com/kf/Sacc3e4d7556c44f1adaf866d7b105087e.jpg",
        "sku": {
          "def": {
            "price": 499.99,
            "promotionPrice": 399.99
          }
        },
        "averageStarRate": 4.7,
        "type": "natural"
      },
      "delivery": {
        "freeShipping": false,
        "shippingFee": 15.00
      },
      "sellingPoints": [
        {
          "name": "+Shipping: $15.00",
          "id": "m0000056"
        }
      ]
    },
    {
      "item": {
          "itemId": "3256806290517176",
          "title": "Used Apple iPhone XS Max Mobile Phone 6.5\" RAM 4GB ROM 64GB/256GB Hexa Core A12 Original iOS 12MP NFC 4G LTE Unlocked Cellphone",
          "sales": 7,
          "itemUrl": "//www.aliexpress.com/item/3256806290517176.html",
          "image": "//ae-pic-a1.aliexpress-media.com/kf/Sdac2a06c27214f70a0d4f43804bd48d8E.jpg",
          "sku": {
              "def": {
                  "price": null,
                  "promotionPrice": 215.4
              }
          },
          "averageStarRate": null,
          "type": "natural"
      },
      "delivery": null,
      "sellingPoints": [
        {
          "name": "+Shipping: $15.00",
          "id": "m0000056"
        }
      ]
  }
  ]
};
const {resultList} = mockProducts


function ProductList() {
  
  const [products, setProducts] = useState(resultList);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const name = searchParams.get('q');
  const page = searchParams.get('page') || 1;


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://ebay-25ak.onrender.com/api/products', {
          params: { name, page },
        });
        console.log('Response Data:', response.data);
        setProducts(response.data.result.resultList);
      } catch (error) {
        console.error('Error fetching products:', error.response ? error.response.data : error.message);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [name, page]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex">
      <div className="hidden text-center mx-auto rounded-lg my-3 w-64 h-screen border-2 border-gray-200 bg-white shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Categories</h3>
            <div className="flex flex-col gap-1">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-600" />
                <span className="ml-2">Electronics</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-600" />
                <span className="ml-2">Fashion</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-600" />
                <span className="ml-2">Home & Garden</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-600" />
                <span className="ml-2">Sports</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:w-full md:mx-auto">
        <h1 className='text-lg md:text-2xl mx-4 font-bold my-4'>
          Results for &quot;{name}&quot;
        </h1>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductList />
    </Suspense>
  );
}