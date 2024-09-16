import React, { useState, useEffect, useRef } from 'react';
import { FaThumbsUp, FaComment, FaShare, FaEllipsisH, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import axios from 'axios';
import moment from 'moment';
import io from 'socket.io-client';

export const Post = ({ postId, title, name, timeAgo, content, likes = [], comments = [], shares, setIsModalOpen }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  const [likeCount, setLikeCount] = useState(likes.length);
  const [userLikes, setUserLikes] = useState(likes.includes(user?.id));
  const [commentList, setCommentList] = useState(comments);
  const [newComment, setNewComment] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  // Refs for scrolling
  const postTopRef = useRef(null);
  const postBottomRef = useRef(null);

  // Socket connection setup with token
  useEffect(() => {
    const socket = io(API_URL, {
      query: { token }, // Send the token as a query parameter
    });

    socket.emit('joinPost', postId);

    socket.on('newComment', (newComment) => {
      setCommentList((prevComments) => [...prevComments, newComment]);
    });

    return () => {
      socket.disconnect();
    };
  }, [postId, API_URL, token]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/posts/${postId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLikeCount(response.data.likes.length);
      setUserLikes(response.data.userHasLiked);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `${API_URL}/api/posts/${postId}/comments`,
        { comment: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newCommentData = response.data;
      const commentWithDetails = {
        ...newCommentData,
        userName: user?.name || 'Anonymous',
        createdAt: newCommentData.createdAt || new Date().toISOString(),
      };

      setCommentList((prevComments) => [...prevComments, commentWithDetails]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Scroll to top of the post
  const scrollToTop = () => {
    postTopRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom of the post
  const scrollToBottom = () => {
    postBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderComments = () => {
    const commentsToShow = showAllComments ? commentList : commentList.slice(0, 2);
    return (
      <>
        {commentsToShow.map((comment, index) => (
          <div key={index} className="border-b border-yellow-300 py-2">
            <div className="flex justify-between">
              <p className="font-semibold text-yellow-700">{comment.userName || 'Anonymous'}</p>
              <div className="flex space-x-2">
                <button onClick={scrollToTop} className="text-gray-500 hover:text-gray-700">
                  <FaArrowUp />
                </button>
                <button onClick={scrollToBottom} className="text-gray-500 hover:text-gray-700">
                  <FaArrowDown />
                </button>
              </div>
            </div>
            <p className="text-gray-600">{comment.comment}</p>
            <p className="text-xs text-gray-500">{moment(comment.createdAt).fromNow()}</p>
          </div>
        ))}

        {commentList.length > 2 && (
          <button
            className="text-yellow-600 hover:underline mt-2"
            onClick={() => setShowAllComments(!showAllComments)}
          >
            {showAllComments ? 'Show Less' : `Show More (${commentList.length - 2} more comments)`}
          </button>
        )}
      </>
    );
  };

  return (
    <div className="bg-yellow-50 shadow-lg rounded-lg p-6 mb-6 mx-auto max-w-xl relative border border-yellow-200 z-10">
      {/* Ref for scrolling to the top */}
      <div ref={postTopRef}></div>

      <div className="flex items-center space-x-4 mb-4">
        <div className="w-14 h-14 bg-yellow-200 rounded-full flex items-center justify-center text-3xl text-yellow-700">
          <span role="img" aria-label="Profile Icon">👤</span>
        </div>
        <div>
          <p className="font-bold text-yellow-800 text-xl">{name}</p>
          <p className="text-yellow-600 text-sm">{timeAgo}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-yellow-700 mb-4">{title}</h2>

      {content.image && (
        <img src={content.image} alt="Post content" className="w-full h-auto max-h-96 object-cover rounded-lg mb-4" />
      )}
      {content.video && (
        <video controls className="w-full h-auto max-h-96 rounded-lg mb-4">
          <source src={content.video} type={content.video.contentType || 'video/mp4'} />
          Your browser does not support the video tag.
        </video>
      )}

      <div className="flex justify-between items-center text-gray-700 text-sm mt-10">
        <div className="flex items-center space-x-4">
          <button onClick={handleLike} className={`flex items-center space-x-2 ${userLikes ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-800 transition`}>
            <FaThumbsUp className="text-xl" />
            <span>{likeCount}</span>
          </button>
          <button className="flex items-center space-x-2 text-green-600 hover:text-green-800 transition">
            <FaComment className="text-xl" />
            <span>{commentList.length}</span>
          </button>
          <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition">
            <FaShare className="text-xl" />
            <span>{shares}</span>
          </button>
        </div>
        <button className="text-gray-600 hover:text-gray-800 transition">
          <FaEllipsisH className="text-xl" />
        </button>
      </div>

      {/* Comments Section */}
      <div className="mt-4">
        <h3 className="text-lg font-bold text-yellow-900">Feel Free to Express your Thoughts</h3>
        {renderComments()}

        {/* Add New Comment */}
        <div className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full border border-yellow-300 rounded p-2 mb-2 focus:outline-none focus:ring focus:ring-yellow-500"
          />
          <button
            onClick={handleAddComment}
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors duration-300"
          >
            Comment
          </button>
        </div>
      </div>

      {/* Ref for scrolling to the bottom */}
      <div ref={postBottomRef}></div>
    </div>
  );
};
