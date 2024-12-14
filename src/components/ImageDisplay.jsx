import React, { useRef, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";

function ImageDisplay({
  image1,
  image2,
  brushSize,
  brushColor,
  onBrushSizeChange,
  setImage2,
  imageDimensions
}) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const handleSaveMask = () => {
    if (canvasRef.current) {
   
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvasRef.current.props.canvasWidth;
      tempCanvas.height = canvasRef.current.props.canvasHeight;
      const tempContext = tempCanvas.getContext('2d');

     
      tempContext.fillStyle = 'black';
      tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      
      tempContext.globalCompositeOperation = 'source-over';
      tempContext.fillStyle = 'white';
      
     
      const drawingData = canvasRef.current.getSaveData();
      const parsedData = JSON.parse(drawingData);
      
     
      parsedData.lines.forEach(line => {
        tempContext.beginPath();
        tempContext.strokeStyle = 'white';
        tempContext.lineWidth = line.brushRadius * 2;
        tempContext.lineCap = 'round';
        tempContext.lineJoin = 'round';
        
        line.points.forEach((point, index) => {
          if (index === 0) {
            tempContext.moveTo(point.x, point.y);
          } else {
            tempContext.lineTo(point.x, point.y);
          }
        });
        
        tempContext.stroke();
      });

      const maskData = tempCanvas.toDataURL();
      setImage2(maskData);
    }
  };

  const handleClearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear(); 
      setImage2(null); 
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-full lg:w-[50%] flex justify-center items-center bg-gray-100 p-4 border-b-2 lg:border-b-0 lg:border-r-2 border-red-500 relative">
        {image1 ? ( 
          <> 
            <img
              ref={imageRef}
              src={image1}
              alt="Image 1"
              className="max-w-full max-h-full object-contain absolute p-4"
              style={{ width: window.innerWidth / 2, height: window.innerHeight / 2 }}
            />

            <CanvasDraw
              ref={canvasRef}
              canvasWidth={window.innerWidth / 2}
              canvasHeight={window.innerHeight / 2}
              brushColor={brushColor} 
              brushRadius={brushSize}
              hideGrid
              immediateLoading
              lazyRadius={0}
              onChange={handleSaveMask}
              style={{
                backgroundColor: "white",
              }}
            />
          </>
        ) : (
          <p className="text-gray-500">No Uploaded Image </p>
        )}
      </div>
     
      <div className="w-full lg:w-[50%] flex justify-center items-center bg-gray-100 p-4">
        {image2 ? (
          <>
            <img
              src={image2}
              alt="Mask"
              className="max-w-full max-h-full object-contain bg-black" 
              width={window.innerWidth / 2} 
              height={window.innerHeight / 2}
            />
          </>
        ) : (
          <p className="text-gray-500">No Binary Mask</p>
        )}
      </div>

      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-md">
        <label className="text-gray-700">Brush Size: {brushSize}</label>
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={onBrushSizeChange}
          className="w-full"
        />
      </div>


      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer" 
        onClick={handleClearCanvas}
      >
        Clear Canvas
      </div>
    </div>
  );
}

export default ImageDisplay;