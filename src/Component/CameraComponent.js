import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import '../style/CameraComponent.css'; // Import your CSS file

const CameraComponent = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(true);
  const [facingMode, setFacingMode] = useState('user'); // 'user' or 'environment'
  const [torchOn, setTorchOn] = useState(false);
  const [supportsTorch, setSupportsTorch] = useState(false);
  const [zoom, setZoom] = useState(1); // Default zoom level
  const [supportsZoom, setSupportsZoom] = useState(false);

  useEffect(() => {
    // Check if the camera supports torch and zoom
    const checkCapabilities = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities();

        setSupportsTorch(!!capabilities.torch);
        setSupportsZoom(!!capabilities.zoom);

        track.stop(); // Stop the track to release the camera
      } catch (error) {
        console.error('Error checking camera capabilities:', error);
      }
    };

    checkCapabilities();
  }, [facingMode]); // Re-run this effect when facingMode changes

  const applyConstraints = async (constraints) => {
    if (webcamRef.current) {
      const videoTrack = webcamRef.current.stream.getVideoTracks()[0];
      if (videoTrack) {
        try {
          await videoTrack.applyConstraints(constraints);
        } catch (error) {
          console.error('Error applying constraints:', error);
        }
      }
    }
  };

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

  const zoomIn = () => {
    if (supportsZoom) {
      setZoom((prevZoom) => {
        const newZoom = Math.min(prevZoom + 0.1, 3); // Max zoom level
        applyConstraints({ advanced: [{ zoom: newZoom }] });
        return newZoom;
      });
    } else {
      console.warn('Zoom is not supported on this device.');
    }
  };

  const zoomOut = () => {
    if (supportsZoom) {
      setZoom((prevZoom) => {
        const newZoom = Math.max(prevZoom - 0.1, 1); // Min zoom level
        applyConstraints({ advanced: [{ zoom: newZoom }] });
        return newZoom;
      });
    } else {
      console.warn('Zoom is not supported on this device.');
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
          <div className="controls">
            <button className="capture-button" onClick={capture}>
              <i className="fas fa-camera"></i>
            </button>
            <button className="toggle-camera-button" onClick={toggleFacingMode}>
              <i className="fas fa-sync-alt"></i>
            </button>
            {supportsTorch ? (
              <button className="torch-button" onClick={toggleTorch}>
                <i className={`fas fa-lightbulb ${torchOn ? 'on' : 'off'}`}></i>
              </button>
            ) : (
              <div className="error-message">
                <i className="fas fa-exclamation-triangle"></i>
                <p>Torch</p>
              </div>
            )}
            {supportsZoom ? (
              <>
                <button className="zoom-button" onClick={zoomOut}>
                  <i className="fas fa-search-minus"></i>
                </button>
                <button className="zoom-button" onClick={zoomIn}>
                  <i className="fas fa-search-plus"></i>
                </button>
              </>
            ) : (
              <div className="error-message">
                <i className="fas fa-exclamation-triangle"></i>
                <p>Zoom</p>
              </div>
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
