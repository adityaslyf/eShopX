import { useState } from "react";
import ProductCard from "../../components/User/ProductCard";

const products = [
  {
    name: "Product 1",
    price: "$10",
    rating: "4.5",
    imageUrl: "https://m.media-amazon.com/images/I/71jG+e7roXL._AC_UY218_.jpg",
  },
  {
    name: "Product 2",
    price: "$20",
    rating: "4.0",
    imageUrl: "https://m.media-amazon.com/images/I/812yohjGZ2L._AC_UY218_.jpg",
  },
  {
    name: "Product 3",
    price: "$30",
    rating: "5.0",
    imageUrl: "https://m.media-amazon.com/images/I/71A68Sti-4L._AC_UY218_.jpg",
  },
  {
    name: "Product 4",
    price: "$40",
    rating: "4.8",
    imageUrl: "https://m.media-amazon.com/images/I/813BY8cbW8L._AC_UY218_.jpg",
  },
  {
    name: "Product 5",
    price: "$50",
    rating: "4.7",
    imageUrl: "https://m.media-amazon.com/images/I/7159GCFgGiL._AC_UY218_.jpg",
  },
];

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("none");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("none");
  const [page, setPage] = useState(1);

  const isPrevPageAvailable = page > 1;
  const isNextPageAvailable = page < 3;

  return (
    <div className="flex p-6 bg-gray-900 min-h-screen text-gray-100 font-sans">
      <aside className="w-1/4 p-4 bg-gray-800 rounded-lg shadow-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 text-purple-300">Filter</h1>
          <select
            name="filter"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="none">None</option>
            <option value="asc">Low to High (Price)</option>
            <option value="desc">High to Low (Price)</option>
          </select>
        </div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 text-purple-300">Category</h1>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="none">None</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
        </div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 text-purple-300">Max Price: ${maxPrice}</h1>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>
      </aside>
      <main className="w-3/4 p-4 ml-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-purple-300">Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-6 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="grid grid-cols-3 gap-4">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              price={product.price}
              rating={product.rating}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
        <article className="flex justify-center mt-12 space-x-5">
          <button
            onClick={() => {
              setPage((prev) => prev - 1);
            }}
            disabled={!isPrevPageAvailable}
            className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition duration-300"
          >
            Prev
          </button>
          <span className="flex items-center text-lg">
            {page} of {3}
          </span>
          <button
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
            disabled={!isNextPageAvailable}
            className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition duration-300"
          >
            Next
          </button>
        </article>
      </main>
    </div>
  );
};  

export default Search;
