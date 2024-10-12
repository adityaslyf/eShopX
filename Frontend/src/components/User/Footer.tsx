
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" text-gray-300 font-sans py-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6">
          <div className="mb-4 md:mb-0">
            <h3 className="text-3xl font-bold text-purple-400">Company Name</h3>
            <p className="text-sm mt-1">1234 Street Name, City, Country</p>
            <p className="text-sm">Phone: +1234567890</p>
          </div>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-purple-400 transition duration-300">About</a>
            <a href="#" className="hover:text-purple-400 transition duration-300">Contact</a>
            <a href="#" className="hover:text-purple-400 transition duration-300">Terms of Service</a>
            <a href="#" className="hover:text-purple-400 transition duration-300">Privacy Policy</a>
          </div>
        </div>
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2024 Company Name. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-300">
              <FaFacebookF className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-300">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-300">
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
