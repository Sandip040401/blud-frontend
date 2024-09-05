import React from 'react';
import { CreatePost } from './CreatePost';

const MainContent = () => {
  return (
    <div className="w-3/5 mx-auto bg-white p-8 min-h-screen rounded-lg">
      <CreatePost />
    </div>
  );
};

export default MainContent;
