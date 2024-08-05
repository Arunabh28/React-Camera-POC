import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';


const CameraComponent = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(true);
  const [facingMode, setFacingMode] = useState('user'); // 'user' or 'environment'
  const [torchOn, setTorchOn] = useState(false);
  const [supportsTorch, setSupportsTorch] = useState(false);

  useEffect(() => {
    // Check if the camera supports torch
    const checkTorchSupport = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities();

        setSupportsTorch(!!capabilities.torch);
        track.stop(); // Stop the track to release the camera
      } catch (error) {
        console.error('Error checking torch support:', error);
      }
    };

    checkTorchSupport();
  }, []);

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

  const toggleTorch = () => {
    if (webcamRef.current) {
      const videoTrack = webcamRef.current.stream.getVideoTracks()[0];
      if (videoTrack && videoTrack.getCapabilities().torch) {
        const newTorchState = !torchOn;
        videoTrack.applyConstraints({
          advanced: [{ torch: newTorchState }]
        });
        setTorchOn(newTorchState);
      }
    }
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
            {supportsTorch && (
              <button className="torch-button" onClick={toggleTorch}>
                
                <small>{torchOn ? 'Turn Off' : 'Turn On'}</small>
              </button>
            )}
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
