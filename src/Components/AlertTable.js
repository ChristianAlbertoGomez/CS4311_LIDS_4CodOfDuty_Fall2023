import React, { useState, useEffect } from 'react';
import './AlertTable.css'; 


const AlertTable = () => {

  const [data, setData] = useState([{}]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedColumn, setSortedColumn] = useState(null);

  useEffect(() =>{
    fetch("/alerts").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
      }
    )
  },[])

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
              <td className={item.level?.toLowerCase()}>{item.level}</td>
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
