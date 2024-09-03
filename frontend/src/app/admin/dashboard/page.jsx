"use client"
import React from 'react'
import Link from 'next/link'

const AdminDashboard = () => {
  return (
    <div>
      <h1>Welcome to admin section</h1>
      <Link href='/add-products'>
        Add products
      </Link>
    </div>
  )
}

export default AdminDashboard
