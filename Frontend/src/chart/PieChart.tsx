
import { PieChart } from "../components/Charts";

const PieChartPage = () => {
  return (
    <main className="flex-1 overflow-y-auto p-4">
      <div className=" text-3xl font-bold">Pie & Doughnut Charts</div>
      <div className="container mx-auto space-y-6 w-96 h-96">
        <PieChart
          data={[4200, 2367, 2762, 6222]}
          labels={["Jan", "Feb", "Mar", "Apr"]}
          offset={[0, 0, 0, 4]}
          backgroundColor={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
        />
        <span className=" text-2xl font-sans">ORDER FULFILLMENT RATIO</span>
        <PieChart
          data={[4200, 2367, 2762, 6222]}
          labels={["Jan", "Feb", "Mar", "Apr"]}
          offset={[0, 0, 0, 4]}
          backgroundColor={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
        />
        <span className=" text-2xl">PRODUCT CATEGORIES RATIO</span>
        <PieChart
          data={[4200, 2367, 2762, 6222]}
          labels={["Jan", "Feb", "Mar", "Apr"]}
          offset={[0, 0, 0, 4]}
          backgroundColor={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
        />
        <span className=" text-2xl ">STOCK AVAILABILITY</span>
        <PieChart
          data={[4200, 2367, 2762, 6222]}
          labels={["Jan", "Feb", "Mar", "Apr"]}
          offset={[0, 0, 0, 4]}
          backgroundColor={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
        />
        <span className=" text-2xl">REVENUE DISTRIBUTION</span>
        <PieChart
          data={[4200, 2367, 2762, 6222]}
          labels={["Jan", "Feb", "Mar", "Apr"]}
          offset={[0, 0, 0, 4]}
          backgroundColor={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
        />
        <span className=" text-2xl">
          USERS AGE GROUP
        </span>
        <PieChart
          data={[4200, 2367, 2762, 6222]}
          labels={["Jan", "Feb", "Mar", "Apr"]}
          offset={[0, 0, 0, 4]}
          backgroundColor={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
        />
        <div className=" flex justify-evenly ">
          <span className=" bg-pink-700 w-26 h-8 rounded-lg p-2">Admin</span>
          <span className=" bg-pink-700 w-26 h-8 rounded-lg p-2">Customers</span>
        </div>
      </div>
    </main>

  );
};

export default PieChartPage;
