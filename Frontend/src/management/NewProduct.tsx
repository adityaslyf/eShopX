import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../types/reducer-types";
import { useNewProductMutation } from "../redux/api/ProductApi";
import toast from "react-hot-toast";

const NewProduct: React.FC = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const [newProduct, { isLoading, isError, isSuccess }] = useNewProductMutation();

  const [formState, setFormState] = useState<{
    name: string;
    price: string;
    stock: string;
    category: string;
    photo: File; // Ensure photo is always a File
  }>({
    name: "",
    price: "",
    stock: "",
    category: "",
    photo: new File([], ""), // Initialize with an empty File
  });


  const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setFormState((prev) => ({
          ...prev,
          photo: file, // Store the actual file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (!user?._id) {
      toast.error("User not authenticated");
      return;
    }
    
    if (!formState.photo.size) {
      toast.error("Please provide a photo");
      return;
    }


    // Create a FormData object to send to the API
    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("price", formState.price);
    formData.append("stock", formState.stock);
    formData.append("category", formState.category); // Add category
    formData.append("photo", formState.photo); // Include the file

    try {
      await newProduct({ formData, id: user?._id }).unwrap(); // Use user ID if needed
      // Reset the form or provide feedback to the user
      setFormState({
        name: "",
        price: "",
        stock: "",
        category: "",
        photo: new File([], ""), // Reset to an empty File
      });
      setSelectedImage(null);
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  }
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col items-center flex-grow p-4 bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">NEW PRODUCT</h2>
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="mb-2">Name</label>
            <input
              required
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="price" className="mb-2">Price</label>
            <input
              required
              type="text"
              id="price"
              name="price"
              value={formState.price}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="stock" className="mb-2">Stock</label>
            <input
              required
              type="text"
              id="stock"
              name="stock"
              value={formState.stock}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="category" className="mb-2">Category</label>
            <input
              required
              type="text"
              id="category"
              name="category"
              value={formState.category}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="photo" className="mb-2">Photo</label>
            <input
              required
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleImageChange}
              className="px-3 py-2 border rounded-md"
            />
            {selectedImage && (
              <img
                src={selectedImage as string}
                alt="Selected"
                className="mt-4 w-36 h-36 text-center rounded-full object-cover"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          {isError && <p className="text-red-500">Error creating product!</p>}
          {isSuccess && <p className="text-green-500">Product created successfully!</p>}
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
