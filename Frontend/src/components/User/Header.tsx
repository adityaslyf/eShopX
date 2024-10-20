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
  const loginHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully")
    } catch (error) {
      toast.error("Error in logging out");
    }
  };

  return (
    <nav className="flex justify-end p-4 space-x-8 rounded-sm static w-full bg-gray-900 text-white">
      <Link to="/">
        <FaHome size={26} onClick={() => setIsOpen(false)} />
      </Link>
      <Link to="/search">
        <FaSearchengin
          size={26}
          onClick={() => {
            setIsOpen(false);
          }}
        />
      </Link>
      <Link to="/cart">
        <FaShoppingBag size={24} />
      </Link>
      {user?._id ? (
        <div className="relative">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <FaUser size={24} />
          </button>
          <dialog
            open={isOpen}
            className="absolute left-auto  mt-2 bg-white border rounded shadow-md"
          >
            <div className="flex flex-col justify-end space-y-2 text-xl p-2">
              {user.role === "admin" && (
                <Link to="/admin" onClick={() => setIsOpen(false)}>
                  Admin
                </Link>
              )}
              <Link to="/user/orders" onClick={() => setIsOpen(false)}>
                Orders
              </Link>
              <button onClick={loginHandler}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </div>
      ) : (
        <Link to="/login">
          <IoLogIn size={28} />
        </Link>
      )}
    </nav>
  );
};

export default Header;
