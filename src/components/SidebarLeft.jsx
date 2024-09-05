import React from 'react';

const SidebarLeft = ({ isCollapsed }) => {
  return (
    <div
      className={`fixed left-0 top-16 ${isCollapsed ? 'w-16' : 'w-1/5'} min-h-screen bg-yellow-200 p-4 shadow-2xl border-4 border-yellow-300 transition-all duration-300 flex flex-col items-center`}
    >
      <ul
        className={`flex flex-col ${isCollapsed ? 'items-center' : 'items-start'} space-y-4 text-gray-900 font-bold text-xl`}
      >
        <li
          className={`hover:text-white hover:bg-yellow-400 p-3 rounded-lg transition-colors duration-300 cursor-pointer flex items-center space-x-2 ${
            isCollapsed ? 'w-12 h-12' : 'w-full'
          }`}
        >
          {isCollapsed ? (
            <span className="text-xl">📄</span>
          ) : (
            <>
              <span className="text-xl">📄</span>
              <span className="ml-2">Feed</span>
            </>
          )}
        </li>
        <li
          className={`hover:text-white hover:bg-yellow-400 p-3 rounded-lg transition-colors duration-300 cursor-pointer flex items-center space-x-2 ${
            isCollapsed ? 'w-12 h-12' : 'w-full'
          }`}
        >
          {isCollapsed ? (
            <span className="text-xl">🔔</span>
          ) : (
            <>
              <span className="text-xl">🔔</span>
              <span className="ml-2">Notifications</span>
            </>
          )}
        </li>
        <li
          className={`hover:text-white hover:bg-yellow-400 p-3 rounded-lg transition-colors duration-300 cursor-pointer flex items-center space-x-2 ${
            isCollapsed ? 'w-12 h-12' : 'w-full'
          }`}
        >
          {isCollapsed ? (
            <span className="text-xl">👥</span>
          ) : (
            <>
              <span className="text-xl">👥</span>
              <span className="ml-2">Groups</span>
            </>
          )}
        </li>
        <li
          className={`hover:text-white hover:bg-yellow-400 p-3 rounded-lg transition-colors duration-300 cursor-pointer flex items-center space-x-2 ${
            isCollapsed ? 'w-12 h-12' : 'w-full'
          }`}
        >
          {isCollapsed ? (
            <span className="text-xl">📅</span>
          ) : (
            <>
              <span className="text-xl">📅</span>
              <span className="ml-2">Events</span>
            </>
          )}
        </li>
        <li
          className={`hover:text-white hover:bg-yellow-400 p-3 rounded-lg transition-colors duration-300 cursor-pointer flex items-center space-x-2 ${
            isCollapsed ? 'w-12 h-12' : 'w-full'
          }`}
        >
          {isCollapsed ? (
            <span className="text-xl">📦</span>
          ) : (
            <>
              <span className="text-xl">📦</span>
              <span className="ml-2">Marketplace</span>
            </>
          )}
        </li>
        <li
          className={`hover:text-white hover:bg-yellow-400 p-3 rounded-lg transition-colors duration-300 cursor-pointer flex items-center space-x-2 ${
            isCollapsed ? 'w-12 h-12' : 'w-full'
          }`}
        >
          {isCollapsed ? (
            <span className="text-xl">🎮</span>
          ) : (
            <>
              <span className="text-xl">🎮</span>
              <span className="ml-2">Games</span>
            </>
          )}
        </li>
        <li
          className={`hover:text-white hover:bg-yellow-400 p-3 rounded-lg transition-colors duration-300 cursor-pointer flex items-center space-x-2 ${
            isCollapsed ? 'w-12 h-12' : 'w-full'
          }`}
        >
          {isCollapsed ? (
            <span className="text-xl">⚙️</span>
          ) : (
            <>
              <span className="text-xl">⚙️</span>
              <span className="ml-2">Settings</span>
            </>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SidebarLeft;
