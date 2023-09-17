import React, { useState } from 'react';
import './AlertTable.css'; 


const ErrorTable = () => {
  const initialData = [
    {
      error: 'Error in Port 88',
    },
    {
      error: 'Error connecting LIDS-D',
    },
    {
      error: 'Error reading file ####',
    }
    // Add more data rows as needed
  ];

  const [errors, setErrors] = useState(initialData);

  return (
    <div className="errors-table">
      <h2>    </h2>
      <table>
        <thead>
          <tr>
            <th>Errors</th>
          </tr>
        </thead>
        <tbody>
          {errors.map((item, index) => (
            <tr key={index}>
              <td>{item.error}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


};

export default ErrorTable;