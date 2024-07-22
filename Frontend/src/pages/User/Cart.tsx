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
    <main className="flex justify-between bg-gray-900 text-gray-100 min-h-screen p-6 font-sans">
      <section className="w-2/3 pr-6">
        {CartItems.map((item, index) => (
          <CartItem key={index} cartItem={item} />
        ))}
      </section>

      <div className="w-1/3">
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-semibold mb-6 text-purple-300">Shopping Cart</h1>
          <div className="mb-4 space-y-2">
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
              <p className="flex justify-between text-green-400">
                <span>Discount:</span>
                <span>- ₹{discount}</span>
              </p>
            )}
            <p className="flex justify-between font-semibold text-lg mt-4 text-purple-300">
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
              className="bg-gray-700 border border-gray-600 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100"
            />
          </div>
          {coupon &&
            (isCouponApplied ? (
              <p className="text-green-400 mb-4">{discount} discount applied</p>
            ) : (
              <p className="text-red-400 mb-4">Invalid Coupon</p>
            ))}
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 w-full rounded-md transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
};


export default Cart;
