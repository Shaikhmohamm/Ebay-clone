import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-600 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">

                    {/* Contact Info Section */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-lg font-bold mb-4">Contact Information</h2>
                        <p className="text-gray-400">Email: your.email@example.com</p>
                        <p className="text-gray-400">Phone: (123) 456-7890</p>
                        <p className="text-gray-400">Location: City, Country</p>
                    </div>

                    {/* Social Media Section */}
                    <div className="w-full md:w-1/3">
                        <h2 className="text-lg font-bold mb-4">Follow Me</h2>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white bg-gray-700 py-2 px-4 rounded">
                                LinkedIn
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white bg-gray-700 py-2 px-4 rounded">
                                GitHub
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white bg-gray-700 py-2 px-4 rounded">
                                Twitter
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
