import React from 'react';
import {  BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './View/layout';
import HomePage from './View/Home'
import CameraApp from './View/CameraApp';
import CaptureImageView from './View/CapturedImageView';
import ScannedImageView from './View/ScannedImageViewer';
import PDFView from './View/PdfView';
import { ImagesProvider } from './Component/ImagesContext';


function App() {
  return(
    <Router>
      <Layout>
      <ImagesProvider>
      <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/CanvasPOC" element={<HomePage/>}></Route>
            <Route path="/Camera" element={<CameraApp/>}></Route>
            <Route path="/CaptureImageView" element={<CaptureImageView/>}></Route>
            <Route path="/scannedImages" element={<ScannedImageView/>}></Route>
            <Route path="/pdfview" element={<PDFView/>}></Route>
          </Routes>
      </ImagesProvider>
      </Layout>
      
          
        </Router>
  )
}

export default App;