import React from 'react';
import './CSS Files/Sidebar.css';
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
        <li ><Link to='/home' className="sidebar-link"><BsHouseFill /> Home</Link></li>
        <li ><Link to="/AlertsPage" className="sidebar-link"><BsFillExclamationCircleFill /> Alerts</Link></li>
        <li ><BsDiagram2 /> Network</li>
        <li ><BsGearFill /> Settings</li>
        <li ><BsCloudHaze /> Disconnect</li>
      </ul>
    </div>
  );
};

export default Sidebar;