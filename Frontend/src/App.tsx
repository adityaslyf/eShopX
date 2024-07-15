import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
// import Loader from "./components/Loader";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Customers = lazy(() => import("./pages/Customers"));
const Products = lazy(() => import("./pages/Products"));
const Transaction = lazy(() => import("./pages/Transaction"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const Home = lazy(() => import("./Home"));
const NewProduct = lazy(() => import("./management/NewProduct"));
const ProuductEdit = lazy(() => import("./management/ProuductEdit"));
const TransactionManagement = lazy(() => import("./management/TransactionManagement"));
const Bar = lazy(() => import("./chart/Barchart"));
const Pie = lazy(() => import("./chart/PieChart"));
const Line = lazy(() => import("./chart/LineChart"));

const App = () => {
  return (
    <Router>
      {/* <Suspense fallback={<Loader />}> */}
      <Suspense>             
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/transaction" element={<Transaction />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/admin/charts/bar" element={<Bar />} />
          <Route path="/admin/charts/pie" element={<Pie />} />
          <Route path="/admin/charts/line" element={<Line />} />

          {/* management */}
          <Route path="/admin/products/new" element={<NewProduct />} />
          <Route path="/admin/products/:id" element={<ProuductEdit />} />
          <Route path="/admin/transaction/:id" element={<TransactionManagement />} />


        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
