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

const user = {
  _id: "123",
  role: "admin",
};

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const logout = () => {
    setIsOpen(false);
  };

  return (
    <nav className=" flex justify-end p-4 space-x-8 bg-blue-200 rounded-sm static w-full">
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
      {user._id ? (
        <>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <FaUser size={24} />
          </button>
          <dialog open={isOpen}>
            <div>
              {user.role === "admin" && <Link to="/admin/home">Admin</Link>}

              <Link to="/user/orders">Orders</Link>
              <button onClick={(logout)}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to="/login">
          <IoLogIn />
        </Link>
      )}
    </nav>
  );
};

export default Header;
