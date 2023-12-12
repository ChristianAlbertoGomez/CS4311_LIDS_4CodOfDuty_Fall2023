import React from 'react';
import './CSS Files/loading.css'; // You'll create this CSS file in the next step

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;