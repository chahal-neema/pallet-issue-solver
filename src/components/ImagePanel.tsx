
import React from 'react';
import { Button } from '@/components/ui/button';

interface ImagePanelProps {
  showContours: boolean;
  activeFace: string;
  onToggleContours: () => void;
  onFaceChange: (face: string) => void;
}

const ImagePanel = ({ showContours, activeFace, onToggleContours, onFaceChange }: ImagePanelProps) => {
  const faces = ['Left', 'Front', 'Right', 'Back'];

  const palletImageSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23333'/%3E%3Crect x='20' y='20' width='260' height='60' fill='%23444' stroke='%23ffc107' stroke-width='2'/%3E%3Crect x='20' y='90' width='260' height='60' fill='%23444' stroke='%23ffc107' stroke-width='2'/%3E%3Crect x='20' y='160' width='260' height='60' fill='%23444' stroke='%23ffc107' stroke-width='2'/%3E%3Crect x='20' y='230' width='260' height='60' fill='%23444' stroke='%23ffc107' stroke-width='2'/%3E%3Crect x='20' y='300' width='260' height='60' fill='%23444' stroke='%23f44336' stroke-width='3'/%3E%3Ctext x='150' y='55' fill='white' text-anchor='middle' font-family='Arial' font-size='12'%3ELINZ%3C/text%3E%3Ctext x='150' y='125' fill='white' text-anchor='middle' font-family='Arial' font-size='12'%3ELINZ%3C/text%3E%3Ctext x='150' y='195' fill='white' text-anchor='middle' font-family='Arial' font-size='12'%3ELINZ%3C/text%3E%3Ctext x='150' y='265' fill='white' text-anchor='middle' font-family='Arial' font-size='12'%3ELINZ%3C/text%3E%3Ctext x='150' y='335' fill='white' text-anchor='middle' font-family='Arial' font-size='12'%3ELINZ%3C/text%3E%3C/svg%3E`;

  return (
    <div className="w-2/5 bg-gray-900 flex flex-col">
      <div className="flex-1 bg-gray-800 flex items-center justify-center p-4">
        <img 
          src={palletImageSvg}
          alt="Pallet View" 
          className="max-w-full max-h-full border-2 border-yellow-400 rounded"
        />
      </div>
      
      <div className="bg-gray-700 p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleContours}
            className={`relative w-10 h-5 rounded-full transition-colors ${
              showContours ? 'bg-red-500' : 'bg-gray-400'
            }`}
          >
            <div
              className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transition-transform ${
                showContours ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
          <span className="text-white text-sm">Show contours</span>
        </div>
        
        <div className="flex gap-1">
          {faces.map((face) => (
            <Button
              key={face}
              variant={activeFace === face ? "destructive" : "secondary"}
              size="sm"
              onClick={() => onFaceChange(face)}
              className={`text-xs ${
                activeFace === face 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-gray-600 hover:bg-gray-500 text-white border-gray-500'
              }`}
            >
              {face}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagePanel;
