import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import ImageDisplay from "./components/ImageDisplay";
import SavedModal from "./components/SavedModal";

function App() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [fileName1, setFileName1] = useState(null);
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState("black");
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [showSavedImages, setShowSavedImages] = useState(false);
  const [savedImagePairs, setSavedImagePairs] = useState([]);

  const saveImagePair = () => {
    if (!image1 || !image2) {
      alert("Please upload an image and create a mask first.");
      return;
    }

    const timestamp = Date.now();
    const originalFileName = fileName1 || `image_${timestamp}`;

    const newPair = {
      id: timestamp,
      originalImage: image1,
      maskImage: image2,
      originalFileName: originalFileName
    };

    
    const existingPairs = JSON.parse(localStorage.getItem('imagePairs') || '[]');

    const updatedPairs = [...existingPairs, newPair];


    localStorage.setItem('imagePairs', JSON.stringify(updatedPairs));

    alert("Image pair saved successfully!");
  };

  const loadSavedImagePairs = () => {

    const savedPairs = JSON.parse(localStorage.getItem('imagePairs') || '[]');

    if (savedPairs.length > 0) {
      setSavedImagePairs(savedPairs);
      setShowSavedImages(true);
    } else {
      alert("No saved image pairs found.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          setImageDimensions({ width: img.width, height: img.height });
        };
        img.src = reader.result;
        setImage1(reader.result);
        setImage2(null);
        setFileName1(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage1 = () => {
    setImage1(null);
    setFileName1(null);
    setImage2(null);
    setImageDimensions({ width: 0, height: 0 });
  };

  const handleBrushSizeChange = (e) => {
    setBrushSize(Number(e.target.value));
  };

  const handleBrushColorChange = (color) => {
    setBrushColor(color);
  };

  const handleDeleteSavedPair = (idToDelete) => {
   
    const existingPairs = JSON.parse(localStorage.getItem('imagePairs') || '[]');
    const updatedPairs = existingPairs.filter(pair => pair.id !== idToDelete);
    
    localStorage.setItem('imagePairs', JSON.stringify(updatedPairs));
    setSavedImagePairs(updatedPairs);

    if (updatedPairs.length === 0) {
      setShowSavedImages(false);
    }
  };

  return (
    <div className="h-screen">
      <NavBar
        onImageUpload={handleImageUpload}
        image1={image1}
        image2 = {image2}
        fileName1={fileName1}
        onRemoveImage1={handleRemoveImage1}
        brushColor={brushColor}
        onBrushColorChange={handleBrushColorChange}
        onSaveImagePair={saveImagePair}
        onLoadSavedPairs={loadSavedImagePairs}
      />
      <ImageDisplay
        image1={image1}
        image2={image2}
        brushSize={brushSize}
        brushColor={brushColor}
        onBrushSizeChange={handleBrushSizeChange}
        setImage2={setImage2}
        imageDimensions={imageDimensions}
      />
      {showSavedImages && (
        <SavedModal 
          savedImagePairs={savedImagePairs} 
          onClose={() => setShowSavedImages(false)}
          onDeletePair={handleDeleteSavedPair}
        />
      )}
    </div>
  );
}

export default App;