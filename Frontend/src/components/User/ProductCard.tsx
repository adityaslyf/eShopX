
interface ProductCardProps {
name : string;
price : string;
rating : string;
imageUrl : string;
}

const ProductCard: React.FC<ProductCardProps> = ({name , price ,rating , imageUrl}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg w-72 p-4 flex flex-col items-center border border-gray-200">
      <img
        className="w-full h-72 object-cover rounded-t-lg"
        src={imageUrl}
        alt={name}
      />
      <div className="mt-4 w-full flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
        <div className="mt-2 flex justify-between items-center w-full px-4">
          <p className="text-lg font-medium text-gray-700">{price}</p>
          <p className="text-lg font-medium text-yellow-500">{rating}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
