// NetworkPage.js

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AlertTable from './AlertTable';
import KnownDevices from './KnownDevices';
import UnknownDevices from './UnknownDevices';
import './CSS Files/NetworkPage.css';
import { BsFileText, BsGraphUp } from 'react-icons/bs';
import ConfigServerModal from './ConfigServerModal';
import ServerReport from './ServerReport'; // Importa la nueva página

const NetworkPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showServerReport, setShowServerReport] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleServerReport = () => {
    setShowServerReport(!showServerReport);
  };

  return (
    <div className='network-page'>
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
            <KnownDevices />
          </div>
          <div className='table-2'>
            <UnknownDevices />
          </div>
        </div>
        <div className={`AlertTable ${showServerReport ? 'hidden' : ''}`}>
          <AlertTable />
        </div>
        {showModal && <ConfigServerModal onClose={toggleModal} />}
        {showServerReport && <ServerReport onClose={toggleServerReport} />}
      </main>
    </div>
  );
};

export default NetworkPage;
