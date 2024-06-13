import React, { useState, useEffect  } from 'react';
import { useLocation } from 'react-router-dom';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import PdfViewerComponent from '../Component/PdfViewerComponent';



function PDFView({ images }) {
  
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  //const location = useLocation();
  
  //const images = location.state?.images || [];
  
  const [pdfUrl, setPdfUrl] = useState(null);

  console.log("PDF View:",images.length);
  if(images.length===0){
return(<div>No Images passed</div>)
  }

  const content = images.map((imageSrc) => ({
    image: imageSrc,
    width: 500,
    pageBreak: 'after'
  }));
  const docDefinition = {
    content: content
  };
  const pdfDoc = pdfMake.createPdf(docDefinition);
  pdfDoc.getBuffer(buffer => {
    const blob = new Blob([buffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    console.log(url);
    setPdfUrl(url);
    
  });

 

  return (
    <div>
      <h1>PDF View</h1>
      {pdfUrl && <PdfViewerComponent pdfUrl={pdfUrl} />}
      <button onClick={() => alert('Done')}>Upload PDF</button>
    </div>
  );
}

export default PDFView;
