import React, { useState } from 'react';
import './AlertTable.css'; 

const AlertTable = () => {
  const initialData = [
    {
      level: 'Low',
      timeAndDate: '09-24-2023 09:06 MST',
      ip_source: '192.12.4.101',
      ip_destination: '192.12.2.111',
      port: 88,
      description: 'Multiple password attempts',
    },
    {
      level: 'Mid',
      timeAndDate: '09-24-2023 11:56 MST',
      ip_source: '182.12.4.101',
      ip_destination: '131.12.1.121',
      port: 64,
      description: 'Account blocked',
    },
    {
      level: 'High',
      timeAndDate: '09-24-2023 17:46 MST',
      ip_source: '192.12.03.101',
      ip_destination: '162.17.3.111',
      port: 99,
      description: 'Brute force connection',
    },
    {
      level: 'Low',
      timeAndDate: '09-24-2023 13:25 MST',
      ip_source: '192.12.4.101',
      ip_destination: '192.12.2.111',
      port: 88,
      description: 'Multiple password attempts',
    },
    {
      level: 'Mid',
      timeAndDate: '09-24-2023 17:14 MST',
      ip_source: '172.12.4.101',
      ip_destination: '162.17.3.111',
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
              IP Source {sortedColumn === 'ip_source' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </th>
            <th data-sort="numeric" onClick={() => handleSort('ip')}>
              IP Destination {sortedColumn === 'ip_destination' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
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
              <td>{item.timeAndDate}</td>
              <td>{item.ip_source}</td>
              <td>{item.ip_destination}</td>
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
