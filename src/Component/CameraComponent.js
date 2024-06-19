import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import './CameraComponent.css'; // Import CSS for styling

const CameraComponent = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(true);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
    setCameraOpen(false);
  };

  const restartCamera = () => {
    setCameraOpen(true);
  };

  return (
    <div className="camera-component">
      {cameraOpen ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
          />
          <div>
          <button className="capture-button" onClick={capture}>
            Capture
          </button>
          </div>
          
        </>
      ) : (
        <>
          <p>Snapshot captured!</p>
          <button onClick={restartCamera}>Take Another Snapshot</button>
        </>
      )}
    </div>
  );
};

export default CameraComponent;
