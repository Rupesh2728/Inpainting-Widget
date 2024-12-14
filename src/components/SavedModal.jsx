import React from "react";

function SavedImagesModal({ savedImagePairs, onClose, onDeletePair }) {
  
    const downloadImagePair = (pair) => {
        // Function to trigger download for an image
        const downloadImage = (imageDataUrl, filename) => {
          const link = document.createElement('a');
          link.href = imageDataUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
      
        // Download original image
        downloadImage(
          pair.originalImage, 
          `original_${pair.originalFileName || 'image'}`
        );
      
        // Download mask image
        downloadImage(
          pair.maskImage, 
          `mask_${pair.originalFileName || 'image'}`
        );
      };
  
    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Saved Image Pairs</h2>
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {savedImagePairs.length === 0 ? (
          <p className="text-center text-gray-500">No saved image pairs</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedImagePairs.map((pair) => (
              <div 
                key={pair.id} 
                className="border rounded-lg overflow-hidden shadow-md relative"
              >
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center z-10"
                  onClick={() => onDeletePair(pair.id)}
                >
                  ×
                </button>

                <button
                className="absolute top-2 left-2 bg-green-500 text-white rounded-full w-7 h-7 flex items-center justify-center z-10"
                onClick={() => downloadImagePair(pair)}
              >
                
                <img src="https://freeiconshop.com/wp-content/uploads/edd/download-flat.png"/>
              </button>
                <div className="flex">
                  <div className="w-1/2 p-2">
                    <img 
                      src={pair.originalImage} 
                      alt={`Original ${pair.originalFileName}`}
                      className="w-full h-40 object-cover"
                    />
                    <p className="text-sm truncate mt-2">
                      {pair.originalFileName}
                    </p>
                  </div>
                  <div className="w-1/2 p-2">
                    <img 
                      src={pair.maskImage} 
                      alt="Mask"
                      className="w-full h-40 object-cover"
                    />
                    <p className="text-sm text-center mt-2">Mask</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedImagesModal;