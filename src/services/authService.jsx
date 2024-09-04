// src/services/authService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}//api/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Signup failed');
  }
};

export const signin = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}//api/auth/signin`, userData);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Signin failed');
  }
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const logout = () => {
  localStorage.removeItem('user');
};
