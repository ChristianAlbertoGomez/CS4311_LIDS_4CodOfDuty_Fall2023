import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AlertTable from './AlertTable';

import './AlertsPage.css';

const AlertsPage = () => {
  return (
    <div className="AlertsPage">
        <div>        
          <Sidebar />
          <div className="header">
            Alerts
          </div>
          <main className="mainBody">
            <AlertTable />
          </main> 
       </div>
    </div>
  );
};

export default AlertsPage;