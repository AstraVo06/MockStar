import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
const [email,setEmail]= useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
}

const {session, signUp} = UserAuth();

const navigate = useNavigate();
console.log(session);
console.log(email, password);

const handleSignUp = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
      const result = await signUp(email, password);

      if (result.success) {
        navigate('/dashboard');
      }
  } catch (err) {
       setError('an error occured');    
  } finally {
    setLoading(false);
  }
};

return (
    // This div contains the linear gradient background for this page only.
     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#7d89e9] to-[#d9e0fc]">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg w-full max-w-sm text-center transform transition-transform duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Sign up today!</h2>
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full px-4 py-3 pr-10 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 bg-transparent text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 rounded-lg text-white font-semibold transition-all duration-300
                       bg-gradient-to-r from-[#7d89e9] to-[#c3cbee] hover:from-[#6c78e3] hover:to-[#b1b9e5]
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
        <p className="mt-6 text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="text-indigo-600 hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup