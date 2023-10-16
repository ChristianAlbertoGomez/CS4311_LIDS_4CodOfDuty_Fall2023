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
        <li ><Link to="/home" className="sidebar-link"><BsHouseFill /> Home</Link></li>
        <li ><Link to="/AlertsPage" className="sidebar-link"><BsFillExclamationCircleFill /> Alerts</Link></li>
        <li ><Link to="/NetworkPage" className="sidebar-link"><BsDiagram2 /> Network</Link></li>
        <li ><Link to="/home" className="sidebar-link"><BsGearFill /> Settings</Link></li>
        <li ><Link to="/home" className="sidebar-link"><BsCloudHaze /> Disconnect</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;