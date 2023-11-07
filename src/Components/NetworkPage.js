// NetworkPage.js

// Import React and useState from React library
import React, { useState } from 'react';

// Import components and styles
import Sidebar from './Sidebar'; // Import the Sidebar component
import AlertTable from './AlertTable'; // Import the AlertTable component
import KnownDevices from './KnownDevices'; // Import the KnownDevices component
import UnknownDevices from './UnknownDevices'; // Import the UnknownDevices component
import './CSS Files/NetworkPage.css'; // Import the CSS styles
import { BsFileText, BsGraphUp } from 'react-icons/bs'; // Import icons from react-icons library
import ConfigServerModal from './ConfigServerModal'; // Import the ConfigServerModal component
import ServerReport from './ServerReport'; // Import the ServerReport component (Nueva página means "New page" in Spanish)

// Define the NetworkPage functional component
const NetworkPage = () => {
  // Define state variables for showing the modal and server report
  const [showModal, setShowModal] = useState(false);
  const [showServerReport, setShowServerReport] = useState(false);

  // Function to toggle the modal's visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Function to toggle the server report's visibility
  const toggleServerReport = () => {
    setShowServerReport(!showServerReport);
  };

  // Render the NetworkPage component
  return (
    <div className='network-page'>
      {/* Render the Sidebar component */}
      <Sidebar />
      <div className='header'>
        <div className='header-content'>
          Network Map
        </div>
      </div>
      <main className='mainBody'>
        <div className='modal-button' onClick={toggleModal}>
          <BsFileText className='icon-button large-icon' />
          <div className='icon-label'>Config Server</div>
        </div>
        <div className='modal-button' onClick={toggleServerReport}>
          <BsGraphUp className='icon-button large-icon' />
          <div className='icon-label'>Server Report</div>
        </div>
        <div className='tables'>
          <div className='table-1'>
            {/* Render the KnownDevices component in table-1 */}
            <KnownDevices />
          </div>
          <div className='table-2'>
            {/* Render the UnknownDevices component in table-2 */}
            <UnknownDevices />
          </div>
        </div>
        {/* Conditionally render the AlertTable component based on showServerReport state */}
        <div className={`AlertTable ${showServerReport ? 'hidden' : ''}`}>
          <AlertTable />
        </div>
        {/* Conditionally render the ConfigServerModal component based on showModal state */}
        {showModal && <ConfigServerModal onClose={toggleModal} />}
        {/* Conditionally render the ServerReport component based on showServerReport state */}
        {showServerReport && <ServerReport onClose={toggleServerReport} />}
      </main>
    </div>
  );
};

// Export the NetworkPage component as the default export
export default NetworkPage;

