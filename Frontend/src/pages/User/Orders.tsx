import { ReactElement } from "react";
import Table from "../../components/Table";
import { Column } from "react-table";
import { useState } from "react";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "Order ID",
    accessor: "_id",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];


const Orders = () => {
    const [rows] = useState<DataType[]>([
      {
        _id: "1",
        amount: 100,
        quantity: 2,
        discount: 10,
        status: <span className="text-green-400">Completed</span>,
        action: <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded transition-colors">View</button>,
      },
      {
        _id: "2",
        amount: 200,
        quantity: 3,
        discount: 20,
        status: <span className="text-red-400">Cancelled</span>,
        action: <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded transition-colors">View</button>,
      },
      {
        _id: "3",
        amount: 300,
        quantity: 4,
        discount: 30,
        status: <span className="text-yellow-400">Pending</span>,
        action: <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded transition-colors">View</button>,
      },
    ]);
  
    const TableComp = Table<DataType>(
      column,
      rows,
      "dashboard-product-box",
      "Orders",
      true
    )();
  
    return (
      <main className="bg-gray-900 min-h-screen text-gray-400 font-sans">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-purple-300">Orders</h1>
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {TableComp}
          </div>
        </div>
      </main>
    );
  };

export default Orders;
