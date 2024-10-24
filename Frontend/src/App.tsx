import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from 'react-hot-toast';
import Header from "./components/User/Header";


import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { userDoesNotExist, userExists } from "./redux/reducer/UserReducer";
import { getUser } from "./redux/api/UserApi";
import { useEffect } from "react";
import { UserReducerInitialState } from "./types/reducer-types";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";

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
  const { user, loading } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUser(user.uid);
        if (userData) {
          dispatch(userExists(userData));
        }
      } else dispatch(userDoesNotExist());
    });
  }, []); 

  if (loading) { 
    return <h1><Loader /></h1>
  }


  return (
    <Router>
      <Suspense>
        <Routes>
          <Route element={<ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role == "admin" ? true : false} />} >
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
          </Route>
          {/* User Routes */}


          <Route path="/login" element={<ProtectedRoute isAuthenticated={user ? false : true}>
            <Login />
          </ProtectedRoute>
          }
          />
          <Route path="/" element={
            <>
              <Header user={user} />
              <UserHome />
            </>
          } />
          <Route element={<ProtectedRoute isAuthenticated={user ? true : false} />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/user/orders" element={<Orders />} />
          </Route>


          <Route path="/search" element={<Search />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;

