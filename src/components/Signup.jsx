import React, { useState } from 'react';
import { signup } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      navigate('/signin');
    } catch (error) {
      console.error('Error signing up:', error);
      alert(error.message || 'Signup failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-300 to-blue-300">
      <form className="w-full max-w-sm bg-white p-10 rounded-3xl shadow-lg transform transition-all duration-500 hover:scale-105">
        <h2 className="text-4xl mb-6 text-center text-gray-800 font-extrabold font-comic">Sign Up</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-3 mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className="w-full bg-blue-400 text-gray-800 p-3 rounded-full shadow-lg hover:bg-blue-500 transition-all font-bold font-comic">
          Sign Up
        </button>
        <button 
          type="button" 
          className="w-full bg-gray-400 text-white p-3 rounded-full mt-4 shadow-lg hover:bg-gray-500 transition-all font-bold font-comic"
          onClick={() => navigate('/signin')}
        >
          Already have an account? Sign In
        </button>
      </form>
    </div>
  );
};

export default Signup;
