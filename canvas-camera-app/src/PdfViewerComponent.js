import React, { useState, useEffect } from 'react';
import * as pdfjs from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

// Set the path to the workerSrc
pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.mjs';

const PdfViewerComponent = ({ pdfUrl }) => {
  const [pdfData, setPdfData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        setPdfData(pdf);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    fetchPdf();

    return () => {
      // Clean up PDF data when unmounting
      if (pdfData) {
        pdfData.destroy();
      }
    };
  }, [pdfUrl, pdfData]); // Include pdfData in the dependency array

  const nextPage = () => {
    if (pdfData && currentPage < pdfData.numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>Previous Page</button>
        <button onClick={nextPage} disabled={currentPage === (pdfData ? pdfData.numPages : 1)}>Next Page</button>
      </div>
      {pdfData && (
        <div>
          <PdfPage pdfData={pdfData} pageNumber={currentPage} />
        </div>
      )}
      {!pdfData && <div>Loading...</div>}
    </div>
  );
};

const PdfPage = ({ pdfData, pageNumber }) => {
  const canvasRef = React.useRef();
  const renderTaskRef = React.useRef(null);

  useEffect(() => {
    const renderPage = async () => {
      try {
        // Cancel previous rendering task if it exists
        if (renderTaskRef.current !== null) {
          renderTaskRef.current.cancel();
        }

        const page = await pdfData.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        // Start rendering the page and store the task reference
        renderTaskRef.current = page.render(renderContext);
        await renderTaskRef.current.promise;
      } catch (error) {
        console.error(`Error rendering page ${pageNumber} of PDF:`, error);
      }
    };

    if (pdfData) {
      renderPage();
    }

    return () => {
      // Cleanup: cancel the rendering task if it exists
      if (renderTaskRef.current !== null) {
        renderTaskRef.current.cancel();
      }
    };
  }, [pdfData, pageNumber]);

  return <canvas ref={canvasRef} />;
};

export default PdfViewerComponent;
