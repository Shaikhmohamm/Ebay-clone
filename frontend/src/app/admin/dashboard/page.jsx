'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import axios from 'axios'; // Import axios for the authentication check
import Unauthorized from '@/components/Unauthorized'; // Import Unauthorized Component
import Link from 'next/link';

const AdminDashboard = () => {
  const [isAuthorized, setIsAuthorized] = useState(null); // State to track authorization status
  const [categories, setCategories] = useState([]);
  const router = useRouter(); // Router for redirecting

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/check-auth', { withCredentials: true });

        // If authentication fails, set isAuthorized to false
        if (!response.data.success) {
          setIsAuthorized(false);
        } else {
          // If authentication succeeds, set isAuthorized to true and fetch categories
          setIsAuthorized(true);
          fetchCategories();
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setIsAuthorized(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/categories');
        const data = await res.json();
        setCategories(data.category);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    checkAdminAuth();
  }, [router]);

  // Show unauthorized page if the user is not authorized
  if (isAuthorized === false) {
    return <Unauthorized />;
  }

  // Show loading or nothing until the authorization status is determined
  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  // If the user is authorized, render the admin dashboard
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Categories List</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-3 px-4 border-b text-left text-gray-800">Category Name</th>
            <th className="py-3 px-4 border-b text-left text-gray-800">Category ID</th>
            <th className="py-3 px-4 border-b text-left text-gray-800">Subcategories</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td className="py-3 px-4 border-b">{category.name}</td>
              <td className="py-3 px-4 border-b">{category.catId}</td>
              <td className="py-3 px-4 border-b">
                <ul className="list-disc pl-5">
                  {category.subcategories.map((subcat) => (
                    <li key={subcat.subcatid}>
                      {subcat.name} (ID: {subcat.subcatid})
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
