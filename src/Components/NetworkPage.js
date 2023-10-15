// NetworkPage.js

import React from 'react';
import Sidebar from './Sidebar';
import AlertTable from './AlertTable';
import KnownDevices from './KnownDevices';
import UnknownDevices from './UnknownDevices';
import './CSS Files/NetworkPage.css';

const NetworkPage = () => {
  return (
    <div className='network-page'>
      <div>
        <Sidebar/>
        <div className='header'>
        Network Map
        </div>
        <main className='mainBody'>
          <div className='AlertTable'>
            <AlertTable/>
          </div>
          <div className='tables'>
            <div className='table-1'>
              <KnownDevices/>
            </div>
            <div className='table-2'>
              <UnknownDevices />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NetworkPage;
