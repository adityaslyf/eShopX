import { BarChart } from "../components/Charts";
import Sidebar from "../components/Sidebar";

const Bar = () => {
  return (
    <main className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto">
          <span className="block text-xl font-semibold mb-4">Bar Chart</span>
          <div className="w-full bg-neutral-100 h-[70vh] mb-6 p-4 rounded-lg shadow-lg">
            <BarChart
              data_1={[4200, 2367, 2762, 6222]}
              data_2={[4578, 6568, 6744, 3344, 3346]}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="green"
              bgColor_2="blue"
            />
          </div>
          <span className="block text-xl font-semibold mb-4">
            TOP SELLING PRODUCTS & TOP CUSTOMERS
          </span>
          <div className="w-full bg-neutral-100 h-[70vh] mb-6 p-4 rounded-lg shadow-lg">
            <BarChart
              horizontal={true}
              data_1={[4200, 2367, 2762, 6222 ,567 , 778,990]}
              data_2={[]}
              title_1="Revenue"
              title_2=""
              bgColor_1="green"
              bgColor_2=""
            />
          </div>
          <span className="block text-xl font-semibold">
            ORDERS THROUGHOUT THE YEAR
          </span>
        </div>
      </div>
    </main>
  );
};

export default Bar;
