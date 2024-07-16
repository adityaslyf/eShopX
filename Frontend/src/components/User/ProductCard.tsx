import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus } from 'react-icons/fa';

interface ProductCardProps {
  name: string;
  price: string;
  rating: string;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, rating, imageUrl }) => {
  const [hovered, setHovered] = useState(false);

  const handleAddToCart = () => {
    toast.success(`${name} added to cart!`);
  };

  return (
    <div
      className="relative bg-white shadow-lg rounded-lg w-72 p-4 flex flex-col items-center border border-gray-200 hover:bg-red-400 transition duration-300 ease-in-out"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
        <div className="w-full h-60 overflow-hidden rounded-t-lg">
        <img
          className="w-full h-full object-cover"
          src={imageUrl}
          alt={name}
        />
      </div>
      <div className="mt-4 w-full flex flex-col items-center text-center">
        <h1 className="text-xl font-semibold text-gray-800">{name}</h1>
        <div className="mt-2 flex justify-between items-center w-full px-4">
          <p className="text-lg text-gray-700">{price}</p>
          <p className="text-lg text-yellow-500">{rating}</p>
        </div>
      </div>
      {hovered && (
        <button
          onClick={handleAddToCart}
          className="absolute inset-0 flex items-center justify-center bg-blue-500 bg-opacity-50 text-white rounded-full w-10 h-10   hover:opacity-40 hover:bg-slate-500 transition duration-300 ease-in-out"
          style={{ marginLeft: 'calc(50% - 20px)', marginTop: 'calc(50% - 20px)' }}
        >
          <FaPlus className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ProductCard;
