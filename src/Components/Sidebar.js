import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

import {
  BsDiagram2,
  BsFillExclamationCircleFill,
  BsFillGearFill,
  BsGearFill,
  BsHouseFill,
  BsCloudHaze,
} from 'react-icons/bs';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-title">LIDS</div>
      <ul className="nav-links">
        <li><Link to='/home'><BsHouseFill /> Home</Link></li>
        <li><Link to="/AlertsPage"><BsFillExclamationCircleFill /> Alerts</Link></li>
        <li><Link to="/NetworkPage"><BsDiagram2 /> Network</Link></li>
        <li><BsGearFill /> Settings</li>
        <li><BsCloudHaze /> Disconnect</li>
      </ul>
    </div>
  );
};

export default Sidebar;