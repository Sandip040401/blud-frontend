import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from './Post'; // Ensure Post component is imported correctly
import { formatDistanceToNow } from 'date-fns'; // Import date-fns function
import Loader from '../loader/Loader';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/posts`); // Replace with your actual API endpoint
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <Loader/>
  if (error) return <p>Error: {error}</p>;

  // Helper function to format time ago
  const getTimeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <div className="p-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post._id} // Assuming the post has an _id field
            title={post.title} // Make sure the title is passed
            name={post.name}
            timeAgo={getTimeAgo(post.timeAgo)} // Format time ago
            content={post.content} // Passing full content
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
