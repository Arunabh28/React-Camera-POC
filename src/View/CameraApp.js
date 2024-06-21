import React, { useEffect } from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import CameraComponent from '../Component/CameraComponent';
import '../style/CameraApp.css';
import { useImages } from '../Component/ImagesContext';


function CameraApp() {
  const [images, setImages] = useImages();
  const navigate = useNavigate();

  const handleCapture = (imageSrc) => {
    setImages(prevImages => [...prevImages, imageSrc]);
    navigate('/CaptureImageView');
  };

 

  useEffect(() => {
    console.log("Number of Images:", images.length);
  }, [images]);

  return (
    <div className="camera-app-container">
      
      
      <CameraComponent className="camera-container" onCapture={handleCapture} />
      
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
