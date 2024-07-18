import { Link } from "react-router-dom";

interface CartItemProps {
  cartItem: any;
}

const CartItem = ({ cartItem }: CartItemProps) => {
  const { image, name, price, quantity, productId, stock } = cartItem;

  return (
    <div className="flex items-center justify-between  rounded-lg p-4 mb-4 h-auto">
      <img src={image} alt={name} className="w-52 h-44  rounded-md " />
      <div className="flex flex-col ml-4 flex-1">
        <Link to={`/product/${productId}`} className="text-xl font-semibold text-blue-600 hover:underline">
          {name}
        </Link>
        <div className="flex justify-between mt-2">
          <p className="text-gray-500">Price: ₹{price}</p>
          <p className="text-gray-500">Stock: {stock}</p>
        </div>
        <div className="flex items-center mt-2">
          <button className="bg-green-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-green-600 transition-colors">
            +
          </button>
          <p className="text-gray-500 mx-2">{quantity}</p>
          <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors">
            -
          </button>
        </div>
      </div>
      <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors ml-4">
        Remove
      </button>
    </div>
  );
};

export default CartItem;
