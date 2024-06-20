import React, { useState } from 'react';

const ImageThumbnail = ({ image, index, onDelete }) => {
  const [showFullImage, setShowFullImage] = useState(false);

  const toggleShowFullImage = () => {
    setShowFullImage(!showFullImage);
  };

  return (
    <div className="image-thumbnail">
      {showFullImage ? (
        <div className="full-image-overlay">
          <img src={image} alt={`Capture ${index}`} />
          <button onClick={() => onDelete(index)}>Delete</button>
          <button onClick={toggleShowFullImage}>Close</button>
        </div>
      ) : (
        <img src={image} alt={`Capture ${index}`} onClick={toggleShowFullImage} />
      )}
    </div>
  );
};

export default ImageThumbnail;
