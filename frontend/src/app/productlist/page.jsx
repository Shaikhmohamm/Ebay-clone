"use client"; 
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import axios from 'axios';


function ProductList() {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // get the name and page value from params
  const searchParams = useSearchParams();
  const subcatid = searchParams.get('q');
  // console.log(subcatid)
  const name = searchParams.get('z');
  // console.log(name)

  // fetching the list of products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://ebay-25ak.onrender.com/api/products', {
          params: { subcatid, name },
        });
        // console.log('Response Data:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.response ? error.response.data : error.message);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    if (subcatid || name) {
      fetchProducts(); // Fetch products only if subcatid exists
    }

  }, [subcatid, name]);

 
  useEffect(() => {
      // console.log('Updated products:', products);
  }, [products]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex">
      <div className="flex flex-col md:w-3/4 md:mx-auto">
        <h1 className='text-lg md:text-2xl mx-4 font-bold my-4'>
          Results for {name} 
          {/* &quot;{name}&quot; */}
        </h1>
        {/* product card component to handle the card */}
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