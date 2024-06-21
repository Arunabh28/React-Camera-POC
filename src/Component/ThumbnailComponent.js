import React from 'react';

const ThumbnailComponent = ({ image, index,isSelected, handleClick }) => {
  return (
    <div style={{ margin: '10px', cursor: 'pointer',border: isSelected ? '2px solid red' : '2px solid transparent' }} onClick={() => handleClick(index)}>
      <img src={image} alt={`Thumbnail ${index}`} style={{ width: '100px', height: 'auto' }} />
    </div>
  );
};

export default ThumbnailComponent;
