import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useImages } from '../Component/ImagesContext';

const CaptureImageView = () => {
  const navigate = useNavigate();
  const [images, setImages] = useImages(); // Assuming useImages returns images context

  const handleRetake = () => {
    // Navigate back to CameraApp route
    setImages(prevImages => prevImages.slice(0, -1));
    navigate('/camera');
  };

  const handleAccept = () => {
    // Add image to context and navigate back to CameraApp route
    
    navigate('/Camera');
  };

  return (
    <div>
      <img src={images[images.length - 1]} alt="Captured" style={{ maxWidth: '100%', maxHeight: '70vh' }} />
      <div style={{paddingLeft:'30%'}}>
        <button onClick={handleRetake}>Retake</button>
        <button onClick={handleAccept}>Accept</button>
      </div>
    </div>
  );
};

export default CaptureImageView;
