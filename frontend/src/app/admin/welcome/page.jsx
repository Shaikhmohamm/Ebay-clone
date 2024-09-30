"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';

export default function Home() {
  const [loading, setLoading] = useState(true); // Loading state to manage UI
  const [error, setError] = useState(null); // Error state for handling unauthorized access
  const router = useRouter();

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/check-auth', { withCredentials: true });

        if (response.data.success) {
          toast({
            title: "Success",
            description: "Welcome to the admin dashboard!",
            variant: "success",
          });
          setLoading(false); // Remove loading once successful
        } else {
          setError(response.data.message); // Set error if not successful
        }
      } catch (error) {
        console.error('Authentication failed:', error);
        setError('An error occurred while checking authentication.');
        toast({
          title: "Error",
          description: "You are not authorized to access this page.",
          variant: "destructive",
        });
      } finally {
        setLoading(false); // Ensure loading state is updated after request
      }
    };

    checkAdminAuth();
  }, [router]);

  // Loading state or when the authentication check hasn't completed yet
  if (loading) {
    return <div>Loading...</div>;
  }

  // Unauthorized: Display custom message
  if (error) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-red-100">
        <h1 className="text-5xl font-bold mb-8 text-red-600">Not Authorized</h1>
        <p className="text-lg text-red-500 mb-8">You are not authorized as a admin</p>
        <button
          onClick={() => router.push('/signin')}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  // Authorized: Display dashboard content
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-5xl font-bold mb-8 text-gray-800">Welcome to Admin Dashboard</h1>
      <div className="flex w-full max-w-4xl">
        {/* Left Section - Category Documentation */}
        <div className="w-1/2 p-8 flex flex-col items-center border-r border-gray-200">
          <Link href="/admin/dashboard" legacyBehavior>
            <a target="_blank" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg">
              Category Documentation
            </a>
          </Link>
          <p className="text-sm text-gray-500 mt-4 text-center">
            View detailed documentation to understand how categories and subcategories are structured.
          </p>
        </div>

        {/* Right Section - Add Products */}
        <div className="w-1/2 p-8 flex flex-col items-center">
          <Link href="/add-products" legacyBehavior>
            <a className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg">
              Add Products
            </a>
          </Link>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Use this section to add new products under different categories and subcategories.
          </p>
        </div>
      </div>
    </div>
  );
}
