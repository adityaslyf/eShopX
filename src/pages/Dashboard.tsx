import { CiSearch } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa";
import ProfileImage from "../assets/profile.png";
import {
  HiMiniArrowTrendingDown,
  HiOutlineArrowTrendingUp,
} from "react-icons/hi2";
import data from '../assets/data.json'
import { BarChart } from "../components/Charts";
const Dashboard = () => {
  return (
    <div className="dashboard bg-gray-100  h-screen w-full font-serif overflow-y-auto">
      <div className="navbar flex items-center justify-between shadow-xl h-16 p-2 m-2">
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
      <div className="widgetcontainer flex flex-wrap justify-center mt-4 m-6 md:flex-row md:justify-between gap-3">
        <WidgetItem
          heading="Revenue"
          value={650000}
          percentage={50}
          color="green"
          amount={true}
        />

        <WidgetItem
          heading="Revenue"
          value={650000}
          percentage={40}
          color="blue"
          amount={true}
        />
        <WidgetItem
          heading="Revenue"
          value={650000}
          percentage={40}
          color="green"
          amount={true}
        />
        <WidgetItem
          heading="Revenue"
          value={650000}
          percentage={40}
          color="green"
          amount={true}
        />
      </div>

      <section className="p-4">
        <div className="graph-container flex flex-col lg:flex-row gap-4 justify-evenly">
          <div className="revenue-chart bg-slate-400 h-auto shadow-lg w-full lg:w-5/6 p-4">
            <span className="flex justify-center text-white text-lg md:text-xl p-6">
              REVENUE & TRANSACTION
            </span>
            {/* Graph here */}
            <BarChart
              data_1={[4200 ,2367,2762,6222]}
              data_2={[4578 ,6568,6744,3344,3346]}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="green"
              bgColor_2="blue"
             />
          </div>

          <div className="dashboard-inventory bg-slate-600 flex flex-col justify-center w-full lg:w-1/4 h-auto lg:h-[640px] space-y-5 shadow-lg p-4">
            <span className="text-center text-white text-xl md:text-2xl font-light">
              INVENTORY
            </span>
            <div className="categories overflow-auto flex flex-col space-y-2">
              {data.categories.map((i) => (
                <CategoriesItem
                  key={i.heading}
                  heading={i.heading}
                  value={i.value}
                  color="green"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface WidgetItemProps {
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
}: WidgetItemProps) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <article className="widget w-64 h-36 p-6 shadow-lg bg-white rounded-md flex justify-between ">
      <div className="widgetInfo">
        <h1>{heading}</h1>
        <p>{amount ? `$${value}` : value}</p>
        {percentage > 0 ? (
          <div className="flex">
            <span style={{ color }} className="flex items-center">
              <HiOutlineArrowTrendingUp /> +{percentage}%
            </span>
          </div>
        ) : (
          <span className="text-red-500 flex items-center">
            <HiMiniArrowTrendingDown /> {percentage}%
          </span>
        )}
      </div>
      <div className="relative flex items-center justify-center">
        <svg className="w-16 h-16">
          <circle
            className="text-gray-300"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
          />
          <circle
            className={`text-${color}-500`}
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
          />
        </svg>
        <span className={`absolute text-${color}-500`}>{percentage}%</span>
      </div>
    </article>
  );
};

interface CategoriesItemProps {
  heading: string;
  value: number;
  color: string;
}
const CategoriesItem = ({ heading, value, color }: CategoriesItemProps) => {
  return (
    <div className="category-item flex font-extralight opacity-85 gap-6 ">
      <span>{heading}</span>
      <div className="w-2/3 h-4 bg-white border border-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full "
          style={{
            backgroundColor: color,
            width: `${value}%`,
          }}
        ></div>
      </div>
      <span>{value}%</span>
    </div>
  );
};

export default Dashboard;
