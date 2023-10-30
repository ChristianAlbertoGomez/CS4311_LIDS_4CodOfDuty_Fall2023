import React from 'react';
import './CSS Files/ServerReport.css';

const ServerReport = () => {
  const serverData = {
    devicesConnected: 100,
    alerts: 5,
    notifications: 10,
    maliciousPackets: 3,
    protocols: ['HTTP', 'SSH', 'DNS'],
    osTypes: ['Windows', 'Linux', 'Mac'],
    configFile: 'Config_file',
  };

  return (
    <div className='server-report'>
      <h1>Server Report</h1>
      <div className='report-data'>
        <p>Devices Connected: {serverData.devicesConnected}</p>
        <p>Alerts: {serverData.alerts}</p>
        <p>Notifications: {serverData.notifications}</p>
        <p>Malicious Packets: {serverData.maliciousPackets}</p>
        <p>Protocols: {serverData.protocols.join(', ')}</p>
        <p>OS Types: {serverData.osTypes.join(', ')}</p>
        <p>Config File: {serverData.configFile}</p>
      </div>
    </div>
  );
};

export default ServerReport;