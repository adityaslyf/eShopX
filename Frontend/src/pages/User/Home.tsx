import Header from "../../components/User/Header";
import { Link } from "react-router-dom";
import Carousel from "../../components/User/Carousel";
import ProductCard from "../../components/User/ProductCard";

const images = [
  "https://cdn.pixabay.com/photo/2020/01/30/21/24/shop-4806610_640.jpg",
  "https://cdn.pixabay.com/photo/2016/11/22/21/57/apparel-1850804_640.jpg",
  "https://cdn.pixabay.com/photo/2019/07/13/16/44/woman-4335235_640.jpg",
];

const categories = [
  "Electronics",
  "Mobiles",
  "Laptops",
  "Books",
  "Fashion",
  "Appliances",
  "Furniture",
  "Home Decor",
  "Grocery",
  "Beauty",
  "Toys",
  "Fitness",
];

const products = [
  {
    name: "Product 1",
    price: "$10",
    rating: "4.5",
    imageUrl:
      "https://m.media-amazon.com/images/I/71jG+e7roXL._AC_UY218_.jpg",
  },
  {
    name: "Product 2",
    price: "$20",
    rating: "4.0",
    imageUrl:
      "https://m.media-amazon.com/images/I/812yohjGZ2L._AC_UY218_.jpg",
  },
  {
    name: "Product 3",
    price: "$30",
    rating: "5.0",
    imageUrl:
      "https://m.media-amazon.com/images/I/71A68Sti-4L._AC_UY218_.jpg",
  },
  {
    name: "Product 4",
    price: "$40",
    rating: "4.8",
    imageUrl:
      "https://m.media-amazon.com/images/I/813BY8cbW8L._AC_UY218_.jpg",
  },
  {
    name: "Product 5",
    price: "$50",
    rating: "4.7",
    imageUrl:
      "https://m.media-amazon.com/images/I/7159GCFgGiL._AC_UY218_.jpg",
  },
];

const Home = () => {
  return (
    <div className="h-auto bg-blue-50">
      <Header />
      <main className="px-8 py-4">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-purple-600 w-1 h-10"></div>
          <h1 className="text-3xl font-serif text-gray-800">CATEGORIES</h1>
        </div>
        <section className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category, index) => (
            <Link
              to={`/search?category=${category}`}
              key={index}
              className="bg-white border border-gray-300 p-4 rounded-md shadow-md hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              {category}
            </Link>
          ))}
        </section>
        <section className="mb-8">
          <Carousel images={images} />
        </section>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Latest Products</h1>
          <Link
            to="/search"
            className="text-lg text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
          >
            More
          </Link>
        </div>
        <section className="flex gap-6 justify-center flex-wrap">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              price={product.price}
              rating={product.rating}
              imageUrl={product.imageUrl}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;
