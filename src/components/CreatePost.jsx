import React, { useState } from 'react';
import { FaVideo, FaPhotoVideo, FaSmile } from 'react-icons/fa';
import Posts from './Posts';

export const CreatePost = () => {
  const [postContent, setPostContent] = useState('');
  const [mediaContent, setMediaContent] = useState(null); // State for file
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  // Handle post submission
  const handlePostSubmit = () => {
    if (postContent || mediaContent) {
      // Submit the post content and media (you can call an API here)
      console.log('Post submitted:', { postContent, mediaContent });
      setPostContent('');
      setMediaContent(null);
      setShowModal(false); // Close modal after posting
    } else {
      alert('Please add content to post');
    }
  };

  // Handle file input (photo/video)
  const handleFileChange = (e) => {
    setMediaContent(e.target.files[0]);
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl mx-auto mt-6 border border-gray-200 relative z-10">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white text-xl">
            {/* Profile Icon Placeholder */}
            <span role="img" aria-label="Profile Icon">👤</span>
          </div>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-between border-t border-gray-300 pt-4">
          <button
            className="flex items-center space-x-2 text-red-500 hover:bg-gray-100 py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
            onClick={() => alert('Start Live Video')}>
            <FaVideo className="text-xl" />
            <span className="text-lg">Live video</span>
          </button>
          <button
            className="flex items-center space-x-2 text-green-500 hover:bg-gray-100 py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
            onClick={() => setShowModal(true)} // Open modal on click
          >
            <FaPhotoVideo className="text-xl" />
            <span className="text-lg">Photo/video</span>
          </button>
          <button
            className="flex items-center space-x-2 text-yellow-500 hover:bg-gray-100 py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
            onClick={() => alert('Choose Feeling/Activity')}>
            <FaSmile className="text-xl" />
            <span className="text-lg">Feeling/activity</span>
          </button>
        </div>
      </div>

      {/* Modal for uploading photo/video */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-auto shadow-xl relative">
            <h3 className="text-xl font-semibold mb-4">Create Post</h3>
            
            {/* Input for writing a caption */}
            <textarea
              className="w-full border border-gray-300 rounded-lg p-4 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows="4"
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            
            {/* File input for uploading photo/video */}
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="mb-4"
            />
            
            {/* Display the selected file */}
            {mediaContent && (
              <p className="text-sm text-gray-700 mb-4">Selected file: {mediaContent.name}</p>
            )}

            {/* Modal action buttons */}
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                onClick={() => setShowModal(false)} // Close modal
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={handlePostSubmit}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts */}
      {/* <div className="bg-yellow-50 p-6 rounded-xl shadow-lg mb-6 transform hover:scale-105 transition-transform duration-300">
        <p className="text-gray-800 font-bold">Post 1: Cartoon Fun!</p>
      </div>
      <div className="bg-yellow-50 p-6 rounded-xl shadow-lg mb-6 transform hover:scale-105 transition-transform duration-300">
        <p className="text-gray-800 font-bold">Post 2: Check this out!</p>
      </div> */}
      <Posts/>
    </>
  );
};
