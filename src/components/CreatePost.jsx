import React, { useState } from 'react';
import { FaVideo, FaPhotoVideo, FaSmile } from 'react-icons/fa';
import axios from 'axios';
import Posts from './Posts';
import UploadMediaModal from './UploadMediaModal';
import CartoonAlert from './CartoonAlert'; // Import the new alert component

export const CreatePost = ({ setShowModal }) => {
  const [postTitle, setPostTitle] = useState('');
  const [mediaContent, setMediaContent] = useState(null);
  const [showModalLocal, setShowModalLocal] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
  const [isPosting, setIsPosting] = useState(false); // State to manage post button
  const [alertMessage, setAlertMessage] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;
  const userName = user?.name;

  const handlePostSubmit = async () => {
    if (!postTitle.trim() && !mediaContent) {
      setAlertMessage("Post title or media content is required");
      setShowAlert(true); // Show custom alert
      return; // Stop further execution
    }
  
    setIsPosting(true); // Show 'Posting' state
  
    const formData = new FormData();
    formData.append('title', postTitle);
    formData.append('name', userName);
    formData.append('timeAgo', new Date().toISOString());
  
    if (mediaContent) {
      formData.append('media', mediaContent);
    }
  
    try {
      await axios.post(`${API_URL}/api/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      setPostTitle('');
      setMediaContent(null);
      setShowModal(false);
      setShowModalLocal(false);
      window.location.reload();
    } catch (error) {
      console.error('Error submitting post:', error);
  
      // Extract the error message from the response
      const errorMessage = error.response?.data?.message || "An error occurred while posting";
      
      setAlertMessage(errorMessage);
      setShowAlert(true); // Show custom alert
    } finally {
      setIsPosting(false); // Reset 'Posting' state
    }
  };
  

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0]; // Safely access the file
    if (file) {
      setMediaContent(file);
    } else {
      setMediaContent(null); // Deselect the media or clear the state
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl mx-auto mt-6 border border-gray-200 relative z-10">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white text-xl">
            <span role="img" aria-label="Profile Icon">👤</span>
          </div>
          <div
            className="w-full px-4 py-2 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer"
            onClick={() => {
              setShowModal(true); // Trigger modal
              setShowModalLocal(true);
            }}
          >
            <span className="text-gray-500">What's on your mind?</span>
          </div>
        </div>
        <div className="flex justify-between border-t border-gray-300 pt-4">
          <button
            className="flex items-center space-x-2 text-red-500 hover:bg-gray-100 py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
            onClick={() => alert('Start Live Video')}
          >
            <FaVideo className="text-xl" />
            <span className="text-lg">Live video</span>
          </button>
          <button
            className="flex items-center space-x-2 text-green-500 hover:bg-gray-100 py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
            onClick={() => {
              setShowModal(true); // Trigger modal
              setShowModalLocal(true);
            }}
          >
            <FaPhotoVideo className="text-xl" />
            <span className="text-lg">Photo/video</span>
          </button>
          <button
            className="flex items-center space-x-2 text-yellow-500 hover:bg-gray-100 py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
            onClick={() => alert('Choose Feeling/Activity')}
          >
            <FaSmile className="text-xl" />
            <span className="text-lg">Feeling/activity</span>
          </button>
        </div>
      </div>

      {showModalLocal && (
        <UploadMediaModal
          userName={userName}
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          mediaContent={mediaContent}
          handleFileChange={handleFileChange}
          handlePostSubmit={handlePostSubmit}
          setShowModal={() => {
            setShowModal(false);
            setShowModalLocal(false);
          }}
          isPosting={isPosting} // Pass the posting state
        />
      )}

      {showAlert && (
        <CartoonAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}

      <Posts />
    </>
  );
};

export default CreatePost;
