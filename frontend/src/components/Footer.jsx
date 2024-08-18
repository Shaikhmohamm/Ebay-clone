import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-600 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">

                    {/* Contact Info Section */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-lg font-bold mb-4">Contact Information</h2>
                        <p className="text-gray-400">Email: zaids808@gmail.com</p>
                        <p className="text-gray-400">Location: Mumbai, India</p>
                    </div>

                    {/* Social Media Section */}
                    <div className="w-full md:w-1/3">
                        <h2 className="text-lg font-bold mb-4">Follow Me</h2>
                        <div className="flex space-x-4">
                            <a href="https://www.linkedin.com/in/zaid-shaikh-37b1b6171/" target='blank' className="text-gray-400 hover:text-white bg-gray-700 py-2 px-4 rounded">
                                LinkedIn
                            </a>
                            <a href="https://github.com/Shaikhmohamm" target='blank' className="text-gray-400 hover:text-white bg-gray-700 py-2 px-4 rounded">
                                GitHub
                            </a>
                            <a href="https://twitter.com/?lang=en" target='blank' className="text-gray-400 hover:text-white bg-gray-700 py-2 px-4 rounded">
                                Twitter
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()}  Shaikh Zaid. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
