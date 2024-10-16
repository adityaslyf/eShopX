const ProductCardSkeleton = () => {
    return (
      <div className="relative bg-gray-800 shadow-lg rounded-lg w-72 p-4 flex flex-col items-center border border-gray-700 animate-pulse">
        <div className="w-full max-w-96 overflow-hidden rounded-md bg-gray-700 h-60"></div>
        <div className="mt-4 w-full flex flex-col items-center text-center space-y-2">
          <div className="h-6 bg-gray-700 rounded w-3/4"></div>
          <div className="mt-2 flex justify-between items-center w-full px-4">
            <div className="h-6 bg-gray-700 rounded w-1/3"></div>
            <div className="h-6 bg-gray-700 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductCardSkeleton;
  