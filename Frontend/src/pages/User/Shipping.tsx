import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Shipping = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      address,
      city,
      state,
      selectedCountry,
      pincode
    };
    console.log("Form Data: ", formData);
    
  };

  return (
    <main>
      <button
        className="fixed top-4 left-4 p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <section className="flex flex-col items-center space-y-4 mt-32">
        <div className="text-4xl font-serif font-extralight text-gray-500 mb-12">
          SHIPPING ADDRESS
        </div>
        <form className="flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
          <input
            className="border border-black w-96 h-12 hover:border-blue-600 rounded-md p-2"
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            className="border border-black w-96 h-12 hover:border-blue-600 rounded-md p-2"
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            className="border border-black w-96 h-12 hover:border-blue-600 rounded-md p-2"
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <select
            className="border border-black w-96 h-12 hover:border-blue-600 rounded-md p-2"
            value={selectedCountry}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a country
            </option>
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="mx">Mexico</option>
          </select>
          <input
            className="border border-black w-96 h-12 hover:border-blue-600 rounded-md p-2"
            type="number"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
          <button
            type="submit"
            className="border border-gray-950 bg-blue-600 w-96 h-12 rounded-md hover:bg-purple-600"
          >
            Pay Now
          </button>
        </form>
      </section>
    </main>
  );
};

export default Shipping;
