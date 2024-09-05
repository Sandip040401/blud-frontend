import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post(`${API_URL}/api/auth/verify-otp`, { email, otp });
      setLoading(false);
      setMessage('OTP verified. You can now reset your password.');
      navigate('/reset-password', { state: { email } });
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-300 to-pink-300">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-10 rounded-3xl shadow-lg">
        <h2 className="text-4xl mb-6 text-center text-gray-800 font-extrabold font-comic">Verify OTP</h2>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{message}</div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
        )}

        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          className="w-full p-3 mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-pink-400"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`w-full p-3 rounded-full shadow-lg text-white font-bold font-comic ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-400 hover:bg-pink-500'}`}
          disabled={loading}
        >
          {loading ? 'Verifying OTP...' : 'Verify OTP'}
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
