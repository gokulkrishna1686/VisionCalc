import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";
import { HiArrowRight } from "react-icons/hi";
import ResultCard from "./Result";
import Instruction from "./Instructuion";

const DrawingCanvasTest = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [processingResult, setProcessingResult] = useState("Start"); // State to store the result
  const color = "#FFFFFF"; // Default brush color set to white
  const brushSize = 65;

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black"; // Set background color to black
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with black
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const size = 500; // Set canvas to be square
    canvas.width = size;
    canvas.height = size;
    initializeCanvas(); // Initialize canvas with black background
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctxRef.current = ctx;
  }, [color]);

  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setDrawing(true);
  };

  const startDrawingTouch = (e) => {
    const touch = e.touches[0]; // Get the first touch point
    const rect = canvasRef.current.getBoundingClientRect();
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing) return;
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  const drawTouch = (e) => {
    if (!drawing) return;
    const touch = e.touches[0]; // Get the first touch point
    const rect = canvasRef.current.getBoundingClientRect();
    ctxRef.current.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    initializeCanvas(); // Reapply black background after clearing
  };

  const saveAsPNG = async () => {
    const canvas = canvasRef.current;
    const resizedCanvas = document.createElement("canvas");
    resizedCanvas.width = 8;
    resizedCanvas.height = 8;
    const resizedCtx = resizedCanvas.getContext("2d");

    // Get the bounding box of the drawing
    const imageData = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;

    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        const index = (y * imageData.width + x) * 4;
        const alpha = imageData.data[index + 3];
        if (alpha > 0) { // Check if pixel is not transparent
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    }

    if (minX > maxX || minY > maxY) {
      minX = 0;
      minY = 0;
      maxX = canvas.width;
      maxY = canvas.height;
    }

    const drawingWidth = maxX - minX;
    const drawingHeight = maxY - minY;

    const scale = Math.min(8 / drawingWidth, 8 / drawingHeight);
    const offsetX = (8 - drawingWidth * scale) / 2;
    const offsetY = (8 - drawingHeight * scale) / 2;

    resizedCtx.fillStyle = "black";
    resizedCtx.fillRect(0, 0, 8, 8);
    resizedCtx.drawImage(
      canvas,
      minX,
      minY,
      drawingWidth,
      drawingHeight,
      offsetX,
      offsetY,
      drawingWidth * scale,
      drawingHeight * scale
    );

    resizedCanvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob, "drawing.png");

      try {
        const response = await fetch("http://127.0.0.1:5000/upload", {
            method: "POST",
            body: formData,
        });
    
        if (response.ok) {
            const data = await response.json();  // Parse JSON response
            console.log("Server Response:", data); // Log the full response
            console.log("Processing Result:", data.processing_result); // Log only the output()
    
            setProcessingResult(data.processing_result); // Update state with the result
        } else {
            alert("Failed to upload image.");
        }
    } catch (error) {
        console.error("Error uploading image:", error);
    }
    
    }, "image/png");
    clearCanvas();
  };

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#67779d", // Dark gray background
        color: "#FFFFFF", // Light text color
        minHeight: "90vh", // Full viewport height
        padding: "10px",
      }}
      className="flex flex-col md:flex-row gap-6 items-center justify-around"
    >
      <Instruction />
      <div className="flex flex-col justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl aspect-square">
          <canvas
            className="border-none rounded-2xl w-full h-full"
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onTouchStart={startDrawingTouch} // Handle touch start
            onTouchMove={drawTouch}         // Handle touch move
            onTouchEnd={stopDrawing}        // Handle touch end
            style={{
              cursor: "crosshair",
              backgroundColor: "#000000", // Ensure canvas background is black
            }}
          />
        </div>
        <div style={{ marginTop: "10px" }} className="flex justify-around w-full">
          <Button
            danger
            outline
            rounded
            className="hover:bg-red-600 hover:text-white cursor-pointer"
            onClick={clearCanvas}
          >
            Clear
          </Button>
          <Button
            primary
            outline
            rounded
            className="hover:bg-[#35476A] hover:text-white cursor-pointer"
            onClick={saveAsPNG}
          >
            <HiArrowRight />
          </Button>
        </div>
      </div>
      <ResultCard result={processingResult} /> {/* Conditionally render ResultCard */}
    </div>
  );
};

export default DrawingCanvasTest;
