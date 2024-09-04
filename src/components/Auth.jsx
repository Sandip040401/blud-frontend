// src/components/Auth.js
import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';

const Auth = () => {
  const [isSignin, setIsSignin] = useState(true);

  const toggleAuthMode = () => {
    setIsSignin(!isSignin);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isSignin ? 'Sign In' : 'Sign Up'}
        </h2>
        {isSignin ? <Signin /> : <Signup />}
        <div className="text-center mt-4">
          <button
            onClick={toggleAuthMode}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            {isSignin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
