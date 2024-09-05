import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const Signin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors
    try {
      const response = await axios.post(`${API_URL}/api/auth/signin`, formData);
      localStorage.setItem('user', JSON.stringify(response.data));
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Signin failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-300 to-yellow-300 relative">
      {error && (
        <div className="absolute top-5 right-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-10 rounded-3xl shadow-lg transform transition-all duration-500 hover:scale-105">
        <h2 className="text-4xl mb-6 text-center text-gray-800 font-extrabold font-comic">Sign In</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-all"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-all"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className={`w-full text-gray-800 p-3 rounded-full shadow-lg transition-all font-bold font-comic ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500'}`}
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        <div className="flex flex-col items-center mt-4 space-y-2">
          <button
            type="button"
            className="text-sm text-blue-500 hover:text-blue-600 font-bold font-comic"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </button>
          <button
            type="button"
            className="text-sm text-gray-500 hover:text-gray-700 font-bold font-comic"
            onClick={() => navigate('/signup')}
          >
            Don't have an account? Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
