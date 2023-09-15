// import React from 'react';
// import './AlertTable.css'; 

// document.addEventListener('DOMContentLoaded', function() {
//   const table = document.getElementById('sortable-table');
//   const thList = table.querySelectorAll('th');

//   thList.forEach(function(th) {
//       th.addEventListener('click', function() {
//           const isNumeric = th.getAttribute('data-sort') === 'numeric';
//           sortTable(table, th.cellIndex, isNumeric);
//       });
//   });

//   function sortTable(table, columnIndex, isNumeric) {
//       const tbody = table.querySelector('tbody');
//       const rows = Array.from(tbody.querySelectorAll('tr'));

//       rows.sort(function(rowA, rowB) {
//           const cellA = rowA.cells[columnIndex].textContent;
//           const cellB = rowB.cells[columnIndex].textContent;

//           if (isNumeric) {
//               return parseFloat(cellA) - parseFloat(cellB);
//           } else {
//               return cellA.localeCompare(cellB);
//           }
//       });

//       rows.forEach(function(row) {
//           tbody.appendChild(row);
//       });
//   }
// });

// const AlertTable = () => {
//   return (
    
//     <div className='table-container'>
//       <table id='sortable-table'>
//       <thead>
//         <tr>
//           <th>Lvl</th>
//           <th data-sort="numeric">Time</th>
//           <th data-sort="numeric">IP</th>
//           <th data-sort="numeric">Port</th>
//           <th>Description</th>
//         </tr>
//       </thead>
//       <tbody>
//         {/* Add table rows and data here */}
//         <tr>
//           <td className='low'>Low</td>
//           <td>8.233</td>
//           <td>192.12.4.101</td>
//           <td>88</td>
//           <td>Multiple password attempts</td>
//         </tr>
//         <tr>
//           <td className='mid'>Mid</td>
//           <td>7.653</td>
//           <td>182.12.4.101</td>
//           <td>64</td>
//           <td>Account blocked</td>
//         </tr>
//         <tr>
//           <td className='high'>High</td>
//           <td>9.152</td>
//           <td>192.12.03.101</td>
//           <td>99</td>
//           <td>Brute force connection</td>
//         </tr>
//         {/* Add more rows as needed */}
//       </tbody> 
//     </table>
//   </div>
//   )
// };
import React, { useState } from 'react';
import './AlertTable.css'; 


const AlertTable = () => {
  const initialData = [
    {
      level: 'Low',
      time: 8.233,
      ip: '192.12.4.101',
      port: 88,
      description: 'Multiple password attempts',
    },
    {
      level: 'Mid',
      time: 7.653,
      ip: '182.12.4.101',
      port: 64,
      description: 'Account blocked',
    },
    {
      level: 'High',
      time: 9.152,
      ip: '192.12.03.101',
      port: 99,
      description: 'Brute force connection',
    },
    {
      level: 'Low',
      time: 2.233,
      ip: '192.12.4.101',
      port: 88,
      description: 'Multiple password attempts',
    },
    {
      level: 'Mid',
      time: 5.312,
      ip: '172.12.4.101',
      port: 48,
      description: 'Multiple password attempts',
    }
    // Add more data rows as needed
  ];

  const [data, setData] = useState(initialData);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedColumn, setSortedColumn] = useState(null);

  const compareLevels = (a, b) => {
    const levels = ['Low', 'Mid', 'High'];
    const levelA = levels.indexOf(a.level);
    const levelB = levels.indexOf(b.level);

    if (sortDirection === 'asc') {
      return levelA - levelB;
    } else {
      return levelB - levelA;
    }
  };

  const handleSort = (columnName) => {
    const direction = sortedColumn === columnName && sortDirection === 'asc' ? 'desc' : 'asc';

    const sortedData = [...data].sort((a, b) => {
      if (columnName === 'level') {
        return compareLevels(a, b);
      } else {
        return direction === 'asc' ? a[columnName] - b[columnName] : b[columnName] - a[columnName];
      }
    });

    setData(sortedData);
    setSortDirection(direction);
    setSortedColumn(columnName);
  };

  return (
    <div className='table-container'>
      <table id='sortable-table'>
        <thead>
          <tr>
            <th onClick={() => handleSort('level')}>
              Lvl {sortedColumn === 'level' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </th>
            <th data-sort="numeric" onClick={() => handleSort('time')}>
              Time {sortedColumn === 'time' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </th>
            <th data-sort="numeric" onClick={() => handleSort('ip')}>
              IP {sortedColumn === 'ip' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </th>
            <th data-sort="numeric" onClick={() => handleSort('port')}>
              Port {sortedColumn === 'port' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className={item.level.toLowerCase()}>{item.level}</td>
              <td>{item.time}</td>
              <td>{item.ip}</td>
              <td>{item.port}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertTable;
