import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import SidebarLeft from './SidebarLeft';
import MainContent from './MainContent';

const Home = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/signin');
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex justify-between mt-16">
        <SidebarLeft isCollapsed={isSidebarCollapsed} />
        <MainContent />
      </div>
    </div>
  );
};

export default Home;
