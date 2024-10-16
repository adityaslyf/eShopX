
import { Link } from "react-router-dom";
import Carousel from "../../components/User/Carousel";
import ProductCard from "../../components/User/ProductCard";
import Footer from "../../components/User/Footer";
import { motion } from "framer-motion";
import { useLatestProductsQuery } from "../../redux/api/ProductApi";
import Skeleton from "../../components/Skeleton/index";



const images = [
  "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", // Dark e-commerce concept with shopping cart
  "https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", // Online shopping on laptop at night
  "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80", // Smartphone with e-commerce app in dark setting
  "https://images.unsplash.com/photo-1612103198005-b238154f4590?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80", // Dark themed electronics display
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", // Stylish clothing on dark background
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

  const { data, isLoading } = useLatestProductsQuery("")

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

      <main className="px-8 py-4">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-purple-500 w-1 h-10"></div>
          <h1 className="text-3xl font-bold text-purple-300">CATEGORIES</h1>
        </div>
        <section className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 border border-gray-700 p-4 rounded-md shadow-md transition duration-300 ease-in-out"
            >
              <Link to={`/search?category=${category}`}>
                {category}
              </Link>
            </motion.div>
          ))}
        </section>

        {/* New split layout section */}
        <section className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-2/3 order-2">
            <Carousel images={images} />
          </div>
          <motion.div
            className="w-full md:w-1/3 h-[450px] rounded-lg p-8 flex flex-col justify-center mt-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
              }}
            />

            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

            {/* Content */}
            <div className="relative z-20">
              <motion.h2
                className="text-4xl font-bold text-purple-300 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Summer Sale!
              </motion.h2>
              <motion.p
                className="text-xl mb-6 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Get up to 50% off on selected items. Limited time offer!
              </motion.p>
              <motion.button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.button>
            </div>
          </motion.div>
        </section>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-purple-300">
            Latest Products
          </h1>
          <Link
            to="/search"
            className="text-lg text-purple-400 hover:text-purple-300 transition duration-300 ease-in-out"
          >
            More
          </Link>
        </div>

        <section className="flex gap-6 justify-center flex-wrap mb-12">
          {isLoading ? (
            <Skeleton />
          )
            :
            (
              data?.products?.map((i) => (
                <motion.div
                  key={i._id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ProductCard
                    ProductId={i._id}
                    name={i.name}
                    price={i.price}
                    stock={i.stock}
                    photo={i.photo}
                    category={i.category}
                  />
                </motion.div>
              )
              ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
