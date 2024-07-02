import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { OrderItemType, OrderType } from "../types";
import { Link } from "react-router-dom";

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const orderItems: OrderItemType[] = [
  {
    name: "Puma Shoes",
    photo: img,
    _id: "asdsaasdas",
    quantity: 4,
    price: 2000,
  },
];

const TransactionManagement = () => {
  const [order, setOrder] = useState<OrderType>({
    name: "Abhishek Singh",
    address: "77 Black Street",
    city: "Neyword",
    state: "Nevada",
    country: "India",
    pinCode: 2434341,
    status: "Processing",
    subtotal: 4000,
    discount: 1200,
    shippingCharges: 0,
    tax: 200,
    total: 4000 + 200 + 0 - 1200,
    orderItems,
    _id: "asdnasjdhbn",
  });

  const {
    name,
    address,
    city,
    country,
    state,
    pinCode,
    subtotal,
    shippingCharges,
    tax,
    discount,
    total,
    status,
  } = order;

  const updateHandler = () => {
    setOrder((prev) => ({
      ...prev,
      status: prev.status === "Processing" ? "Shipped" : "Delivered",
    }));
  };

  return (
    <div className="admin-container flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex flex-col lg:flex-row justify-evenly w-full p-4">
        <main className="product-management flex flex-col lg:flex-row gap-4 w-full">
          <section className="w-full lg:w-1/2 bg-gray-100 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Order Items</h2>
            {order.orderItems.map((i) => (
              <ProductCard
                key={i._id}
                name={i.name}
                photo={i.photo}
                _id={i._id}
                quantity={i.quantity}
                price={i.price}
              />
            ))}
          </section>

          <article className="shipping-info-card w-full lg:w-1/2 bg-white p-4 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Order Info</h1>
            <div className="mb-4">
              <h5 className="font-semibold">User Info</h5>
              <p>Name: {name}</p>
              <p>
                Address:{" "}
                {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
              </p>
            </div>

            <div className="mb-4">
              <h5 className="font-semibold">Amount Info</h5>
              <p>Subtotal: {subtotal}</p>
              <p>Shipping Charges: {shippingCharges}</p>
              <p>Tax: {tax}</p>
              <p>Discount: {discount}</p>
              <p>Total: {total}</p>
            </div>

            <div className="mb-4">
              <h5 className="font-semibold">Status Info</h5>
              <p>
                Status:{" "}
                <span
                  className={`${
                    status === "Delivered"
                      ? "text-purple-500"
                      : status === "Shipped"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {status}
                </span>
              </p>
            </div>

            <button
              onClick={updateHandler}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Process Status
            </button>
          </article>
        </main>
      </div>
    </div>
  );
};

const ProductCard = ({ name, photo, price, quantity, _id }: OrderItemType) => (
  <div className="transaction-product-card flex items-center mb-4 p-4 bg-white rounded-lg shadow-lg">
    <img
      src={photo}
      alt={name}
      className="w-16 h-16 object-cover rounded-md mr-4"
    />
    <div className="flex flex-col">
      <Link to={`/product/${_id}`} className="text-blue-500 hover:underline">
        {name}
      </Link>
      <span className="text-gray-700">
        ${price} x {quantity} = ${price * quantity}
      </span>
    </div>
  </div>
);

export default TransactionManagement;
