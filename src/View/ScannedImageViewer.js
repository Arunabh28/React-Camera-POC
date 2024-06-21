import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useImages } from '../Component/ImagesContext';
import ThumbnailComponent from '../Component/ThumbnailComponent';
import '../style/ScannedImageView.css';

const ScannedImageView = () => {
  const navigate = useNavigate();
  const [images, setImages] = useImages(); // Assuming useImages returns images context
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Initialize with 0 as default index

  const thumbnailClicked = (index) => {
    setSelectedImageIndex(index); // Update selectedImageIndex when thumbnail is clicked
  };

  const moveImageUp = () => {
    if (selectedImageIndex > 0) {
      const updatedImages = [...images];
      const temp = updatedImages[selectedImageIndex];
      updatedImages[selectedImageIndex] = updatedImages[selectedImageIndex - 1];
      updatedImages[selectedImageIndex - 1] = temp;
      setImages(updatedImages);
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const moveImageDown = () => {
    if (selectedImageIndex < images.length - 1) {
      const updatedImages = [...images];
      const temp = updatedImages[selectedImageIndex];
      updatedImages[selectedImageIndex] = updatedImages[selectedImageIndex + 1];
      updatedImages[selectedImageIndex + 1] = temp;
      setImages(updatedImages);
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const deleteImage = () => {
    const updatedImages = images.filter((_, index) => index !== selectedImageIndex);
    setImages(updatedImages);
    setSelectedImageIndex(0); // Reset selected image index after deletion
  };

  return (
    <div style={{height:'100%',maxHeight:'80%'}}>
      <div className='thumbnail-container'>
        {images.length > 0 &&
          images.map((image, index) => (
            <ThumbnailComponent 
                key={index} 
                image={image} 
                index={index} 
                handleClick={thumbnailClicked} 
                isSelected={index === selectedImageIndex}
            />
          ))}
      </div>
      <div className='selected-image-container'>
        {images.length > 0 && (
          <>
            <img src={images[selectedImageIndex]} alt="Captured"  />
            <div className='action-button-container'>
              <button type='button' onClick={moveImageUp}>Move Up</button>
              <button type='button' onClick={moveImageDown}>Move Down</button>
              <button type='button' onClick={deleteImage}>Delete</button>
            </div>
          </>
        )}
        {images.length === 0 && <p>No images available</p>}
      </div>
      <div>
      <Link to={{ pathname: "/camera" }}>
            <button className="view-camera">Scan More</button>
          </Link>
        <Link to={{ pathname: "/pdfview", state: { images: images } }}>
            <button className="view-pdf-button">View PDF</button>
          </Link>
      </div>
    </div>
  );
};

export default ScannedImageView;
