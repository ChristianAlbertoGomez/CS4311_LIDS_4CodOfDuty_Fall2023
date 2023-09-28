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
