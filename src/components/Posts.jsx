import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from './Post'; // Import Post component
import { formatDistanceToNow } from 'date-fns'; // Date-fns for formatting
import Loader from '../loader/Loader';
import io from 'socket.io-client'; // Import Socket.IO client

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  // Get token from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  useEffect(() => {
    // Initialize Socket.IO connection
    const socket = io(API_URL);

    // Fetch posts from the backend
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/posts`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to request headers
          },
        });
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();

    // Real-time post updates handling (likes, comments, etc.)
    socket.on('postUpdated', (updatedPost) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
    });

    // Clean up connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, [API_URL, token]); // Added 'token' as a dependency

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  // Helper function to format time as "time ago"
  const getTimeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <div className="p-4 z-10">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post._id}
            postId={post._id} // Pass post ID for updates
            title={post.title}
            name={post.name}
            timeAgo={getTimeAgo(post.createdAt)}
            content={post.content}
            likes={post.likes}
            comments={post.comments}
            shares={post.shares}
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Posts;
