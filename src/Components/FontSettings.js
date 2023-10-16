// FontSettings.js
import './CSS Files/FontSettings.css';

import React, { useState } from 'react';

const FontSettings = () => {
  const [fontSize, setFontSize] = useState(16); // Default font size
  const [fontColor, setFontColor] = useState('#000000'); // Default font color

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  const handleFontColorChange = (color) => {
    setFontColor(color);
  };

  const colorOptions = [
    '#000000', // Black
    '#ff0000', // Red
    '#8b4513', // Brown
    '#008000', // Green
    '#ffc0cb', // Pink
    '#ffff00', // Yellow
    '#808080', // Grey
  ];

  return (
    <div className="font-settings">
      <h2>Font Settings</h2>
      <div>
        <label htmlFor="fontSize">Font Size:</label>
        <input
          type="range"
          id="fontSize"
          min="12"
          max="24"
          step="1"
          value={fontSize}
          onChange={handleFontSizeChange}
        />
        <span>{fontSize}px</span>
      </div>
      <div>
        <label>Font Color:</label>
        <div className="color-options">
          {colorOptions.map((color, index) => (
            <div
              key={index}
              className="color-option"
              style={{ backgroundColor: color }}
              onClick={() => handleFontColorChange(color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FontSettings;
