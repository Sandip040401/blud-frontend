// CartoonAlert.js
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const CartoonAlert = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white border-2 border-red-500 rounded-lg shadow-lg p-6 max-w-sm mx-auto relative flex flex-col items-center">
        <FaExclamationTriangle className="text-red-500 text-3xl mb-4" />
        <h4 className="text-lg font-bold text-red-700 mb-2">Alert</h4>
        <p className="text-gray-700 mb-4 text-center">{message}</p>
        <button
          onClick={onClose}
          className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CartoonAlert;
