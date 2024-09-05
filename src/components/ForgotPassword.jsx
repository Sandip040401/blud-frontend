import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
      setLoading(false);
      setMessage('OTP sent to your email.');
      // Navigate to OTP verification page
      navigate(`/verify-otp`, { state: { email } });
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  // Function to dismiss alerts
  const closeAlert = () => {
    setError('');
    setMessage('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-300 to-green-300">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-10 rounded-3xl shadow-lg">
        <h2 className="text-4xl mb-6 text-center text-gray-800 font-extrabold font-comic">Forgot Password</h2>

        {message && (
          <div className="relative bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <span>{message}</span>
            <button
              type="button"
              className="absolute top-0 right-0 px-4 py-2 text-green-700"
              onClick={closeAlert}
            >
              &times;
            </button>
          </div>
        )}

        {error && (
          <div className="relative bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <span>{error}</span>
            <button
              type="button"
              className="absolute top-0 right-0 px-4 py-2 text-red-700"
              onClick={closeAlert}
            >
              &times;
            </button>
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-green-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`w-full p-3 rounded-full shadow-lg text-white font-bold font-comic ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-400 hover:bg-green-500'}`}
          disabled={loading}
        >
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
