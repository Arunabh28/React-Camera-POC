import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import './CameraComponent.css'; // Import CSS for styling

const CameraComponent = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(true);
  const [facingMode, setFacingMode] = useState('user'); // 'user' or 'environment'

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
    setCameraOpen(false);
  };

  const restartCamera = () => {
    setCameraOpen(true);
  };

  const toggleFacingMode = () => {
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacingMode);
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
            videoConstraints={{ facingMode: facingMode }}
          />
          <div className='capture-button-div'>
            <button onClick={capture}>
              Capture
            </button>
            <button className="toggle-camera-button" onClick={toggleFacingMode}>
              Switch Camera
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
