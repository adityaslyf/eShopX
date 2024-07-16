

const ProductCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg w-72 p-4 flex flex-col items-center border border-gray-200">
      <img
        className="w-full h-72 object-cover rounded-t-lg"
        src="https://cdn.pixabay.com/photo/2021/07/10/15/45/online-shop-6401739_640.png"
        alt="product"
      />
      <div className="mt-4 w-full flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold text-gray-800">Product Name</h1>
        <div className="mt-2 flex justify-between items-center w-full px-4">
          <p className="text-lg font-medium text-gray-700">Price</p>
          <p className="text-lg font-medium text-yellow-500">Rating</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
