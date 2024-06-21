import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThumbnailComponent = ({ image, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirect to ImageViewer route with image index as parameter
    navigate(`/image-viewer/${index}`);
  };

  return (
    <div style={{ margin: '10px', cursor: 'pointer' }} onClick={handleClick}>
      <img src={image} alt={`Thumbnail ${index}`} style={{ width: '100px', height: 'auto' }} />
    </div>
  );
};

export default ThumbnailComponent;
