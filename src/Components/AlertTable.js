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
      timestamp: '2023-05-10 12:15:30',
      source_ip: '192.12.4.101',
      dest_ip: '192.12.8.151',
      source_port: 88,
      dest_port: 37,
      description: 'Multiple password attempts',
    },
    {
      level: 'Mid',
      timestamp: '2021-01-01 5:20:30',
      source_ip: '192.10.14.3',
      dest_ip: '192.13.12.1',
      source_port: 77,
      dest_port: 56,
      description: 'Account blocked',
    },
    {
      level: 'High',
      timestamp: '2022-06-15 09:10:20',
      source_ip: '192.4.11.65',
      dest_ip: '192.3.15.100',
      source_port: 65,
      dest_port: 76,
      description: 'Brute force connection',
    },
    {
      level: 'Low',
      timestamp: '2023-01-01 5:20:30',
      source_ip: '192.2.10.75',
      dest_ip: '192.12.4.98',
      source_port: 23,
      dest_port: 21,
      description: 'Multiple password attempts',
    },
    {
      level: 'Mid',
      timestamp: '2023-03-12 04:20:00',
      source_ip: '192.12.4.31',
      dest_ip: '192.2.8.101',
      source_port: 88,
      dest_port: 32,
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
  // This section is used to sort timestamps based on date and time
  const compareTimestamps = (a, b) => {
    const timestampA = new Date(a.timestamp).getTime();
    const timestampB = new Date(b.timestamp).getTime();

    if (sortDirection === 'asc') {
      return timestampA - timestampB;
    } else {
      return timestampB - timestampA;
    }
  };

  const handleSort = (columnName) => {
    const direction = sortedColumn === columnName && sortDirection === 'asc' ? 'desc' : 'asc';

    const sortedData = [...data].sort((a, b) => {
      if (columnName === 'timestamp') {
        return compareTimestamps(a, b);
      } else if (columnName === 'level') {
        return compareLevels(a, b);
      } else {
        return direction === 'asc'
          ? a[columnName] > b[columnName]
            ? 1
            : -1
          : b[columnName] > a[columnName]
          ? 1
          : -1;
      }
    });

    setData(sortedData);
    setSortDirection(direction);
    setSortedColumn(columnName);
  };

  // This section is used to create the filter search bar
  const [searchQuery, setSearchQuery] = useState('');

  // Function to filter data based on search query
  const filteredData = data.filter((item) => {
    // You can customize this filter logic based on your needs
    const searchString = `${item.level} ${item.timestamp} ${item.source_ip} ${item.dest_ip} ${item.source_port} ${item.dest_port} ${item.description}`;
    return searchString.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='table-container'>
      <input
        className = "filter-search-bar"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <table id='sortable-table'>
        <thead>
          <tr>
            <th onClick={() => handleSort('level')}>
              Lvl {sortedColumn === 'level' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </th>
            <th data-sort="date" onClick={() => handleSort('timestamp')}>
              Timestamp {sortedColumn === 'timestamp' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </th>
            <th data-sort="string" onClick={() => handleSort('source_ip')}>
              Source IP {sortedColumn === 'source_ip' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </th>
            <th data-sort="sting" onClick={() => handleSort('dest_ip')}>
              Dest IP {sortedColumn === 'dest_ip' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </th>
            <th data-sort="numeric" onClick={() => handleSort('source_port')}>
              Source Port {sortedColumn === 'source_port' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </th>
            <th data-sort="numeric" onClick={() => handleSort('dest_port')}>
              Dest Port {sortedColumn === 'dest_port' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td className={item.level.toLowerCase()}>{item.level}</td>
              <td>{item.timestamp}</td>
              <td>{item.source_ip}</td>
              <td>{item.dest_ip}</td>
              <td>{item.source_port}</td>
              <td>{item.dest_port}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertTable;
