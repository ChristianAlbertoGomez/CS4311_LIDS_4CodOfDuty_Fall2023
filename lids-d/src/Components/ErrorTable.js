import React, { useState, useEffect } from 'react';
import './CSS Files/AlertTable.css'; 



const ErrorTable = () => {

  const [errors, setErrors] = useState([]);

  useEffect(() => {
  

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5001/getErrors');
      console.log('HTTP Status Code:', response.status);
      const data = await response.text();
      console.log(data);
      const lines = data.split('\n').filter(line => line.trim() !== '');;
      setErrors(lines);
    }catch (e) {
      console.log('Error fetching data', e);
    }
  };
  fetchData();
    }, []);
    
  return (
    <div className="errors-table">
      <table>
        <thead>
          <tr>
            <th>Errors</th>
          </tr>
        </thead>
        <tbody>
          <ol>
          {errors.map((error, index) => (
             <li key={index}>{error}</li>
          ))}
          </ol>
        </tbody>
      </table>
    </div>
  );


};

export default ErrorTable;