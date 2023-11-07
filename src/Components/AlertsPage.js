// Team 4 - Cod of Duty
// Students: Christian Gomez and Carlos Cepeda
// Customer: Devcom
// Copyright © 2023 Team 4. All rights reserved.

import React from 'react';
import Sidebar from './Sidebar'; // Import the Sidebar component
import AlertTable from './AlertTable'; // Import the AlertTable component
import './CSS Files/AlertsPage.css'; // Import CSS styles for the AlertsPage component

// Define the AlertsPage functional component
const AlertsPage = () => {
  // Render the AlertsPage component
  return (
    <div className="AlertsPage">
      <div>        
        {/* Render the Sidebar component */}
        <Sidebar />
        <div className="header">
          Alerts {/* Display the "Alerts" heading in the header */}
        </div>
        <main className="mainBody">
          {/* Render the AlertTable component in the mainBody */}
          <AlertTable />
        </main> 
      </div>
    </div>
  );
};

// Export the AlertsPage component as the default export
export default AlertsPage;
