import React, { useState, useEffect } from 'react';
import pdfMake,{pdfFonts} from 'pdfmake/build/pdfmake';
import PDFViewerComponent from './PdfViewerComponent';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function PDFView({ images }) {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const docDefinition = {
      content: images.map((imageSrc) => ({
        image: imageSrc,
        width: 500, // Adjust width as needed
        pageBreak: 'after' // Add page break after each image
      }))
    };
    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.getBuffer(buffer => {
      setPdfUrl(buffer);
    });
  }, [images]);

  return (
    <div>
      <h1>PDF View</h1>
      {pdfUrl && <PDFViewerComponent pdfUrl={pdfUrl} />}
      <button onClick={() => alert('Done')}>Upload PDF</button>
    </div>
  );
}

export default PDFView;
