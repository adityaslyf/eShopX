import { Column } from "react-table";
import Table from "../components/Table";
import { ReactElement, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import "../styles/product.css";

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

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";
const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg";

const arr: DataType[] = [
  {
    photo: <img src={img} alt="Shoes" className="w-20 h-20 object-cover" />,
    name: "Puma Shoes Air Jordan 2023",
    price: 690,
    stock: 3,
    action: (
      <Link to="/admin/products/:id" className="text-blue-500 underline">
        Manage
      </Link>
    ),
  },
  {
    photo: (
      <img src={img2} alt="Shoes" className="w-20 h-20 object-cover p-2" />
    ),
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: (
      <Link
        to="/admin/product/sdaskdnkasjdn"
        className="text-blue-500 underline"
      >
        Manage
      </Link>
    ),
  },
  {
    photo: <img src={img} alt="Shoes" className="w-20 h-20 object-cover" />,
    name: "Puma Shoes Air Jordan 2023",
    price: 690,
    stock: 3,
    action: (
      <Link to="/admin/product/sajknaskd" className="text-blue-500 underline">
        Manage
      </Link>
    ),
  },
  {
    photo: (
      <img src={img2} alt="Shoes" className="w-20 h-20 object-cover p-2" />
    ),
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: (
      <Link
        to="/admin/product/sdaskdnkasjdn"
        className="text-blue-500 underline"
      >
        Manage
      </Link>
    ),
  },

  {
    photo: <img src={img} alt="Shoes" className="w-20 h-20 object-cover" />,
    name: "Puma Shoes Air Jordan 2023",
    price: 690,
    stock: 3,
    action: (
      <Link to="/admin/product/sajknaskd" className="text-blue-500 underline">
        Manage
      </Link>
    ),
  },
  {
    photo: (
      <img src={img2} alt="Shoes" className="w-20 h-20 object-cover p-2" />
    ),
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: (
      <Link
        to="/admin/product/sdaskdnkasjdn"
        className="text-blue-500 underline"
      >
        Manage
      </Link>
    ),
  },
  {
    photo: <img src={img} alt="Shoes" className="w-20 h-20 object-cover" />,
    name: "Puma Shoes Air Jordan 2023",
    price: 690,
    stock: 3,
    action: (
      <Link to="/admin/product/sajknaskd" className="text-blue-500 underline">
        Manage
      </Link>
    ),
  },
  {
    photo: (
      <img src={img2} alt="Shoes" className="w-20 h-20 object-cover p-2" />
    ),
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: (
      <Link
        to="/admin/product/sdaskdnkasjdn"
        className="text-blue-500 underline"
      >
        Manage
      </Link>
    ),
  },

  {
    photo: <img src={img} alt="Shoes" className="w-20 h-20 object-cover" />,
    name: "Puma Shoes Air Jordan 2023",
    price: 690,
    stock: 3,
    action: (
      <Link to="/admin/product/sajknaskd" className="text-blue-500 underline">
        Manage
      </Link>
    ),
  },
  {
    photo: (
      <img src={img2} alt="Shoes" className="w-20 h-20 object-cover p-2" />
    ),
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: (
      <Link
        to="/admin/product/sdaskdnkasjdn"
        className="text-blue-500 underline"
      >
        Manage
      </Link>
    ),
  },
  {
    photo: <img src={img} alt="Shoes" className="w-20 h-20 object-cover" />,
    name: "Puma Shoes Air Jordan 2023",
    price: 690,
    stock: 3,
    action: (
      <Link to="/admin/product/sajknaskd" className="text-blue-500 underline">
        Manage
      </Link>
    ),
  },
  {
    photo: (
      <img src={img2} alt="Shoes" className="w-20 h-20 object-cover p-2" />
    ),
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: (
      <Link
        to="/admin/product/sdaskdnkasjdn"
        className="text-blue-500 underline"
      >
        Manage
      </Link>
    ),
  },
];

const Products = () => {
  const [data] = useState<DataType[]>(arr);

  const table = useCallback(
    Table<DataType>(
      columns,
      data,
      "product-container mx-auto p-4",
      "Products",
      true
    ),
    [data]
  );

  return (
    <div className="flex">
      <main className="flex-1 p-6">
        <div className="container mx-auto p-4 shadow-sm rounded-sm ">
          {table()}
        </div>
      </main>
      <Link to="/admin/products/new">
        <FaPlus
          color="white"
          size={35}
          className="  bg-green-500 rounded-full m-6 border b"
        />
      </Link>
    </div>
  );
};

export default Products;
