import Sidebar from "../components/Sidebar";
import { PieChart } from "../components/Charts";

const PieChartPage = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto space-y-6 w-96 h-96">
          <PieChart
            data={[4200, 2367, 2762, 6222]}
            labels={["Jan", "Feb", "Mar", "Apr"]}
            offset={[0, 0, 0, 4]}
            backgroundColor={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
          />
          <PieChart
            data={[4200, 2367, 2762, 6222]}
            labels={["Jan", "Feb", "Mar", "Apr"]}
            offset={[0, 0, 0, 4]}
            backgroundColor={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
          />
          <PieChart
            data={[4200, 2367, 2762, 6222]}
            labels={["Jan", "Feb", "Mar", "Apr"]}
            offset={[0, 0, 0, 4]}
            backgroundColor={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
          />
          <PieChart
            data={[4200, 2367, 2762, 6222]}
            labels={["Jan", "Feb", "Mar", "Apr"]}
            offset={[0, 0, 0, 4]}
            backgroundColor={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
          />
          <PieChart
            data={[4200, 2367, 2762, 6222]}
            labels={["Jan", "Feb", "Mar", "Apr"]}
            offset={[0, 0, 0, 4]}
            backgroundColor={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
          />
          <PieChart
            data={[4200, 2367, 2762, 6222]}
            labels={["Jan", "Feb", "Mar", "Apr"]}
            offset={[0, 0, 0, 4]}
            backgroundColor={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
          />
        </div>
      </main>
    </div>
  );
};

export default PieChartPage;
