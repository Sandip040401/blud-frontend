import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { io } from 'socket.io-client';

const CommentModal = ({ isOpen, onClose, postId, user, token, API_URL }) => {
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(API_URL, {
      transports: ['websocket'],
      query: { token },
    });
    setSocket(newSocket);

    // Clean up on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [API_URL, token]);

  // Fetch comments when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen]);

  const fetchComments = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/api/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const posts = response.data; // Assuming posts are returned as an array
      const allComments = [];

      // Collect comments from each post
      posts.forEach((post) => {
        if (post.comments) {
          allComments.push(...post.comments);
        }
      });

      // Sort comments by createdAt to show newest first
      allComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setCommentList(allComments);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError('Could not load comments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Listen for real-time updates via Socket.io
  useEffect(() => {
    if (socket) {
      socket.on('newComment', (newComment) => {
        // Add the new comment at the top of the list (newest first)
        setCommentList((prevComments) => [newComment, ...prevComments]);
      });

      // Cleanup event listener when socket changes or component unmounts
      return () => {
        socket.off('newComment');
      };
    }
  }, [socket]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `${API_URL}/api/posts/${postId}/comments`,
        { comment: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newCommentData = response.data;

      // Optimistically add the new comment to the list
      setCommentList((prevComments) => [newCommentData, ...prevComments]);

      // Emit the new comment via Socket.io
      socket.emit('addComment', {
        ...newCommentData,
        userName: user?.name || 'Anonymous',
        createdAt: newCommentData.createdAt || new Date().toISOString(),
      });

      setNewComment(''); // Reset comment input field
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay covering entire screen */}
      <div className="fixed inset-0 z-20 pointer-events-auto"></div>

      {/* Modal content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-lg w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Comments</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
          </div>

          <div className="max-h-64 overflow-y-auto mb-4">
            {loading ? (
              <p className="text-gray-600">Loading comments...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : commentList.length > 0 ? (
              commentList.map((comment, index) => (
                <div key={comment._id || index} className="p-3 mb-2 flex flex-col border border-yellow-400 shadow-sm rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center text-2xl text-white">🗨️</div>
                    <div>
                      <p className="text-yellow-800 font-semibold">{comment.userName}</p>
                      <p className="text-gray-500 text-sm">{moment(comment.createdAt).fromNow()}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2">{comment.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No comments yet. Be the first to comment!</p>
            )}
          </div>

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
    </>
  );
};

export default CommentModal;