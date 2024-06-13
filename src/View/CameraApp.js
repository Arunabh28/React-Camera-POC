import React,{useState,useEffect} from 'react';
import { Link  } from 'react-router-dom';
import CameraComponent from '../Component/CameraComponent';



function CameraApp() {
  const [images, setImages] = useState([]);

  const handleCapture = (imageSrc) => {
    
    //setImages([...images, imageSrc]);
    setImages(prevImages => [...prevImages, imageSrc]);
    
  };
  useEffect(() => {
    console.log("Number of Images:", images.length);
    
  }, [images]);
  return (
    <div>
      <h1>Camera App</h1>
      <CameraComponent onCapture={handleCapture} />
      <div className="image-container">
        {images.map((image, index) => (
          <div key={index} className="image-wrapper">
            <img
              src={image}
              alt={`Capture ${index}`}
              className="captured-image"
            />
          </div>
        ))}
      </div>
      
      <Link to={{pathname:"/pdfview", state:{images}}}><button>View PDF</button></Link>
      
      

    </div>
  );
}

export default CameraApp;
