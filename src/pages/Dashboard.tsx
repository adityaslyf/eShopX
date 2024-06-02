// Dashboard.tsx
import { CiSearch } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa";
import ProfileImage from "../assets/profile.png";
import {
  HiMiniArrowTrendingDown,
  HiOutlineArrowTrendingUp,
} from "react-icons/hi2";
import data from "../assets/data.json";
import { BarChart, DoughnutChart } from "../components/Charts";
import { BiMaleFemale } from "react-icons/bi";
import DashboardTable from "../components/DashboardTable";

const Dashboard = () => {
  return (
    <div className="dashboard bg-gray-100 h-screen w-full font-serif overflow-y-auto">
      <div className="navbar bg-white flex items-center justify-between shadow-xl h-16 p-2 m-2 rounded-lg">
        <div className="left_bar flex items-center m-5 gap-3">
          <CiSearch />
          <input
            type="text"
            className="bg-gray-50 ml-2 w-full rounded-md px-2 py-1"
            placeholder="Search for data, user, docs"
          />
        </div>
        <div className="side_component flex items-center gap-3 m-5">
          <FaRegBell size={22} />
          <img className="w-10 h-10 rounded-full" src={ProfileImage} alt="" />
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
          heading="Expenses"
          value={300000}
          percentage={20}
          color="red"
          amount={true}
        />
        <WidgetItem
          heading="Profit"
          value={350000}
          percentage={30}
          color="blue"
          amount={true}
        />
        <WidgetItem
          heading="Growth"
          value={10}
          percentage={10}
          color="purple"
          amount={false}
        />
      </div>

      <section className="p-4">
        <div className="graph-container flex flex-col lg:flex-row gap-4 justify-evenly">
          <div className="revenue-chart bg-white h-auto shadow-lg w-full lg:w-5/6 p-6 rounded-lg">
            <span className="flex justify-center text-gray-700 text-lg md:text-xl mb-4">
              REVENUE & TRANSACTION
            </span>
            <BarChart
              data_1={[4200, 2367, 2762, 6222]}
              data_2={[4578, 6568, 6744, 3344, 3346]}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="green"
              bgColor_2="blue"
            />
          </div>

          <div className="dashboard-inventory bg-white flex flex-col justify-center w-full lg:w-1/4 h-auto lg:h-[665px] space-y-5 shadow-lg p-6 rounded-lg">
            <span className="text-center text-gray-700 text-xl md:text-2xl font-light">
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

      <section className="transaction_container">
        <div className="chart_table flex flex-col md:flex-row justify-between m-6">
          <div className="chart relative w-full max-w-[25rem] shadow-xl h-[25rem] bg-white rounded-lg p-6">
            <h1 className="text-center text-2xl text-gray-700 mb-4">
              GENDER RATIO
            </h1>
            <div className="absolute inset-0 flex items-center justify-center m-4">
              <BiMaleFemale size={32} className=" absolute top-32 text-gray-700" />
              <div className=" w-72 h-72 mt-6 ">
                <DoughnutChart
                  data={[40, 60]}
                  labels={["Female", "Male"]}
                  backgroundColor={["Pink", "#36A2EB"]}
                  cutout={80}
                />
              </div>
            </div>
          </div>
          <div className="transaction_table w-full mt-6 m-2 md:mt-0 bg-white rounded-lg p-6 shadow-lg">
            <DashboardTable data={data.transaction} />
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
    <article className="widget w-64 h-36 p-6 shadow-lg bg-white rounded-md flex justify-between">
      <div className="widgetInfo">
        <h1 className="text-gray-700">{heading}</h1>
        <p className="text-gray-700">{amount ? `$${value}` : value}</p>
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
    <div className="category-item flex font-extralight opacity-85 gap-6">
      <span className="text-gray-700">{heading}</span>
      <div className="w-2/3 h-4 bg-gray-200 border border-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            backgroundColor: color,
            width: `${value}%`,
          }}
        ></div>
      </div>
      <span className="text-gray-700">{value}%</span>
    </div>
  );
};

export default Dashboard;
