import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useImages } from '../Component/ImagesContext';

// Ensure pdfmake fonts are imported
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function PDFView() {
  const { images } = useImages();
  const [pdfUrl, setPdfUrl] = useState(null);
  const API_ENDPOINT = 'https://example.com/upload-pdf';
  const [pdfName, setPdfName]="ScanDoc.pdf";
  // Prepare content for PDF
  const content = images.map((imageSrc,index) => ({
    image: imageSrc,
    width: 500,
    pageBreak: index < images.length - 1 ? 'after' : null  // Add page break after all but the last image
  }));

  // Define PDF document definition
  const docDefinition = {
    content: content
  };

  // Create PDF document
  const pdfDoc = pdfMake.createPdf(docDefinition);

  // Function to generate PDF and set URL to state
  const generatePdf = () => {
    pdfDoc.getBuffer((buffer) => {
      const blob = new Blob([buffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setPdfName(pdfName);
    });
  };

  // Use useEffect to generate PDF when component mounts
  useEffect(() => {
    generatePdf();
  }, []); // Empty dependency array to run once on mount

  const handleDownloadPdf = () => {
    // Use blob URL to trigger download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.setAttribute('download', `${pdfName}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // Function to handle upload PDF to server
  const handleUploadPdf = async () => {
    try {
      const formData = new FormData();
      formData.append('file', await fetch(pdfUrl).then(res => res.blob()), `${pdfName}.pdf`);

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: formData
        // Add any additional headers if needed
      });

      if (response.ok) {
        alert('PDF uploaded successfully!');
      } else {
        throw new Error('Failed to upload PDF');
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert('Failed to upload PDF');
    }
  };
  // Render component with download button
  return (
    <div>
      <h1>PDF View</h1>
      {pdfUrl ? (
        <div>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            View PDF
          </a>{' '}
          <button onClick={handleDownloadPdf}>Download PDF</button>
          <button onClick={handleUploadPdf}>Upload PDF</button>
        </div>
      ) : (
        <p>Generating PDF...</p>
      )}
    </div>
  );
}

export default PDFView;
