// components/Unauthorized.js
import Link from 'next/link';

const Unauthorized = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
      <p className="text-lg text-gray-600 mb-8">You do not have permission to access this page.</p>
      <Link href="/signin" legacyBehavior>
        <a className="bg-blue-500 text-white px-6 py-2 rounded-lg">Go to Sign In</a>
      </Link>
    </div>
  );
};

export default Unauthorized;
