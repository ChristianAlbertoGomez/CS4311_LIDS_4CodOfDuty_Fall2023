// Team 4 - Cod of Duty
// Students: Christian Gomez and Carlos Cepeda
// Customer: Devcom
// Copyright © 2023 Team 4. All rights reserved.

import React from 'react';

// Sample data for unknown devices
const unknownDevicesData = [
  {
    id: 1,
    ip: '192.168.1.103',
    protocol: 'FTP',
  },
  {
    id: 2,
    ip: '192.168.1.104',
    protocol: 'Telnet',
  },
  {
    id: 3,
    ip: '192.168.1.105',
    protocol: 'SSH',
  },
  // Add more unknown devices as needed
];

function UnknownDevices() {
  return (
    <div className="unknown-devices">
      <h2>Unknown Devices</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>IP</th>
            <th>Protocol</th>
          </tr>
        </thead>
        <tbody>
          {unknownDevicesData.map((device) => (
            <tr key={device.id}>
              <td>{device.id}</td>
              <td>{device.ip}</td>
              <td>{device.protocol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UnknownDevices;