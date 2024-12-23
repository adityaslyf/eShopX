import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { auth } from '../../firebase'; 
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLoginMutation } from '../../redux/api/UserApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { MessageResponse } from '../../types/api-types';
import { useDispatch } from 'react-redux';
import { userExists } from '../../redux/reducer/UserReducer';
import { getUser } from '../../redux/api/UserApi';

const Login = () => {
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const loginHandler = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      if (!user.email) {
        toast.error('Please use a valid email to login');
        return;
      }
  
      const res = await login({
        email: user.email,
        name: user.displayName || '',
        photo: user.photoURL || '',
        gender,
        role: 'user',
        dob,
        _id: user.uid,
        createdAt: new Date().toISOString(), // Add these fields
        updatedAt: new Date().toISOString()
      });
  
  
      console.log("Login API Response:", res);
  
      if ("data" in res) {
        if (res.data?.success) {
          toast.success(res.data.message);
          const userData = await getUser(user.uid);
          if (userData) {
            dispatch(userExists(userData));
            navigate('/');
          }
        }
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error('Login failed');
    }
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
            onClick={loginHandler}
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