// CameraComponent.js
import React, { useState,useRef } from 'react';
import Webcam from 'react-webcam';

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
    <>
      {cameraOpen ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          <button onClick={capture}>Capture</button>
        </>
      ) : (
        <>
          <p>Snapshot captured!</p>
          <button onClick={restartCamera}>Take Another Snapshot</button>
        </>
      )}
    </>
  );
};

export default CameraComponent;