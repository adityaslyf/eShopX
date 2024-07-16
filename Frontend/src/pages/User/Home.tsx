import Header from "../../components/User/Header";
import { Link } from "react-router-dom";
import Carousel from "../../components/User/Carousel";

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
    <div className="  h-screen">
      <Header />
      <main>
        <div className=" flex p-4">
        <div className=" bg-purple-600 w-1 h-10"></div>
        <h1 className=" text-3xl font-serif text-gray-700 text">CATEGORIES</h1>
        </div>
        <section className="flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <Link
              to={`/search?category=${category}`}
              key={index}
              className="border p-4 rounded-md"
            >
              {category}
            </Link>
          ))}
        </section>
        <section>
          <Carousel images={images} />
        </section>
        <div className=" flex justify-between">
          <h1 className=" text-4xl flex justify-between p-6">Latest Product</h1>
          <Link to="/search" className="text-2xl p-6">
            More
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
