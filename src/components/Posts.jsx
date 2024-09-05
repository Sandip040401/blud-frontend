import React from 'react';
import { Post } from './Post'; // Make sure to import the Post component correctly

const Posts = () => {
  // Dummy data for posts
  const dummyPosts = [
    {
      name: 'Alice Johnson',
      timeAgo: '2 mins ago',
      content: 'Just got a new puppy! 🐶 So excited to start this new chapter!',
      likes: 120,
      comments: 35,
      shares: 10,
    },
    {
      name: 'Bob Smith',
      timeAgo: '3 hrs ago',
      content: 'Had an amazing day at the beach! ☀️🌊 Check out these photos!',
      likes: 200,
      comments: 50,
      shares: 20,
    },
    {
      name: 'Carol White',
      timeAgo: '1 day ago',
      content: 'Completed my first marathon! 🎉🏅 It was tough, but so worth it!',
      likes: 300,
      comments: 80,
      shares: 25,
    },
  ];

  return (
    <div className="p-4">
      {dummyPosts.map((post, index) => (
        <Post
          key={index}
          name={post.name}
          timeAgo={post.timeAgo}
          content={post.content}
          likes={post.likes}
          comments={post.comments}
          shares={post.shares}
        />
      ))}
    </div>
  );
};

export default Posts;
