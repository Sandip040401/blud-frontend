import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');
    try {
      await axios.post(`${API_URL}/api/auth/signup`, formData);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-300 to-blue-300 relative">
      {success && (
        <div className="absolute top-5 right-5 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline ml-2">Signup successful. Redirecting...</span>
        </div>
      )}
      {error && (
        <div className="absolute top-5 right-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}
      <div className="flex flex-col items-center w-full max-w-sm p-10 bg-white rounded-3xl shadow-lg transform transition-all duration-500 hover:scale-105">
        <h2 className="text-4xl mb-6 text-center text-gray-800 font-extrabold font-comic">Sign Up</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-3 mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className={`w-full text-gray-800 p-3 mb-4 rounded-full shadow-lg transition-all font-bold font-comic ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-400 hover:bg-blue-500'}`}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <button
          type="button"
          className="text-sm text-gray-500 hover:text-gray-700 font-bold font-comic"
          onClick={() => navigate('/signin')}
        >
          Already have an account? Sign In
        </button>
      </div>
    </div>
  );
};

export default Signup;
