import React, { useState } from 'react';
import './CSS Files/AlertTable.css';
import './CSS Files/AlertsPage.css';


const KeyTable = () => {
  const initialData = [
    {
      key: 'Low = Low-Risk',
    },
    {
      key: 'Mid = Medium-Risk',
    },
    {
      key: 'High = High-Risk',
    }
    // Add more data rows as needed
  ];

  const [key, setKey] = useState(initialData);

  // Define a function to determine the row color based on the content
  const getRowColor = (content) => {
    if (content.includes('Low = Low-Risk')) {
      return 'low';
    } else if (content.includes('Mid = Medium-Risk')) {
      return 'mid';
    } else if (content.includes('High = High-Risk')) {
      return 'high';
    }
    // Default to no background color
    return '';
  };

  return (
    <div className="key-table">
      <h2>    </h2>
      <table>
        <thead>
          <tr>
            <th>Key (Level of Danger)</th>
          </tr>
        </thead>
        <tbody>
          {key.map((item, index) => (
            <tr key={index} className={getRowColor(item.key)}>
              <td>{item.key}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default KeyTable;