import React, { useState } from 'react';
import { signin } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(formData);
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error);
      alert(error.message || 'Signin failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="w-1/3 bg-white p-8 rounded shadow" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-6 text-center">Sign In</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Sign In
        </button>
        <button 
          type="button" 
          className="w-full bg-gray-500 text-white p-2 rounded mt-4"
          onClick={() => navigate('/signup')}
        >
          Don't have an account? Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signin;
