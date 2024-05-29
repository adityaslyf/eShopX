import { CiSearch } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa";
import ProfileImage from "../assets/profile.png";
import {
  HiMiniArrowTrendingDown,
  HiOutlineArrowTrendingUp,
} from "react-icons/hi2";
const Dashboard = () => {
  return (
    <div className="dashboard bg-gray-100 h-auto">
      <div className="navbar flex items-center justify-between shadow-xl h-16">
        <div className="left_bar flex items-center m-5 gap-3">
          <CiSearch />
          <input
            type="text"
            className="bg-gray-50 ml-2 w-full"
            placeholder="Search for data, user, docs"
          />
        </div>
        <div className="side_component flex items-center gap-3 m-5">
          <FaRegBell size={22} />
          <img className=" w-10 h-10" src={ProfileImage} alt="" />
        </div>
      </div>
      <div className="widgetcontainer">
        {/* <div className="cards">
          <div className="card shadow-xl w-56  h-44 rounded-lg m-6">
            <span>Revenue</span>
            <span>$650000</span>
            <HiMiniArrowTrendingUp />
            <span>+40%</span>
          </div>
        </div> */}
        <WidgetItem
          heading="Revenue"
          value={650000}
          percentage={40}
          color="bg-green-500"
          amount={true}
        />
        
      </div>
    </div>
  );
};

interface widgetItemProps {
  heading: string;
  value: number;
  percentage: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  percentage,
  color,
  amount,
}: widgetItemProps) => (
  <article className="widget">
    <div className="widgetInfo">
      <h1>{heading}</h1>
      <p>{amount ? `$${value}` : value}</p>
      {percentage > 0 ? (
        <span className={`text-${color}`}>
          <HiOutlineArrowTrendingUp /> +{percentage}%
        </span>
      ) : (
        <span className="text-red-500">
          <HiMiniArrowTrendingDown /> {percentage}%
        </span>
      )}
    </div>
  </article>
);

export default Dashboard;
