import React from "react";

function NavBar({ 
  onImageUpload, 
  image1, 
  image2,
  fileName1, 
  onRemoveImage1, 
  brushColor, 
  onBrushColorChange,
  onSaveImagePair,
  onLoadSavedPairs 
}) {
  const colors = ["black", "red", "blue", "green", "yellow", "purple", "orange"];

  return (
    <div className="flex justify-between items-center bg-gray-800 text-white px-4 py-4">
      <h1 className="text-lg font-bold">InPainting Widget</h1>

      <div className="flex items-center">
        
        {image1 && image2 && (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mr-4"
            onClick={onSaveImagePair}
          >
            Save Image Pair
          </button>
        )}

        {/* Load Saved Images Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-4"
          onClick={onLoadSavedPairs}
        >
          Saved Images
        </button>

        {/* Image Upload/Remove */}
        {!image1 ? (
          <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
            />
          </label>
        ) : (
          <div className="flex items-center">
            <span className="text-white mr-2">{fileName1}</span>
            <button
              className="bg-red-500 text-white px-2 rounded-full hover:bg-red-600"
              onClick={onRemoveImage1}
            >
              X
            </button>
          </div>
        )}

        {/* Brush Colors */}
        <div className="flex ml-4">
          {colors.map((color) => (
            <div
              key={color}
              className={`w-6 h-6 rounded-full cursor-pointer mr-2 ${
                color === brushColor ? "ring-2 ring-white" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => onBrushColorChange(color)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NavBar;