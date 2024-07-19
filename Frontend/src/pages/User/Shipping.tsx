import { useState } from "react";

const Shipping = () => {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="text-4xl font-serif font-extralight text-gray-500 mb-6">
          SHIPPING ADDRESS
        </div>

        <input
          className="border border-black w-96 h-12 mb-4 px-4 hover:border-blue-600"
          type="text"
          placeholder="Address"
        />
        <input
          className="border border-black w-96 h-12 mb-4 px-4 hover:border-blue-600"
          type="text"
          placeholder="City"
        />
        <input
          className="border border-black w-96 h-12 mb-4 px-4 hover:border-blue-600"
          type="text"
          placeholder="State"
        />
        <select
          className="border border-black w-96 h-12 mb-4 px-4 hover:border-blue-600"
          value={selectedCountry}
          onChange={handleChange}
        >
          <option value="" disabled>Select a country</option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="mx">Mexico</option>
        </select>
        <input
          className="border border-black w-96 h-12 px-4 hover:border-blue-600"
          type="number"
          placeholder="Pincode"
        />
      </div>
    </section>
  );
};

export default Shipping;
