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
          <Link to="/search" className="text-lg text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
            More
          </Link>
        </div>
        <section className="flex gap-6 justify-center flex-wrap">
          {[1, 2, 3, 4, 5].map((product, index) => (
            <ProductCard key={index} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;