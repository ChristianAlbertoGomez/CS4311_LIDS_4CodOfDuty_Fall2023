import React, { useState } from 'react';

function SortButton() {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option) => {
    // Handle the sorting logic based on the selected option here
    console.log(`Sorting by: ${option}`);

    // Close the options menu
    setShowOptions(false);
  };

  return (
    <div className="sort-button">
      <button onClick={toggleOptions}>Sort By</button>
      {showOptions && (
        <div className="sort-options">
          <button onClick={() => handleOptionClick('Highest to Lowest')}>Highest to Lowest</button>
          <button onClick={() => handleOptionClick('Lowest to Highest')}>Lowest to Highest</button>
          <button onClick={() => handleOptionClick('Time Order')}>Time Order</button>
        </div>
      )}
    </div>
  );
}

export default SortButton;