import React from 'react';
import { Link } from 'react-router-dom';
import CameraComponent from '../CameraComponent';

function Home({ images, onCapture, generatePDF }) {
  return (
    <div>
      <h1>Camera App</h1>
      <CameraComponent onCapture={onCapture} />
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
      <button onClick={generatePDF}>Generate PDF</button>
      <Link to="/pdfview"><button>View PDF</button></Link>
    </div>
  );
}

export default Home;
