import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const NewProduct: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    stock: "",
    photo: "",
  });
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setFormState({
          ...formState,
          photo: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
    // Add form submission logic here
  };

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
            <label htmlFor="name" className="mb-2">
              Name
            </label>
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
            <label htmlFor="price" className="mb-2">
              Price
            </label>
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
            <label htmlFor="stock" className="mb-2">
              Stock
            </label>
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
            <label htmlFor="photo" className="mb-2">
              Photo
            </label>
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
                className="mt-4  w-36 h-36 text-center rounded-full object-cover"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
