import Sidebar from "../components/Sidebar";
import { LineChart } from "../components/Charts";

const LineChartComp = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="grid grid-cols-1  gap-8">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <LineChart
              data={[4200, 2367, 2762, 6222]}
              labels={["Jan", "Feb", "Mar", "Apr"]}
              label="Products"
              backgroundColor={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
              borderColor={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
            />
            <span className="block text-center mt-4 text-xl font-semibold">
              ACTIVE USERS
            </span>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <LineChart
              data={[4200, 2367, 2762, 6222]}
              labels={["Jan", "Feb", "Mar", "Apr"]}
              label="Products"
              backgroundColor={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
              borderColor={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
            />
            <span className="block text-center mt-4 text-xl font-semibold">
              TOTAL PRODUCTS (SKU)
            </span>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <LineChart
              data={[4200, 2367, 2762, 6222]}
              labels={["Jan", "Feb", "Mar", "Apr"]}
              label="Products"
              backgroundColor={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
              borderColor={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
            />
            <span className="block text-center mt-4 text-xl font-semibold">
              TOTAL REVENUE
            </span>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <LineChart
              data={[4200, 2367, 2762, 6222]}
              labels={["Jan", "Feb", "Mar", "Apr"]}
              label="Products"
              backgroundColor={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
              borderColor={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
            />
            <span className="block text-center mt-4 text-xl font-semibold">
              DISCOUNT ALLOTTED
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LineChartComp;
