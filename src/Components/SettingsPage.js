import React from 'react';
import Sidebar from './Sidebar';
import './CSS Files/SettingsPage.css';
import FontSettings from './FontSettings';

const SettingsPage = () => {
  return (
    <div className='settings-page'>
      <div>
        <Sidebar/>
        <div className='headerSettings'>
        Settings
        </div>
        <main className='mainBodySettings'>
          <div>
            <FontSettings/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
