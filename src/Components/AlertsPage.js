import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './AlertsPage.css'; 

const AlertsPage = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Sample alert data (you can replace this with actual data from an API or elsewhere)
  const alertData = [
    {
      id: 1,
      alertLevel: 'High',
      ipSource: '192.168.1.1',
      ipDestination: '10.0.0.1',
      description: 'Security breach detected',
      port: 443,
      time: '15:35 hrs',
      date: '09-24-2023',
      details: 'We have detected a potential security breach in our system. This means that unauthorized access or suspicious'
      +' activity has been identified, which could pose a threat to the security of your data and our network. Our security team is already on it, working to safeguard your information and investigate the incident.',
    },
    {
      id: 2,
      alertLevel: 'Medium',
      ipSource: '10.0.0.2',
      ipDestination: '192.168.1.2',
      description: 'Unusual network traffic',
      port: 80,
      time: '15:35 hrs',
      date: '09-24-2023',
      details: 'We have detected a potential security breach in our system. This means that unauthorized access or suspicious'
      +' activity has been identified, which could pose a threat to the security of your data and our network. Our security team is already on it, working to safeguard your information and investigate the incident.',
    },
    // Add more alert objects as needed
  ];

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
  };

  const closeModal = () => {
    setSelectedAlert(null);
  };

  return (
    <div className="AlertsPage">
      <Sidebar />
      <div className="content">
        <h2>Alerts</h2>
        <table>
          <thead>
            <tr>
              <th>Alert Level</th>
              <th>IP Source</th>
              <th>IP Destination</th>
              <th>Description</th>
              <th>Port</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alertData.map((alert) => (
              <tr key={alert.id}>
                <td>{alert.alertLevel}</td>
                <td>{alert.ipSource}</td>
                <td>{alert.ipDestination}</td>
                <td>{alert.description}</td>
                <td>{alert.port}</td>
                <td>
                  <button onClick={() => handleExport(alert)}>Export</button>
                  <button onClick={() => handleAlertClick(alert)}>Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedAlert && (
          <AlertDetailsModal
            alert={selectedAlert}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

const handleExport = (alert) => {
  
  console.log(`Exporting alert with ID ${alert.id}`);
};

const AlertDetailsModal = ({ alert, onClose }) => {
  return (
    <div className="alert-details-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h3>Alert Details</h3>
        <p><strong>Alert Level:</strong> {alert.alertLevel}</p>
        <p><strong>IP Source:</strong> {alert.ipSource}</p>
        <p><strong>IP Destination:</strong> {alert.ipDestination}</p>
        <p><strong>Description:</strong> {alert.description}</p>
        <p><strong>Port:</strong> {alert.port}</p>
        <p><strong>Time:</strong> {alert.time}</p>
        <p><strong>Date:</strong> {alert.date}</p>
        <p><strong>Info:</strong> {alert.details}</p>
      </div>
    </div>
  );
};



export default AlertsPage;