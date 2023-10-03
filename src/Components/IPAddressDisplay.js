import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IPAddressDisplay = () => {
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    // Make an HTTP request to fetch the user's public IP address
    axios.get('https://api.ipify.org?format=json')
      .then((response) => {
        setIpAddress(response.data.ip);
      })
      .catch((error) => {
        console.error('Error fetching IP address:', error);
      });
  }, []);

  return (
    <div style={{textAlign:'right',  paddingRight: '20px'}}>
      <p>IP: {ipAddress}</p>
    </div>
  );
};

export default IPAddressDisplay;
