import React, { useEffect } from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import CameraComponent from '../Component/CameraComponent';
import './CameraApp.css';
import ImageThumbnail from '../Component/ImageThumbnail';
import ThumbnailComponent from '../Component/ThumbnailComponent';
import { useImages } from '../Component/ImagesContext';


function CameraApp() {
  const [images, setImages] = useImages();
  const navigate = useNavigate();

  const handleCapture = (imageSrc) => {
    setImages(prevImages => [...prevImages, imageSrc]);
    navigate('/CaptureImageView');
  };

  const handleDelete = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log("Number of Images:", images.length);
  }, [images]);

  return (
    <div className="camera-app-container">
      
      
      <CameraComponent className="camera-container" onCapture={handleCapture} />
      {/*<div className="image-container">
        {images.length > 0 && (
          images.map((image, index) => (
            <ImageThumbnail key={index} image={image} index={index} onDelete={handleDelete} />
          <ThumbnailComponent key={index} image={image} index={index} />
          ))
        )}
      </div>*/}
      {images.length===0 &&(
        <div className='footer'>&nbsp;</div>
      )}
      {images.length > 0 && (
        <div className='footer'>
          <Link to={{ pathname: "/scannedImages" }}>
            <button className="view-images-button">View Images <span className="image-count">{images.length}</span></button>
          </Link>
          <Link to={{ pathname: "/pdfview", state: { images: images } }}>
            <button className="view-pdf-button">View PDF</button>
          </Link>
        </div>
        
      )}
      {images.length === 0 && (
        <div className='footer'>
          &nbsp; 
        </div>
        
      )}
    </div>
  );
}

export default CameraApp;
