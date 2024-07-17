import { useEffect, useState } from "react";

const subtotal = 0;
const shippingcharge = 0;
const tax = Math.floor(subtotal * 0.18);
const discount = 400;
const total = subtotal + shippingcharge + tax - discount;

const Cart = () => {
  const [coupon, setCoupon] = useState<string>("");
  const [isCopounApplied, setIsCopounApplied] = useState<boolean>(false);

  useEffect(() => {
    const TimeOutId = setTimeout(() => {
      if (Math.random() > 0.5) {
        setIsCopounApplied(true);
      } else setIsCopounApplied(false);
    }, 1000);

    return () => {
      clearTimeout(TimeOutId);
    };
  }, [coupon]);

  return (
    <div>
      <section></section>
      <aside className=" flex flex-col items-end p-6 mt-20">
        <p>Subtotal:₹{subtotal}</p>
        <p>Shipping Charges:₹{shippingcharge}</p>
        <p>Tax:₹{tax}</p>
        <p>
          Discount: - <em>₹{discount}</em>
        </p>
        <p>Total:₹{total}</p>
        <div className=" border border-black w-80 h-10">
          <input
            type="text"
            placeholder="Type your coupon here"
            value={coupon}
            onChange={(e) => {
              setCoupon(e.target.value);
            }}
          />
        </div>
        {coupon && 
        (isCopounApplied ? (
          <span className="green">{discount} discount applied</span>
        ) : (
          <span className="red">Invalid Coupon</span>
        ))}
        <button className="bg-blue-700 h-12 w-80 rounded-md text-white ">
          Checkout
        </button>
      </aside>
    </div>
  );
};

export default Cart;
