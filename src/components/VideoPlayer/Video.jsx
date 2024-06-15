import React from 'react';
import './style.scss';

const Video = () => {
  return (
    <div className="video-container">
      <video className="video-element" autoPlay loop muted>
        <source src="./video/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
