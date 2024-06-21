import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import '../style/CameraComponent.css'; // Import CSS for styling

const CameraComponent = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(true);
  const [facingMode, setFacingMode] = useState('user'); // 'user' or 'environment'

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
    setCameraOpen(false); // Close camera view after capturing
  };

  const restartCamera = () => {
    setCameraOpen(true); // Reopen camera view
  };

  const toggleFacingMode = () => {
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacingMode); // Toggle between 'user' and 'environment' facing mode
  };

  return (
    <div className="webcam-wrapper">
      {cameraOpen ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
            videoConstraints={{ facingMode: facingMode }}
          />
          <div className='capture-button-div'>
            <button className="capture-button" onClick={capture}>
              Capture
            </button>
            <button className="toggle-camera-button" onClick={toggleFacingMode}>
            &#x21BB;
            <small>Toggle</small>
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
