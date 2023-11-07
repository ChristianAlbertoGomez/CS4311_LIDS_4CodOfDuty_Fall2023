// Team 4 - Cod of Duty
// Students: Christian Gomez and Carlos Cepeda
// Customer: Devcom
// Copyright © 2023 Team 4. All rights reserved.

import React from 'react';

// Sample data for known devices
const knownDevicesData = [
  {
    id: 1,
    deviceName: 'Device 1',
    ip: '192.168.1.100',
    connectionStatus: 'Connected',
    protocol: 'HTTP',
  },
  {
    id: 2,
    deviceName: 'Device 2',
    ip: '192.168.1.101',
    connectionStatus: 'Disconnected',
    protocol: 'HTTPS',
  },
  {
    id: 3,
    deviceName: 'Device 3',
    ip: '192.168.1.102',
    connectionStatus: 'Connected',
    protocol: 'SSH',
  },
  // Add more devices as needed
];

function KnownDevices() {
  return (
    <div className="known-devices">
      <h2>Known Devices</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Device Name</th>
            <th>IP</th>
            <th>Connection Status</th>
            <th>Protocol</th>
          </tr>
        </thead>
        <tbody>
          {knownDevicesData.map((device) => (
            <tr key={device.id}>
              <td>{device.id}</td>
              <td>{device.deviceName}</td>
              <td>{device.ip}</td>
              <td>{device.connectionStatus}</td>
              <td>{device.protocol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default KnownDevices;