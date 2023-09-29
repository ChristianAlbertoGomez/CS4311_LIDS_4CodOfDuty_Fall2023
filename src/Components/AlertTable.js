import React, { useState } from 'react';
import './AlertTable.css'; 
import { AlertInfo } from '../AlertInfo';

const AlertTable = () => {
  const initialData = [
    {
      level: 'Low',
      time: 9.152,
      port: 88,
      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',
    },
    {
      level: 'Mid',
      time: 9.152,
      port: 64,
      description: 'Account blocked',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-24-2023',
      details: 'Your account has been temporarily restricted, and here is why: We have detected unusual activity, particularly a series of failed login attempts. To safeguard your account from potential unauthorized access, we have taken the precautionary step of blocking access. Think of it as your bank card being temporarily blocked after entering the wrong PIN multiple times.',
    },
    {
      level: 'High',
      time: 9.152,
      port: 99,
      description: 'Brute force connection',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-21-2023',
      details: 'Brace yourself for a digital onslaught - a "Brute Force Connection" is underway. An attacker is systematically trying every possible combination of usernames and passwords to gain access to our system. It iss like a relentless digital burglar attempting every conceivable key until they break in. We have fortified our defenses to detect and thwart such brute force attacks, as they are inherently malicious in nature and pose a severe threat to our security.',
    },
    {
      level: 'Low',
      time: 2.233,
      port: 88,
      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',
    },
    {
      level: 'Mid',
      time: 5.312,
      port: 48,
      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-22-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',
    },
    {
      level: 'Low',
      time: 8.233,
      port: 88,
      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-12-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',

    },
    {
      level: 'Mid',
      time: 7.653,
      port: 64,
      description: 'Account blocked',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-15-2023',
      details: 'Your account has been temporarily restricted, and here is why: We have detected unusual activity, particularly a series of failed login attempts. To safeguard your account from potential unauthorized access, we have taken the precautionary step of blocking access. Think of it as your bank card being temporarily blocked after entering the wrong PIN multiple times.',

    },
    {
      level: 'High',
      time: 9.152,
      port: 99,
      description: 'Brute force connection',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-23-2023',
      details: 'Brace yourself for a digital onslaught - a "Brute Force Connection" is underway. An attacker is systematically trying every possible combination of usernames and passwords to gain access to our system. It is like a relentless digital burglar attempting every conceivable key until they break in. We have fortified our defenses to detect and thwart such brute force attacks, as they are inherently malicious in nature and pose a severe threat to our security.',

    },
    {
      level: 'Low',
      time: 2.233,
      port: 88,
      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',

    },
    {
      level: 'Mid',
      time: 5.312,
      port: 48,
      description: 'Multiple password attempts',

      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',


    },
    {
      level: 'Low',
      time: 8.233,

      port: 88,
      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-20-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',



    },
    {
      level: 'Mid',
      time: 7.653,

      port: 64,
      description: 'Account blocked',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-02-2023',
      details: 'Your account has been temporarily restricted, and here is why: We have detected unusual activity, particularly a series of failed login attempts. To safeguard your account from potential unauthorized access, we have taken the precautionary step of blocking access. Think of it as your bank card being temporarily blocked after entering the wrong PIN multiple times.',


    },
    {
      level: 'High',
      time: 9.152,
      port: 99,
      description: 'Brute force connection',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'Brace yourself for a digital onslaught - a "Brute Force Connection" is underway. An attacker is systematically trying every possible combination of usernames and passwords to gain access to our system. It is like a relentless digital burglar attempting every conceivable key until they break in. We have fortified our defenses to detect and thwart such brute force attacks, as they are inherently malicious in nature and pose a severe threat to our security.',



    },
    {
      level: 'Low',
      time: 2.233,

      port: 88,
      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',



    },
    {
      level: 'Mid',
      time: 5.312,

      port: 48,
      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',


    },
    {
      level: 'Low',
      time: 8.233,

      port: 88,
      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',



    },
    {
      level: 'Mid',
      time: 7.653,

      port: 64,
      description: 'Account blocked',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'Your account has been temporarily restricted, and here is why: We have detected unusual activity, particularly a series of failed login attempts. To safeguard your account from potential unauthorized access, we have taken the precautionary step of blocking access. Think of it as your bank card being temporarily blocked after entering the wrong PIN multiple times.',


    },
    {
      level: 'High',
      time: 9.152,

      port: 99,
      description: 'Brute force connection',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'Brace yourself for a digital onslaught - a "Brute Force Connection" is underway. An attacker is systematically trying every possible combination of usernames and passwords to gain access to our system. It is like a relentless digital burglar attempting every conceivable key until they break in. We have fortified our defenses to detect and thwart such brute force attacks, as they are inherently malicious in nature and pose a severe threat to our security.',

    },
    {
      level: 'Low',
      time: 2.233,

      port: 88,
      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',


    },
    {
      level: 'Mid',
      time: 5.312,

      port: 48,
      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',
    }
    // Add more data rows as needed
  ];

  const [data, setData] = useState(initialData);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedColumn, setSortedColumn] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [exportFormat, setExportFormat] = useState('PDF'); // Default export format
  const [saveLocation, setSaveLocation] = useState('');

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

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
  };

  const handleExport = () => {
    setExportModalVisible(true);
  };

  const handleSaveInChange = (value) => {
    setSaveLocation(value);
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
            <th>IP Source</th>
            <th>IP Destination</th>
            <th data-sort="numeric" onClick={() => handleSort('port')}>
              Port {sortedColumn === 'port' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className={item.level.toLowerCase()}>{item.level}</td>
              <td>{item.time}</td>

              <td>{item.ipSource}</td>
              <td>{item.ipDestination}</td>

              <td>{item.port}</td>
              <td>{item.description}</td>
              <td>
                <button onClick={() => handleExport()}>Export</button>
                <button onClick={() => handleAlertClick(item)}>Details</button>
              </td>
            </tr>
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
        <button onClick={onExport}>Export</button>
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
              <button>Browse</button>
              {/* You can add a section for browse options here */}
            </div>
          </div>
        </div>
        <button>Export</button>
      </div>
    </div>
  );
};

export default AlertTable;