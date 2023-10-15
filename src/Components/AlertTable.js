
import React, { useState,addEventListener, useEffect } from 'react';
import './CSS Files/AlertTable.css';


const AlertTable = () => {
  
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
  const initialData = [
    {
      level: 'Mid',
      time: dateTime,
      port: 64,
      description: 'Account blocked',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-24-2023',
      details: 'Your account has been temporarily restricted, and here is why: We have detected unusual activity, particularly a series of failed login attempts. To safeguard your account from potential unauthorized access, we have taken the precautionary step of blocking access. Think of it as your bank card being temporarily blocked after entering the wrong PIN multiple times.',
    },
    {
      level: 'High',
      time: dateTime,
      port: 99,
      description: 'Brute force connection',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-21-2023',
      details: 'Brace yourself for a digital onslaught - a "Brute Force Connection" is underway. An attacker is systematically trying every possible combination of usernames and passwords to gain access to our system. It iss like a relentless digital burglar attempting every conceivable key until they break in. We have fortified our defenses to detect and thwart such brute force attacks, as they are inherently malicious in nature and pose a severe threat to our security.',
    },
    {
      level: 'Low',
      time: dateTime,
      port: 88,
      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',
    },
    {
      level: 'Mid',
      time: dateTime,
      port: 48,
      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-22-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',
    },
    {
      level: 'Low',
      time: dateTime,
      port: 88,
      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-12-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',

    },
    {
      level: 'Mid',
      time: dateTime,
      port: 64,
      description: 'Account blocked',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-15-2023',
      details: 'Your account has been temporarily restricted, and here is why: We have detected unusual activity, particularly a series of failed login attempts. To safeguard your account from potential unauthorized access, we have taken the precautionary step of blocking access. Think of it as your bank card being temporarily blocked after entering the wrong PIN multiple times.',

    },
    {
      level: 'High',
      time: dateTime,
      port: 99,
      description: 'Brute force connection',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-23-2023',
      details: 'Brace yourself for a digital onslaught - a "Brute Force Connection" is underway. An attacker is systematically trying every possible combination of usernames and passwords to gain access to our system. It is like a relentless digital burglar attempting every conceivable key until they break in. We have fortified our defenses to detect and thwart such brute force attacks, as they are inherently malicious in nature and pose a severe threat to our security.',

    },
    {
      level: 'Low',
      time: dateTime,
      port: 88,
      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',

    },
    {
      level: 'Mid',
      time: dateTime,
      port: 48,
      description: 'Multiple password attempts',

      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',


    },
    {
      level: 'Low',
      time: dateTime,

      port: 88,
      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-20-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',



    },
    {
      level: 'Mid',
      time: dateTime,

      port: 64,
      description: 'Account blocked',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-02-2023',
      details: 'Your account has been temporarily restricted, and here is why: We have detected unusual activity, particularly a series of failed login attempts. To safeguard your account from potential unauthorized access, we have taken the precautionary step of blocking access. Think of it as your bank card being temporarily blocked after entering the wrong PIN multiple times.',


    },
    {
      level: 'High',
      time: dateTime,
      port: 99,
      description: 'Brute force connection',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'Brace yourself for a digital onslaught - a "Brute Force Connection" is underway. An attacker is systematically trying every possible combination of usernames and passwords to gain access to our system. It is like a relentless digital burglar attempting every conceivable key until they break in. We have fortified our defenses to detect and thwart such brute force attacks, as they are inherently malicious in nature and pose a severe threat to our security.',



    },
    {
      level: 'Low',
      time: dateTime,
      port: 88,
      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',



    },
    {
      level: 'Mid',
      time: dateTime,

      port: 48,
      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',


    },
    {
      level: 'Low',
      time: dateTime,

      port: 88,
      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',



    },
    {
      level: 'Mid',
      time: dateTime,

      port: 64,

      description: 'Account blocked',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'Your account has been temporarily restricted, and here is why: We have detected unusual activity, particularly a series of failed login attempts. To safeguard your account from potential unauthorized access, we have taken the precautionary step of blocking access. Think of it as your bank card being temporarily blocked after entering the wrong PIN multiple times.',


    },
    {
      level: 'High',

      time: dateTime,

      port: 99,

      description: 'Brute force connection',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'Brace yourself for a digital onslaught - a "Brute Force Connection" is underway. An attacker is systematically trying every possible combination of usernames and passwords to gain access to our system. It is like a relentless digital burglar attempting every conceivable key until they break in. We have fortified our defenses to detect and thwart such brute force attacks, as they are inherently malicious in nature and pose a severe threat to our security.',

    },
    {
      level: 'Low',

      time: dateTime,

      port: 88,

      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',


    },
    {
      level: 'Mid',

      time: dateTime,

      port: 48,

      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',
    }
    // Add more data rows as needed
  ];


  const [data, setData] = useState([{}]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedColumn, setSortedColumn] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [exportModalVisible, setExportModalVisible] = useState(false);

  const [columnVisibility, setColumnVisibility] = useState({
    Lvl: true,
    Time: true,
    ipSource: true,
    ipDestination: true,
    Port: true,
    Description: true
  });

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const handleCheckboxChange = (columnName) => {
    setColumnVisibility((prevState) => ({
      ...prevState,
      [columnName]: !prevState[columnName],
    }));
  };


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
    const searchString = `${item.level} ${item.time} ${item.ipSource} ${item.ipDestination} ${item.port} ${item.dest_port} ${item.description}`;
    return searchString.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
  };

  const handleExport = () => {
    setExportModalVisible(true);
  };





return (
  
  <div className='table-container'>
    <div class="flex-container">
      <div>
        <input
          className = "filter-search-bar"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <button className="filter-options-button" onClick={toggleMenu}>Filter</button>
      {menuVisible && (
      <div id='menu'>
        <label>
          <input
            type="checkbox"
            checked={columnVisibility.column1}
            onChange={() => handleCheckboxChange('Lvl')}
          />
          Lvl
        </label>
        <label>
          <input
            type="checkbox"
            checked={columnVisibility.column2}
            onChange={() => handleCheckboxChange('Time')}
          />
          Time
        </label>
        <label>
          <input
            type="checkbox"
            checked={columnVisibility.column3}
            onChange={() => handleCheckboxChange('ipSource')}
          />
          IP Source
        </label>
        <label>
          <input
            type="checkbox"
            checked={columnVisibility.column3}
            onChange={() => handleCheckboxChange('ipDestination')}
          />
          IP Destination
        </label>
        <label>
          <input
            type="checkbox"
            checked={columnVisibility.column3}
            onChange={() => handleCheckboxChange('Port')}
          />
          Port
        </label>
        <label>
          <input
            type="checkbox"
            checked={columnVisibility.column3}
            onChange={() => handleCheckboxChange('Description')}
          />
          Description
        </label>
        </div>
        )}
      </div>
    </div>
 
    <table id='sortable-table'>
      <thead>
        <tr>
          {columnVisibility.Lvl && <th onClick={() => handleSort('level')}>
            Lvl {sortedColumn === 'level' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
          </th> }

          {columnVisibility.Time && <th data-sort="numeric" onClick={() => handleSort('time')}>
            Time {sortedColumn === 'time' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
          </th>}

          {columnVisibility.ipSource && <th>IP Source</th>}
          
          {columnVisibility.ipDestination && <th>IP Destination</th>}
         
          
          {columnVisibility.Port && <th data-sort="numeric" onClick={() => handleSort('port')}>
            Port {sortedColumn === 'port' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
          </th>}
         
          {columnVisibility.Description && <th>Description</th>}
          <th>Actions</th>
          </tr>
      </thead>
      <tbody>
        {filteredData.map((item, index) => (
          <tr key={index}>
            {columnVisibility.Lvl &&<td className={item.level.toLowerCase()}>{item.level}</td>}
            {columnVisibility.Time && <td>{item.time}</td>}

            {columnVisibility.ipSource &&<td>{item.ipSource}</td>}


            {columnVisibility.ipDestination &&<td>{item.ipDestination}</td>}
          
        
            {columnVisibility.Port && <td>{item.port}</td>}
        
            {columnVisibility.Description && <td >{item.description}</td>}
            <td>
              <button className = "actions-export-button" onClick={() => handleExport()}>Export</button>
              <button className = "actions-details-button" onClick={() => handleAlertClick(item)}>Details</button>
            </td>
          </tr>
             

//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={index}>
//               <td className={item.level?.toLowerCase()}>{item.level}</td>
//               <td>{item.time}</td>
//               <td>{item.ip}</td>
//               <td>{item.port}</td>
//               <td>{item.description}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

        ))}
      </tbody>
      
    </table>
    {selectedAlert && (
      <AlertDetailsModal
        alert={selectedAlert}
        onClose={() => setSelectedAlert(null)}
        onExport={() => handleExport()}
      />
    )}
    {exportModalVisible && (
      <ExportOptionsModal
        onClose={() => setExportModalVisible(false)}
      />
    )}
  </div>
);
};


const AlertDetailsModal = ({ alert, onClose, onExport }) => {
  return (
    <div className="alert-details-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h3>Alert Details</h3>
        <p><strong>Level:</strong> {alert.level}</p>
        <p><strong>Time:</strong> {alert.time}</p>
        <p><strong>IP Source:</strong> {alert.ipSource}</p>
        <p><strong>IP Destination:</strong> {alert.ipDestination}</p>
        <p><strong>Port:</strong> {alert.port}</p>
        <p><strong>Description:</strong> {alert.description}</p>
        <p><strong>Details:</strong> {alert.details}</p>
        <button className="modal-button-export" onClick={onExport}>Export</button>
      </div>
    </div>
  );
};

const ExportOptionsModal = ({ onClose }) => {
  return (
    <div className="export-options-modal">
      <div className="modal-content2">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h3>Export Options</h3>
        <div className="export-options">
          <div className="export-option">
            <label>Export As:</label>
            <div className="export-as-options">
              <input
                type="radio"
                id="export-pdf"
                name="export-as"
                value="PDF"
              />
              <label htmlFor="export-pdf">PDF</label>

              <input
                type="radio"
                id="export-xml"
                name="export-as"
                value="XML"
              />
              <label htmlFor="export-xml">XML</label>
            </div>
          </div>

          <div className="export-option">
            <label>Save In:</label>
            <div className="save-in-options">
              <button className="modal-button-browse">Browse</button>
              {/* You can add a section for browse options here */}
              <button className="modal-button-export">Export</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertTable;