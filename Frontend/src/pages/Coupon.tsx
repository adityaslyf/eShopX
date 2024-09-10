import { useState } from "react";
import { Link } from "react-router-dom";

const Coupon = () => {
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeCharacters, setIncludeCharacters] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [textToInclude, setTextToInclude] = useState("");
  const [codeLength, setCodeLength] = useState(10);

  const generateCouponCode = () => {
    let characters = "";
    if (includeNumbers) characters += "0123456789";
    if (includeCharacters) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (includeSymbols) characters += "!@#$%^&*()_+-=[]{}|;:'\",.<>?/~`";

    if (characters.length === 0) return;

    let result = textToInclude;
    const remainingLength = codeLength - textToInclude.length;

    for (let i = 0; i < remainingLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    setCouponCode(result);
  };

  return (
      <main className="overflow-y-auto w-full">
        <Link to="/admin/apps/Coupon">
          <h1 className="text-3xl font-semibold mx-3 my-4">Coupon</h1>
          <div className="flex flex-col gap-12 w-fit mx-auto justify-center h-[90vh]">
            <div className="flex flex-col">
              <div className="h-12 rounded-md flex gap-5">
                <input
                  type="text"
                  placeholder="Text to include"
                  value={textToInclude}
                  onChange={(e) => setTextToInclude(e.target.value)}
                  className="px-2 py-2 border border-gray-300 h-full w-96 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Number"
                  value={codeLength}
                  onChange={(e) => setCodeLength(Number(e.target.value))}
                  className="px-2 py-1 h-full border border-gray-300 w-44 rounded-md"
                />
              </div>
            </div>

            <form action="">
              <fieldset className="p-4 border border-gray-300 rounded-md">
                <legend className="p-2 m-2 border rounded">Include</legend>
                <div className="flex justify-evenly">
                  <div>
                    <input
                      type="checkbox"
                      id="include1"
                      name="include"
                      className="mx-2"
                      checked={includeNumbers}
                      onChange={() => setIncludeNumbers(!includeNumbers)}
                    />
                    <label htmlFor="include1">Numbers</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="include2"
                      name="include"
                      className="mx-2"
                      checked={includeCharacters}
                      onChange={() => setIncludeCharacters(!includeCharacters)}
                    />
                    <label htmlFor="include2">Characters</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="include3"
                      name="include"
                      className="mx-2"
                      checked={includeSymbols}
                      onChange={() => setIncludeSymbols(!includeSymbols)}
                    />
                    <label htmlFor="include3">Symbols</label>
                  </div>
                </div>
              </fieldset>
            </form>
            <button
              onClick={generateCouponCode}
              className="bg-blue-700 h-12 rounded-md text-white"
            >
              Generate
            </button>
            {couponCode && (
              <div className="mt-4 p-2 bg-gray-100 border border-gray-300 rounded-md">
                <strong>Generated Coupon Code:</strong> {couponCode}
              </div>
            )}
          </div>
        </Link>
      </main>
  );
};

export default Coupon;
