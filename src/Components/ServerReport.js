// Team 4 - Cod of Duty
// Students: Christian Gomez and Carlos Cepeda
// Customer: Devcom
// Copyright © 2023 Team 4. All rights reserved.

import React from 'react';
import './CSS Files/ServerReport.css'; // Import CSS styles for the ServerReport component

// Define the ServerReport functional component
const ServerReport = () => {
  // Define serverData object with server report data
  const serverData = {
    devicesConnected: 100,
    alerts: 5,
    notifications: 10,
    maliciousPackets: 3,
    protocols: ['HTTP', 'SSH', 'DNS'],
    osTypes: ['Windows', 'Linux', 'Mac'],
    configFile: 'Config_file',
  };

  // Render the ServerReport component
  return (
    <div className='server-report'>
      <h1>Server Report</h1> {/* Render the title "Server Report" */}
      <div className='report-data'>
        <p>Devices Connected: {serverData.devicesConnected}</p> {/* Display the number of devices connected */}
        <p>Alerts: {serverData.alerts}</p> {/* Display the number of alerts */}
        <p>Notifications: {serverData.notifications}</p> {/* Display the number of notifications */}
        <p>Malicious Packets: {serverData.maliciousPackets}</p> {/* Display the number of malicious packets */}
        <p>Protocols: {serverData.protocols.join(', ')}</p> {/* Display the list of protocols */}
        <p>OS Types: {serverData.osTypes.join(', ')}</p> {/* Display the list of OS types */}
        <p>Config File: {serverData.configFile}</p> {/* Display the configuration file name */}
      </div>
    </div>
  );
};

// Export the ServerReport component as the default export
export default ServerReport;
