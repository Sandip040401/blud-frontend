import React from 'react';

const SidebarRight = () => {
  return (
    <div className="w-1/4 bg-gray-100 min-h-screen p-4 fixed top-16 right-0">
      <h3 className="text-lg font-bold mb-4">What's Trending</h3>
      <ul className="space-y-4">
        <li className="hover:text-blue-500 cursor-pointer">Trending Topic 1</li>
        <li className="hover:text-blue-500 cursor-pointer">Trending Topic 2</li>
        <li className="hover:text-blue-500 cursor-pointer">Trending Topic 3</li>
      </ul>
    </div>
  );
};

export default SidebarRight;
