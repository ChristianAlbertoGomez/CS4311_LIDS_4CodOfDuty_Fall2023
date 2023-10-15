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
            <tr key={index}>
              <td>{item.key}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default KeyTable;