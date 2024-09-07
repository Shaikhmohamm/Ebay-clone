import Link from 'next/link';

export default function Home() {
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
