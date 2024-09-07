'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const AdminDashboard = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/categories');
        const data = await res.json();
        setCategories(data.category);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

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
