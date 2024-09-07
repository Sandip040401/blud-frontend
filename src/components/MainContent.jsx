import React from 'react';
import { CreatePost } from './CreatePost';

const MainContent = ({ setShowModal }) => {
  return (
    <div className="w-3/5 mx-auto bg-white p-8 min-h-screen rounded-lg">
      <CreatePost setShowModal={setShowModal} />
    </div>
  );
};

export default MainContent;
