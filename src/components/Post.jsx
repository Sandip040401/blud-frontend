import React from 'react';
import { FaEllipsisH, FaTimes, FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';

export const Post = ({ name, timeAgo, content, likes, comments, shares }) => {
  return (
    <div className="bg-yellow-50 shadow-lg rounded-lg p-6 mb-6 mx-auto max-w-xl relative border border-yellow-200 transition-transform transform hover:scale-105">
      {/* Close Button */}
      <button className="absolute top-2 right-2 text-gray-700 hover:text-red-500 transition-colors duration-300">
        <FaTimes className="text-xl" />
      </button>
      
      {/* Post Header */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-14 h-14 bg-yellow-200 rounded-full flex items-center justify-center text-3xl text-yellow-700">
          {/* Profile Icon Placeholder */}
          <span role="img" aria-label="Profile Icon">👤</span>
        </div>
        <div>
          <p className="font-bold text-yellow-800 text-xl">{name}</p>
          <p className="text-yellow-600 text-sm">{timeAgo}</p>
        </div>
      </div>
      
      {/* Post Content */}
      <p className="text-gray-800 mb-4 text-base">{content}</p>
      
      {/* Post Actions */}
      <div className="flex justify-between items-center text-gray-700 text-sm">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-300">
            <FaThumbsUp className="text-xl" />
            <span>{likes}</span>
          </button>
          <button className="flex items-center space-x-2 text-green-600 hover:text-green-800 transition-colors duration-300">
            <FaComment className="text-xl" />
            <span>{comments}</span>
          </button>
          <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors duration-300">
            <FaShare className="text-xl" />
            <span>{shares}</span>
          </button>
        </div>
        
        {/* More Options */}
        <button className="text-gray-700 hover:text-gray-900 transition-colors duration-300">
          <FaEllipsisH className="text-xl" />
        </button>
      </div>
    </div>
  );
};
