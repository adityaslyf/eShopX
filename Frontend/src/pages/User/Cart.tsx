import { useEffect, useState } from "react";
import CartItem from "../../components/User/CartItem";

const subtotal = 1000;
const shippingcharge = 50;
const tax = Math.floor(subtotal * 0.18);
const discount = 400;
let total = subtotal + shippingcharge + tax;

const Cart = () => {
  const [coupon, setCoupon] = useState<string>("");
  const [isCouponApplied, setIsCouponApplied] = useState<boolean>(false);

  useEffect(() => {
    const TimeOutId = setTimeout(() => {
      if (coupon && Math.random() > 0.5) {
        setIsCouponApplied(true);
      } else {
        setIsCouponApplied(false);
      }
    }, 1000);

    return () => {
      clearTimeout(TimeOutId);
      setIsCouponApplied(false);
    };
  }, [coupon]);

  if (isCouponApplied) {
    total = subtotal + shippingcharge + tax - discount;
  } else {
    total = subtotal + shippingcharge + tax;
  }

  const CartItems = [
    {
      productId: 1,
      name: "Product 1",
      price: 1000,
      quantity: 1,
      image: "https://m.media-amazon.com/images/I/61K2tEQL3OL._AC_UL320_.jpg",
      stock: 2,
    },
    {
      productId: 2,
      name: "Product 2",
      price: 2000,
      quantity: 1,
      image: "https://m.media-amazon.com/images/I/61K2tEQL3OL._AC_UL320_.jpg",
      stock: 2,
    },
    {
      productId: 3,
      name: "Product 3",
      price: 3000,
      quantity: 1,
      image: "https://m.media-amazon.com/images/I/61K2tEQL3OL._AC_UL320_.jpg",
      stock: 2,
    },
  ];

  return (
    <main className=" flex justify-between">
      <section className=" w-[1200px]">
        {CartItems.map((item, index) => (
          <CartItem key={index} cartItem={item} />
        ))}
      </section>

      <div className="min-h-screen flex justify-end mt-28 w-[35em] ">
        <div className="bg-white  rounded-lg p-8 max-w-lg w-full">
          <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
          <div className="mb-4">
            <p className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping Charges:</span>
              <span>₹{shippingcharge}</span>
            </p>
            <p className="flex justify-between">
              <span>Tax:</span>
              <span>₹{tax}</span>
            </p>
            {isCouponApplied && (
              <p className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span>- ₹{discount}</span>
              </p>
            )}
            <p className="flex justify-between font-semibold text-lg mt-4">
              <span>Total:</span>
              <span>₹{total}</span>
            </p>
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Type your coupon here"
              value={coupon}
              onChange={(e) => {
                setCoupon(e.target.value);
              }}
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {coupon &&
            (isCouponApplied ? (
              <p className="text-green-600 mb-4">{discount} discount applied</p>
            ) : (
              <p className="text-red-600 mb-4">Invalid Coupon</p>
            ))}
          <button className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 w-full rounded-md transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
};

export default Cart;
