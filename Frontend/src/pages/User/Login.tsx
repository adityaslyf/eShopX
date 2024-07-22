import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log('Google login clicked');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-12 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Login</h1>
        <form className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-600 mb-2">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 mt-1 text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
            >
              <option value="" disabled>Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-600 mb-2">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 mt-1 text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
            />
          </div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white py-3 rounded-lg flex items-center justify-center text-lg font-semibold hover:from-yellow-500 hover:to-pink-600 transition duration-300"
          >
            <FaGoogle className="mr-2 text-2xl" /> Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;