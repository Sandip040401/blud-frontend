import React, { useState } from 'react';
import { FaTimes, FaPhotoVideo, FaUserFriends, FaTrashAlt, FaCrop } from 'react-icons/fa';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImageHelper'; // Helper to handle cropped image extraction

export const UploadMediaModal = ({ userName, postTitle, setPostTitle, mediaContent, handleFileChange, handlePostSubmit, setShowModal, isPosting }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppingMode, setCroppingMode] = useState(false);

  const handleCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropImage = async () => {
    const croppedImage = await getCroppedImg(mediaContent.url, croppedAreaPixels);
    console.log(croppedImage); // Handle the cropped image
    setCroppingMode(false); // Exit cropping mode
  };

  const handleDeselectMedia = () => {
    handleFileChange({ target: { files: [] } }); // Simulate no file selected
  };

  const renderMediaPreview = () => {
    const fileType = mediaContent?.type.split('/')[0]; // Get media type (image or video)
    if (!fileType) return null;

    return (
      <div className="relative border-4 border-purple-200 rounded-xl p-4 shadow-lg">
        {fileType === 'image' ? (
          <img
            src={URL.createObjectURL(mediaContent)}
            alt="Selected Media"
            className="w-full h-48 object-cover rounded-xl"
          />
        ) : (
          <video
            src={URL.createObjectURL(mediaContent)}
            controls
            className="w-full h-48 rounded-xl"
          />
        )}
        {/* Media Actions */}
        <div className="absolute top-2 right-2 flex space-x-3">
          <button onClick={handleDeselectMedia} className="bg-red-200 p-2 rounded-full hover:bg-red-300 transition">
            <FaTrashAlt className="text-red-500 text-lg" />
          </button>
          {fileType === 'image' && (
            <button onClick={() => setCroppingMode(true)} className="bg-yellow-200 p-2 rounded-full hover:bg-yellow-300 transition">
              <FaCrop className="text-yellow-600 text-lg" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-purple-100 bg-opacity-80 flex justify-center items-center z-20">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-screen mx-auto shadow-2xl relative flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b bg-purple-300 rounded-t-2xl">
          <h3 className="text-2xl font-bold text-white">Create Post</h3>
          <button onClick={() => setShowModal(false)}>
            <FaTimes className="text-white text-xl hover:text-purple-500 transition" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto max-h-[70vh]"> {/* Added max height to the content */}
          {/* User Information */}
          <div className="flex items-center px-4 py-3 space-x-4 bg-purple-50 rounded-lg mt-2">
            <div className="w-12 h-12 rounded-full bg-yellow-300 border-4 border-purple-500"></div> {/* Profile placeholder */}
            <div>
              <h4 className="font-semibold text-purple-700 text-xl">{userName || 'User'}</h4> {/* Dynamic user name */}
              <div className="text-sm text-gray-500 flex items-center space-x-2">
                <FaUserFriends className="text-purple-500" />
                <span>Friends</span>
              </div>
            </div>
          </div>

          {/* Title Input */}
          <div className="px-4 py-3">
            <textarea
              className="w-full h-24 bg-purple-100 text-gray-700 p-4 rounded-xl border-2 border-purple-200 focus:outline-none focus:border-purple-400 resize-none"
              placeholder={`What's on your mind, ${userName || 'User'}?`}
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
          </div>

          {/* Media Upload Section */}
          <div className="px-4 py-4">
            {mediaContent && !croppingMode ? (
              renderMediaPreview() // Call the media preview handler
            ) : (
              <div className="border-4 border-purple-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 relative shadow-lg">
                <FaPhotoVideo className="text-4xl text-purple-400 mb-3" />
                <p className="text-center font-bold text-purple-500">Add Photos/Videos</p>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            )}

            {/* Cropping Mode */}
            {croppingMode && (
              <div className="relative w-full h-48 bg-purple-200 rounded-xl overflow-hidden shadow-lg">
                <Cropper
                  image={URL.createObjectURL(mediaContent)}
                  crop={crop}
                  zoom={zoom}
                  aspect={4 / 3}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={handleCropComplete}
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button onClick={() => setCroppingMode(false)} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition">
                    <FaTimes className="text-gray-700 text-xl" />
                  </button>
                  <button onClick={handleCropImage} className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition">
                    Crop
                  </button>
                </div>
              </div>
            )}

            {/* Show the selected file name */}
            {mediaContent && !croppingMode && (
              <p className="text-sm text-gray-700 mt-3 text-center">Selected file: {mediaContent.name}</p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-purple-100 rounded-b-2xl">
          <button
            className={`w-full ${isPosting ? 'bg-gray-400' : 'bg-purple-500'} text-white py-3 rounded-xl font-bold hover:${isPosting ? 'bg-gray-400' : 'bg-purple-600'} transition`}
            onClick={handlePostSubmit}
            disabled={isPosting}
          >
            {isPosting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadMediaModal;
