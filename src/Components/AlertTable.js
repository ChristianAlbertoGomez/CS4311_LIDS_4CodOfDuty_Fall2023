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
//           <th>Level</th>
//           <th data-sort="date">Timestamp</th>
//           <th data-sort="string">Source IP</th>
//           <th data-sort="numeric">Source Port</th>
//           <th data-sort="string">Destination IP</th>
//           <th data-sort="numeric">Destination Port</th>
//           <th>Description</th>
//         </tr>
//       </thead>
//       <tbody>
//         {/* Add table rows and data here */}
//         <tr>
//           <td className='low'>Low</td>
//           <td>2023-05-10 12:15:30</td>
//           <td>192.168.1.100</td>
//           <td>80</td>
//           <td>203.0.113.10</td>
//           <td>80</td>
//           <td>Multiple Password Attempts</td>
//         </tr>
//         <tr>
//           <td className='mid'>Mid</td>
//           <td>2023-06-15 09:10:20</td>
//           <td>192.168.1.100</td>
//           <td>443</td>
//           <td>203.0.113.10</td>
//           <td>443</td>
//           <td>Account Blocked</td>
//         </tr>
//         <tr>
//           <td className='high'>High</td>
//           <td>2023-03-12 04:20:00</td>
//           <td>192.168.1.100</td>
//           <td>22</td>
//           <td>203.0.113.10</td>
//           <td>53</td>
//           <td>Brute Force Connection</td>
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
      timestamp: '2023-05-10 12:15:30',
      ip: '192.168.1.100',
      port: 80,
      ip2: '203.0.113.10',
      port2: 80,
      description: 'Multiple Password Attempts',
    },
    {
      level: 'Mid',
      timestamp: '2023-06-15 09:10:20',
      ip: '192.168.1.100',
      port: 443,
      ip2: '203.0.113.10',
      port2: 443,
      description: 'Account Blocked',
    },
    {
      level: 'High',
      timestamp: '2023-03-12 04:20:00',
      ip: '194.170.1.101',
      port: 22,
      ip2: '205.0.115.12',
      port2: 53,
      description: 'Brute Force Connection',
    },
    {
      level: 'Low',
      timestamp: '2023-01-01 5:20:30',
      ip: '192.168.1.100',
      port: 80,
      ip2: '203.0.113.10',
      port2: 80,
      description: 'Multiple Password Attempts',
    },
    {
      level: 'Mid',
      timestamp: '2023-10-12 8:45:02',
      ip: '192.168.1.100',
      port: 443,
      ip2: '203.0.113.10',
      port2: 443,
      description: 'Multiple Password Attempts',
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
              Level {sortedColumn === 'level' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </th>
            <th data-sort="date" onClick={() => handleSort('timestamp')}>
              Timestamp {sortedColumn === 'timestamp' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </th>
            <th data-sort="string" onClick={() => handleSort('ip')}>
              Source IP {sortedColumn === 'ip' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </th>
            <th data-sort="numeric" onClick={() => handleSort('port')}>
              Source Port {sortedColumn === 'port' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </th>
            <th data-sort="string" onClick={() => handleSort('ip2')}>
              Destination IP {sortedColumn === 'ip2' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </th>
            <th data-sort="numeric" onClick={() => handleSort('port2')}>
              Destination Port {sortedColumn === 'port2' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className={item.level.toLowerCase()}>{item.level}</td>
              <td>{item.timestamp}</td>
              <td>{item.ip}</td>
              <td>{item.port}</td>
              <td>{item.ip2}</td>
              <td>{item.port2}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertTable;