import React, { useState } from 'react';
import { FaHome, FaSearch, FaUserFriends, FaBell, FaGamepad, FaTv, FaBars, FaChevronLeft } from 'react-icons/fa';
import { FiMessageSquare } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const Navbar = ({ toggleSidebar }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-yellow-300 shadow-lg p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold text-blue-600">🌟 Blud</div>
          <div className="flex items-center bg-white px-3 py-2 rounded-full shadow-md">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none text-gray-600 text-sm bg-transparent"
            />
          </div>
        </div>

        <ul className="flex space-x-8 text-xl text-gray-700">
          <li className="hover:text-blue-500 cursor-pointer">
            <FaHome />
          </li>
          <li className="hover:text-blue-500 cursor-pointer">
            <FaUserFriends />
          </li>
          <li className="hover:text-blue-500 cursor-pointer">
            <FaTv />
          </li>
          <li className="hover:text-blue-500 cursor-pointer">
            <FaGamepad />
          </li>
        </ul>

        <div className="flex items-center space-x-6">
          <FiMessageSquare className="text-gray-700 text-2xl hover:text-blue-500 cursor-pointer" />
          <FaBell className="text-gray-700 text-2xl hover:text-blue-500 cursor-pointer" />

          {/* Sidebar Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="text-gray-700 text-2xl hover:text-blue-500 cursor-pointer"
          >
            <FaChevronLeft />
          </button>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-gray-700 text-2xl hover:text-blue-500 cursor-pointer"
            >
              <FaBars />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-48 py-2 flex flex-col text-left">
                <a href="#" className="px-4 py-2 text-gray-800 hover:bg-yellow-200">
                  Account Settings
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-yellow-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
