import Sidebar from "../components/Sidebar";    
import { OrderItemType, OrderType } from '../types';


const orderItems: OrderItemType[] = [
    {
        id: 1,
        name: "Product 1",
        price: 100,
        quantity: 2
    },
    {
        id: 2,
        name: "Product 2",
        price: 200,
        quantity: 1
    },
    {
        id: 3,
        name: "Product 3",
        price: 300,
        quantity: 3
    }
];

const TransactionManagement = () => {
    const [ order , setOrder ] = useState<OrderType[]>([]);
    name: "John Doe",
    address: "123 Main St",
    city : "New York",
    state : "NY",
    country : "USA",
    pincode : 10001,
  status: "Processing",
  discount : 10,
  subtotal: 1000,
  tax: 100,
  total : 1100,

  return (
    <div>
      <Sidebar />
    </div>
  )
}

export default TransactionManagement
