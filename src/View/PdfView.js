import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useImages } from "../Component/ImagesContext";

// Ensure pdfmake fonts are imported
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function PDFView() {
  const [images, setImages] = useImages();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfName] = useState("ScanDoc");
  const [errorMessage, setErrorMessage] = useState("");

  const API_ENDPOINT = "https://example.com/upload-pdf";

 

  useEffect(() => {
    const generatePdf = async () => {
      try {
        if (!images || images.length === 0) {
          throw new Error("No images available for PDF generation.");
        }

        // Prepare content for PDF
        const content = images.map((imageSrc, index) => ({
          image: imageSrc,
          width: 500,
          pageBreak: index < images.length - 1 ? "after" : null,
        }));

        // Define PDF document definition
        const docDefinition = {
          content: content,
        };

        // Create PDF document
        const pdfDoc = pdfMake.createPdf(docDefinition);

        // Generate PDF and set URL to state
        pdfDoc.getBuffer((buffer) => {
          const blob = new Blob([buffer], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
        });
      } catch (err) {
        console.error(err);
        setErrorMessage(err.message);
      }
    };

    if (images) {
      generatePdf();
    }

    // Cleanup function
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [images]);

  const handleDownloadPdf = () => {
    if (pdfUrl) {
      // Use blob URL to trigger download
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.setAttribute("download", `${pdfName}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleUploadPdf = async () => {
    try {
      if (!pdfUrl) {
        throw new Error("PDF URL is not available for upload.");
      }

      const formData = new FormData();
      formData.append(
        "file",
        await fetch(pdfUrl).then((res) => res.blob()),
        `${pdfName}.pdf`
      );

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: formData,
        // Add any additional headers if needed
      });

      if (response.ok) {
        alert("PDF uploaded successfully!");
      } else {
        throw new Error("Failed to upload PDF");
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("Failed to upload PDF");
    }
  };

  return (
    <div>
      <h1>PDF View</h1>
      {pdfUrl ? (
        <div>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            View PDF
          </a>{" "}
          <button onClick={handleDownloadPdf}>Download PDF</button>
          <button onClick={handleUploadPdf}>Upload PDF</button>
        </div>
      ) : (
        <p>Generating PDF...</p>
      )}
      {errorMessage && <p>Error: {errorMessage}</p>}
    </div>
  );
}

export default PDFView;
