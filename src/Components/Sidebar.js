import React from 'react';
import './Sidebar.css'; // You'll create this CSS file in the next step
import { BsDiagram2, BsFillExclamationCircleFill, BsFillGearFill, BsGearFill, BsHouseFill, BsCloudHaze} from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="nav-links">
      <li className="sidebar-title">LIDS</li>
        <li><BsHouseFill /> Home</li>
        <li><BsFillExclamationCircleFill /> Alerts</li>
        <li><BsDiagram2 /> Network</li>
        <li><BsGearFill /> Settings</li>
        <li><BsCloudHaze /> Disconnect</li>
      </ul>
    </div>
  );
};

export default Sidebar;