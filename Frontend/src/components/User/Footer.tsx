
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" bg-blue-100 text-vlack  font-serif py-8 rounded-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">Company Name</h3>
            <p className="text-sm mt-1">1234 Street Name, City, Country</p>
            <p className="text-sm ">Phone: +1234567890</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className=" hover:text-white transition duration-300 text-black">About</a>
            <a href="#" className=" hover:text-white transition duration-300 text-black">Contact</a>
            <a href="#" className=" hover:text-white transition duration-300 text-black">Terms of Service</a>
            <a href="#" className=" hover:text-white transition duration-300 text-black">Privacy Policy</a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2024 Company Name. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-200 hover:text-white transition duration-300">
              <FaFacebookF className="w-5 h-5 text-black" />
            </a>
            <a href="#" className="text-gray-200 hover:text-white transition duration-300">
              <FaTwitter className="w-5 h-5 text-black" />
            </a>
            <a href="#" className="text-gray-200 hover:text-white transition duration-300">
              <FaInstagram className="w-5 h-5 text-black" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
