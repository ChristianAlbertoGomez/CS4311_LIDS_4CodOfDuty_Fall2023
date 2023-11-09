import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IPAddressDisplay = () => {
  // Use the useState hook to create a state variable called'ipAddress' and a function to set its value, 'setIpAdress'
  const [ipAddress, setIpAddress] = useState('');
  // useEffect hook to perform side 
  useEffect(() => {
    // Make an HTTP request to fetch the user's public IP address
    axios.get('https://api.ipify.org?format=json')
      .then((response) => {
        //If the request is successful, update the 'ipAdress' state variale with retrieved IP address
        setIpAddress(response.data.ip);
      })
      .catch((error) => {
        //If there is an error during request, log the errror to the console
        console.error('Error fetching IP address:', error);
      });
  }, []);// Empty dependency array []  ensures that this effect runs only onceafter the component is mounted
//render the IP address on the component's UI
  return (
    <div style={{textAlign:'right',  paddingRight: '20px'}}>
      <p>IP: {ipAddress}</p>
    </div>
  );
};

export default IPAddressDisplay;
