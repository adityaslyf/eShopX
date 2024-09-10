import { ReactElement, useCallback, useState } from "react";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import { Column } from "react-table";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  role: string;
  genger: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
  
];

const img = "https://randomuser.me/api/portraits/women/54.jpg";
const img2 = "https://randomuser.me/api/portraits/women/50.jpg";

const arr: DataType[] = [
 {
    avatar: (<img src={img} alt="Avatar" className="w-20 h-20 object-cover" />),
    name: "John Doe",
    email: "a@gmail.com", 
    role: "Admin",
    genger:"male",
    action: <button className="text-blue-500 underline">Manage</button>,
  }, 
  {
    avatar: (<img src={img2} alt="Avatar" className="w-20 h-20 object-cover" />),
    name: "John Doe",
    email: "a@gmail.com", 
    role: "Admin",
    genger:"male",
    action: <button className="text-blue-500 underline">Manage</button>,
  }, 
  {
    avatar: (<img src={img} alt="Avatar" className="w-20 h-20 object-cover" />),
    name: "John Doe",
    email: "a@gmail.com", 
    role: "Admin",
    genger:"male",
    action: <button className="text-blue-500 underline">Manage</button>,
  }, 
  {
    avatar: (<img src={img2} alt="Avatar" className="w-20 h-20 object-cover" />),
    name: "John Doe",
    email: "a@gmail.com",
    role: "Admin",
    genger:"male",
    action: <button className="text-blue-500 underline">Manage</button>,
  }, 
];

const Customers = () => {
  const [data] = useState<DataType[]>(arr);

  const table = useCallback(
    Table<DataType>(columns, data, " customer-container", "customers" , true),
    []
  );

  return (
    <div className=" flex">
      <div className=" w-full p-2">{table()}</div>
    </div>
  );
};

export default Customers;
