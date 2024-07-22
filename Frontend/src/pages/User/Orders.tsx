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
      status: <span className="text-green-500">Completed</span>,
      action: <button className="btn">View</button>,
    },
    {
      _id: "2",
      amount: 200,
      quantity: 3,
      discount: 20,
      status: <span className="text-red-500">Cancelled</span>,
      action: <button className="btn">View</button>,
    },
    {
      _id: "3",
      amount: 300,
      quantity: 4,
      discount: 30,
      status: <span className="text-yellow-500">Pending</span>,
      action: <button className="btn">View</button>,
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
    <main>
      <div className=" p-6">
        {TableComp}
      </div>
    </main>
  );
};

export default Orders;
