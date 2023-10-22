import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AlertTable from './AlertTable';
import KnownDevices from './KnownDevices';
import UnknownDevices from './UnknownDevices';
import './CSS Files/NetworkPage.css';
import { BsFileText } from 'react-icons/bs';
import ConfigServerModal from './ConfigServerModal';

const NetworkPage = () => {
  const [isScreenVisible, setScreenVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleScreen = () => {
    setScreenVisible(!isScreenVisible);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className='network-page'>
      <div>
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
          <div className='tables'>
            <div className='table-1'>
              <KnownDevices />
            </div>
            <div className='table-2'>
              <UnknownDevices />
            </div>
          </div>
          <div className={`AlertTable ${isScreenVisible ? 'visible' : ''}`}>
            <AlertTable />
          </div>
        </main>
      </div>
      {showModal && <ConfigServerModal onClose={toggleModal} />}
    </div>
  );
};

export default NetworkPage;
