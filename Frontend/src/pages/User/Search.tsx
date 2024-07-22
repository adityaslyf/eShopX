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



  
  return (
    <div className="flex p-6 bg-gray-100 min-h-screen">
      <aside className="w-1/4 p-4 bg-white rounded-lg shadow-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Filter</h1>
          <select
            name="filter"
            className="w-full p-2 border border-gray-300 rounded-lg"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="none">None</option>
            <option value="asc">Low to High (Price)</option>
            <option value="desc">High to Low (Price)</option>
          </select>
        </div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Category</h1>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="none">None</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
        </div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Max Price: ${maxPrice}</h1>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </aside>
      <main className="w-3/4 p-4 ml-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-6 border border-gray-300 rounded-lg"
        />
        <div className="grid grid-cols-3 gap-4">
          {/* Replace with dynamic product card rendering based on your data */}
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
      </main>
    </div>
  );
};

export default Search;
