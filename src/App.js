import React from 'react';
import {  BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './View/Home'
import CameraApp from './View/CameraApp';
import CaptureImageView from './View/CapturedImageView';
import PDFView from './View/PdfView';
import { ImagesProvider } from './Component/ImagesContext';


function App() {
  return(
    <Router>
      <ImagesProvider>
      <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/CanvasPOC" element={<HomePage/>}></Route>
            <Route path="/Camera" element={<CameraApp/>}></Route>
            <Route path="/CaptureImageView" element={<CaptureImageView/>}></Route>
            <Route path="/pdfview" element={<PDFView/>}></Route>
          </Routes>
      </ImagesProvider>
          
        </Router>
  )
}

export default App;