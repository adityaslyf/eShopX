import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import {Toaster} from 'react-hot-toast';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { userDoesNotExist, userExists } from "./redux/reducer/UserReducer";
import { getUser } from "./redux/api/UserApi";


const Customers = lazy(() => import("./pages/Customers"));
const Products = lazy(() => import("./pages/Products"));
const Transaction = lazy(() => import("./pages/Transaction"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const Home = lazy(() => import("./Home"));
const NewProduct = lazy(() => import("./management/NewProduct"));
const ProuductEdit = lazy(() => import("./management/ProuductEdit"));
const TransactionManagement = lazy(
  () => import("./management/TransactionManagement")
);
const Bar = lazy(() => import("./chart/Barchart"));
const Pie = lazy(() => import("./chart/PieChart"));
const Line = lazy(() => import("./chart/LineChart"));
const Coupon = lazy(() => import("./pages/Coupon"));

const UserHome = lazy(() => import("./pages/User/Home"));
const Cart = lazy(() => import("./pages/User/Cart"));
const Shipping = lazy(() => import("./pages/User/Shipping"));
const Login = lazy(() => import("./pages/User/Login"));
const Search = lazy(() => import("./pages/User/Search"));
const Orders = lazy(() => import("./pages/User/Orders"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
       const data = await getUser(user.uid);
       if(data?.user){
        dispatch(userExists(data.user))
       }
      } else {
      dispatch(userDoesNotExist())
      }
    });
  }, []);

  return (
    <Router>
      {/* <Suspense fallback={<Loader />}> */}
      <Suspense>
        <Routes>
          <Route path="/admin" element={<Sidebar />}>
            <Route index element={<Home />} />
            <Route path="customers" element={<Customers />} />
            <Route path="products" element={<Products />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="charts/bar" element={<Bar />} />
            <Route path="charts/pie" element={<Pie />} />
            <Route path="charts/line" element={<Line />} />
          </Route>
          <Route path="/admin/apps/Coupon" element={<Coupon />} />


          {/* management */}
          <Route path="/admin/products/new" element={<NewProduct />} />
          <Route path="/admin/products/:id" element={<ProuductEdit />} />
          <Route
            path="/admin/transaction/:id"
            element={<TransactionManagement />}
          />

          {/* User Routes */}
          <Route path="/" element={<UserHome />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/user/orders" element={<Orders />} />

        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;

