import { useState } from "react";
import { Outlet } from 'react-router-dom'
import { MdDashboard, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { AiFillCustomerService } from "react-icons/ai";
import {
  FaChartBar,
  FaChartPie,
  FaChartLine,
  FaCartPlus,
} from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { RiCoupon2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (

    <div className=" flex">
      <button className="md:hidden p-4" onClick={toggleSidebar}>
        <FaCartPlus />
      </button>
      <div
        className={`bg-gray-700  text-white flex flex-col shadow-2xl w-fit pr-14 h-screen space-y-6 font-serif transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out md:block hidden`}
      >
        <div className="m-4">
          <FaCartPlus className="size-11" />
        </div>
        <div className="flex flex-col m-8 space-y-9">
          {/* first col*/}
          <div className="flex flex-col">
            <div className="font-light text-xl">DASHBOARD</div>
            <div className="flex flex-col text-lg p-4 space-y-4">
              <Link to="/admin">
                <div className="flex gap-3 items-center">
                  <MdDashboard />
                  <div>Dashboard</div>
                </div>
              </Link>
              <Link to="/admin/products">
                <div className="flex gap-3 items-center">
                  <MdOutlineProductionQuantityLimits />
                  <div>Products</div>
                </div>
              </Link>
              <Link to="/admin/customers">
                <div className="flex gap-3 items-center">
                  <AiFillCustomerService />
                  <div>Customers</div>
                </div>
              </Link>
              <Link to="/admin/transaction">
                <div className="flex gap-3 items-center">
                  <GrTransaction />
                  <div>Transaction</div>
                </div>
              </Link>
            </div>
          </div>
          {/* 2nd col*/}
          <div className="flex flex-col m-2">
            <div className="font-light">CHARTS</div>
            <div className="flex flex-col p-4 space-y-4">
              <Link to="/admin/charts/bar">
                <div className="flex gap-3 items-center">
                  <FaChartBar />
                  <div>Bar</div>
                </div>
              </Link>
              <Link to="/admin/charts/pie">
                <div className="flex gap-3 items-center">
                  <FaChartPie />
                  <div>Pie</div>
                </div>
              </Link>
              <Link to="/admin/charts/line">
                <div className="flex gap-3 items-center">
                  <FaChartLine />
                  <div>Line</div>
                </div>
              </Link>
            </div>
          </div>
          {/* third col*/}
          <div className="flex flex-col m-2">
            <div className="font-light">APPS</div>
            <div className="flex flex-col p-4">
              <Link to="/admin/apps/coupon">
                <div className="flex gap-3 items-center">
                  <RiCoupon2Fill />
                  <div>Coupon</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-screen">
        <Outlet />
      </div>
    </div>

  );
};

export default Sidebar;
