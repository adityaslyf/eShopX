import {
  FaHome,
  FaSearchengin,
  FaShoppingBag,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import { User } from "../../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";

interface PropsType {
  user: User | null;
}
const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  console.log("Header User:", user);

  const loginHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error in logging out");
    }
  };

  return (
    <nav className="flex justify-end p-4 space-x-8 rounded-sm static w-full bg-gray-900 text-white">
      <Link to="/">
        <FaHome size={26} onClick={() => setIsOpen(false)} />
      </Link>
      <Link to="/search">
        <FaSearchengin size={26} onClick={() => setIsOpen(false)} />
      </Link>
      <Link to="/cart">
        <FaShoppingBag size={24} />
      </Link>
      {user?._id ? (
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center"
          >
            {user.photo ? (
              <img 
                src={user.photo} 
                alt={user.name} 
                className="w-8 h-8 rounded-full mr-2"
              />
            ) : (
              <FaUser size={24} />
            )}
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-md text-black min-w-[150px]">
              <div className="flex flex-col p-2">
                <span className="px-4 py-2 text-sm font-medium text-gray-700">
                  {user.name}
                </span>
                <hr className="my-1" />
                {user.role === "admin" && (
                  <Link 
                    to="/admin" 
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link 
                  to="/user/orders" 
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Orders
                </Link>
                <button 
                  onClick={loginHandler}
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login" className="flex items-center">
          <IoLogIn size={28} />
          <span className="ml-2">Login</span>
        </Link>
      )}
    </nav>
  );
};

export default Header;
