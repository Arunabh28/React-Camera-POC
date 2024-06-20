import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CameraComponent from '../Component/CameraComponent';
import './CameraApp.css';
import ImageThumbnail from '../Component/ImageThumbnail';
import { useImages } from '../Component/ImagesContext';


function CameraApp() {
  const [images, setImages] = useImages();

  const handleCapture = (imageSrc) => {
    setImages(prevImages => [...prevImages, imageSrc]);
  };

  const handleDelete = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log("Number of Images:", images.length);
  }, [images]);

  return (
    <div className="camera-app-container">
      <h1>Camera App</h1>
      <CameraComponent onCapture={handleCapture} />
      <div className="image-container">
        {images.length > 0 && (
          images.map((image, index) => (
            <ImageThumbnail key={index} image={image} index={index} onDelete={handleDelete} />
          ))
        )}
      </div>
      {images.length > 0 && (
        <Link to={{ pathname: "/pdfview", state: { images: images } }}>
          <button>View PDF</button>
        </Link>
      )}
    </div>
  );
}

export default CameraApp;
