// src/components/Home.js
import React, { useEffect } from 'react';
import { getCurrentUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-4xl">Welcome, {getCurrentUser()?.name}!</h1>
    </div>
  );
};

export default Home;
