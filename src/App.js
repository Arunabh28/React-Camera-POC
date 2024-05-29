import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './View/Home'
import PDFView from './View/Home';
import pdfMake from 'pdfmake/build/pdfmake';

function App() {
  const [images, setImages] = useState([]);

  const handleCapture = (imageSrc) => {
    setImages([...images, imageSrc]);
  };

  const generatePDF = () => {
    const docDefinition = {
      content: images.map((imageSrc) => ({
        image: imageSrc,
        width: 500, // Adjust width as needed
        pageBreak: 'after' // Add page break after each image
      }))
    };
    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.open(); // Open the PDF in a new tab
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home images={images} onCapture={handleCapture} generatePDF={generatePDF} />} />
          <Route path="/pdfview" element={<PDFView images={images} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;