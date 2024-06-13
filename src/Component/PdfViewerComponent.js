import React, { useState, useEffect } from 'react';
import * as pdfjs from 'pdfjs-dist';

const PdfViewerComponent = ({ pdfBuffer }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const renderPdf = async () => {
      try {
        console.log("PDF Url:",pdfBuffer);
        const loadingTask = pdfjs.getDocument({ url: pdfBuffer });
        const pdf = await loadingTask.promise;
        setNumPages(pdf.numPages);
      } catch (error) {
        console.error('Error rendering PDF:', error);
      }
    };

    renderPdf();
  }, [pdfBuffer]);

  const onPageChange = (page) => {
    setPageNumber(page);
  };

  return (
    <div>
      <canvas id="pdf-canvas" />
      <p>Page {pageNumber} of {numPages}</p>
      <button disabled={pageNumber <= 1} onClick={() => onPageChange(pageNumber - 1)}>Previous</button>
      <button disabled={pageNumber >= numPages} onClick={() => onPageChange(pageNumber + 1)}>Next</button>
    </div>
  );
};

export default PdfViewerComponent;
