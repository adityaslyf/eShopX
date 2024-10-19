import { Column } from "react-table";
import Table from "../components/Table";
import { ReactElement, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import "../styles/product.css";
import { useAllProductsQuery } from "../redux/api/ProductApi";
import { server } from "../redux/store";
import toast from "react-hot-toast";
import { CustomError } from "../types/api-types";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../types/reducer-types";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Products = () => {

  const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);

  const [rows, setRows] = useState<DataType[]>([]);
  const {  isError, error, data } = useAllProductsQuery(user?._id!);

  if (isError) {
    toast.error((error as CustomError).data.message);
  }

  useEffect(() => {
    if (data && data.products) {
      setRows(
        data.products.map((i) => ({
          photo: <img src={`${server}/${i.photo}`} alt="Shoes" className="w-20 h-20 object-cover" />,
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/products/${i._id}`} className="text-blue-500 underline">Manage</Link>,
        }))
      );
    } else {
      setRows([]); // Set an empty array when data is undefined or products is not available
    }
  }, [data]);

  // Render the Table HOC directly without useCallback
  const ProductTable = Table<DataType>(columns, rows, "product-container mx-auto p-4", "Products", true);

  return (
    <div className="flex">
      <main className="flex-1 p-6">
        <div className="container mx-auto p-4 shadow-sm rounded-sm ">
          <ProductTable />
        </div>
      </main>
      <Link to="/admin/products/new">
        <FaPlus color="white" size={35} className="bg-green-500 rounded-full m-6 border" />
      </Link>
    </div>
  );
};

export default Products;
