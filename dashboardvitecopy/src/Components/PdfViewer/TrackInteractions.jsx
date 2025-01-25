import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";
import axios from "axios";
import { pdfjs } from "pdfjs-dist";

// pdfjsLib.GlobalWorkerOptions.workerSrc =
//   "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;



const TrackInteractions = (props) => {
  const [numPages, setNumPages] = useState(0);
  const [pageCanvases, setPageCanvases] = useState([]);

  const [startTime, setStartTime] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [inactivityTimer, setInactivityTimer] = useState(null);

  const [scale, setScale] = useState(0.5);

  const viewerRef = useRef(null);

  useEffect(() => {
    // Start tracking time when the PDF is opened
    const handleFileOpen = () => {
      setStartTime(Date.now());
    };

    // Reset inactivity timer when the user interacts with the file
    const resetInactivityTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      setInactivityTimer(setTimeout(handleInactivity, 300000)); // 5 minutes of inactivity
    };

    // Handle when the user is inactive for too long
    const handleInactivity = () => {
      console.log("User is inactive.");
      handleFileClose(); // Send data on inactivity
    };

    // Track when the user closes or navigates away
    const handleFileClose = () => {
      if (startTime) {
        const endTime = Date.now();
        const timeInSeconds = (endTime - startTime) / 1000;
        const timeInMinutes = timeInSeconds / 60;

        // Round to 2 decimal places
        const roundedTimeInMinutes = Math.round(timeInMinutes * 100) / 100;

        console.log(roundedTimeInMinutes);
        setTimeSpent((prev) => prev + roundedTimeInMinutes);
        // sendTimeSpentToBackend(roundedTimeInMinutes);
        // window.location.reload();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        handleFileClose(); // If the user navigates away
      } else {
        resetInactivityTimer();
      }
    };

    window.addEventListener("beforeunload", handleFileClose);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    viewerRef.current?.addEventListener("mousemove", resetInactivityTimer);
    viewerRef.current?.addEventListener("keydown", resetInactivityTimer);

    handleFileOpen();

    // Cleanup
    return () => {
      window.removeEventListener("beforeunload", handleFileClose);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      viewerRef.current?.removeEventListener("mousemove", resetInactivityTimer);
      viewerRef.current?.removeEventListener("keydown", resetInactivityTimer);
    };
    // }, [startTime, resourceId]);
  }, [startTime]);

  const sendTimeSpentToBackend = async (timeInMinutes) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/v1/resource/updateTimeSpent",
        {
          resourceId: "66e1e6defba116cdc7733f50",
          userId: "66e4685083b9637556d6b1ba",
          timeInMinutes: timeInMinutes,
        }
      );
      const response2 = await axios.post(
        "http://127.0.0.1:8080/api/v1/student/updateResourceTime",
        {
          // resourceId: "66e1e6defba116cdc7733f50",
          userId: "66e4685083b9637556d6b1ba",
          timeInMinutes: timeInMinutes,
        }
      );
      console.log("Time sent to backend:", response.data);
      console.log("Time sent to backend2:", response2.data);
    } catch (error) {
      console.error("Error sending time to backend:", error);
    }
  };

  const isImageFile = (url) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif"];
    const extension = url.split(".").pop().toLowerCase();
    return imageExtensions.includes(extension);
  };

  useEffect(() => {
    const loadPdf = async () => {
      console.log(props.fileUrl);

      // if (isImageFile(props.fileUrl)) return;
      console.log(scale);
      try {
        console.log("Loading PDF...");
        const pdfUrl =
          // "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf";
          "./../SIH_24_PPT1.pdf";
        // props.fileUrl;
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        console.log("PDF loaded");
        setNumPages(pdf.numPages);

        // Adjust scale to control the size
        const canvasList = [];

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          await page.render(renderContext).promise;
          canvasList.push(canvas); // Store each canvas
        }

        setPageCanvases(canvasList);
        console.log("All pages rendered");
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPdf();
  }, [scale]);

  const handleZoomIn = () => {
    setScale((prevScale) => prevScale + 0.5); // Increase scale by 0.1
  };

  const handleZoomOut = () => {
    setScale((prevScale) => (prevScale > 0.2 ? prevScale - 0.1 : prevScale)); // Decrease scale, but don't go below 0.2
  };

  return (
    <div
      style={{
        width: "100%",
        overflowY: "scroll",
        height: "90vh",
        border: "1px solid #ccc",
      }}
    >

      <div style={{ marginBottom: "10px" }}>
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
      </div>

      {pageCanvases.map((canvas, index) => (
        <div key={index} style={{ marginBottom: "20px", textAlign: "center" }}>
          <canvas ref={(el) => el?.replaceWith(canvas)}></canvas>
        </div>
      ))}
    </div>
  );
};

export default TrackInteractions;
