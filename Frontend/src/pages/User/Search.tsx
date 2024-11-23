import { useState, useEffect } from "react";
import ProductCard from "../../components/User/ProductCard";
import { useCategoriesQuery, useSearchProductsQuery } from "../../redux/api/ProductApi";
import toast from "react-hot-toast";
import { CustomError } from "../../types/api-types";

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("none");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("none");
  const [page, setPage] = useState(1);

  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError: isCategoriesError,
    error: categoriesError
  } = useCategoriesQuery("");

  const {
    isLoading: productLoading,
    data: searchData,
    error: searchError,
    isError: isSearchError
  } = useSearchProductsQuery({
    price: maxPrice,
    page,
    category,
    sort,
    search
  });

  useEffect(() => {
    console.log("Search params changed:", { search, sort, maxPrice, category, page });
  }, [search, sort, maxPrice, category, page]);

  useEffect(() => {
    if (categoriesResponse) {
      console.log("Categories loaded:", categoriesResponse);
    }
  }, [categoriesResponse]);

  useEffect(() => {
    if (searchData) {
      console.log("Search data loaded:", searchData);
    }
  }, [searchData]);

  if (isCategoriesError) {
    console.error("Categories error:", categoriesError);
    const err = categoriesError as CustomError;
    toast.error(err.data.message);
  }

  if (isSearchError) {
    console.error("Search error:", searchError);
    const err = searchError as CustomError;
    toast.error(err.data.message);
  }

  const isPrevPageAvailable = page > 1;
  const isNextPageAvailable = searchData ? page < searchData.totalPages : false;

  return (
    <div className="flex flex-col md:flex-row p-3 md:p-6 bg-gray-900 min-h-screen text-gray-100 font-sans gap-4">
      <aside className="w-full md:w-1/4 p-4 bg-gray-800 rounded-lg shadow-lg h-fit">
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-bold mb-2 text-purple-300">Filter</h1>
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
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-bold mb-2 text-purple-300">Category</h1>
          <select
            name="category"
            value={category}
            onChange={(e) => {
              console.log("Category changed:", e.target.value);
              setCategory(e.target.value);
            }}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="none">ALL</option>
            {
              !loadingCategories && categoriesResponse?.categories.map((i) =>
                (<option value={i} key={i}>{i.toUpperCase()}</option>)
              )
            }
          </select>
        </div>
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-bold mb-2 text-purple-300">Max Price: ${maxPrice}</h1>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => {
              console.log("Max price changed:", e.target.value);
              setMaxPrice(Number(e.target.value));
            }}
            className="w-full accent-purple-500"
          />
        </div>
      </aside>
      <main className="w-full md:w-3/4 p-4 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-purple-300">Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => {
            console.log("Search changed:", e.target.value);
            setSearch(e.target.value);
          }}
          className="w-full p-2 mb-6 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {productLoading ? (
          <p className="text-center">Loading products...</p>
        ) : isSearchError ? (
          <p className="text-center text-red-400">Error loading products. Please try again.</p>
        ) : searchData && searchData.products ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchData.products.map((product) => (
              <ProductCard
                key={product._id}
                name={product.name}
                price={product.price}
                stock={product.stock}
                photo={product.photo}
                category={product.category}
                ProductId={product._id}
              />
            ))}
          </div>
        ) : (
          <p className="text-center">No products found.</p>
        )}

        <article className="flex justify-center mt-8 md:mt-12 space-x-3 md:space-x-5">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={!isPrevPageAvailable}
            className="px-3 md:px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition duration-300 text-sm md:text-base"
          >
            Prev
          </button>
          <span className="flex items-center text-base md:text-lg">
            {page} of {searchData ? searchData.totalPages : 1}
          </span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!isNextPageAvailable}
            className="px-3 md:px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition duration-300 text-sm md:text-base"
          >
            Next
          </button>
        </article>
      </main>
    </div>
  );
};

export default Search;