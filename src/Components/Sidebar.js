import React from 'react';
import './Sidebar.css'; // You'll create this CSS file in the next step
import { BsDiagram2, BsFillExclamationCircleFill, BsFillGearFill, BsGearFill, BsHouseFill, BsCloudHaze} from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-title"> LIDS </div>
      <ul className="nav-links">
        <li><BsHouseFill /> Home </li>
        <li><BsFillExclamationCircleFill /> Alerts </li>
        <li><BsDiagram2 /> Network </li>
        <li><BsGearFill /> Settings </li>
        <li><BsCloudHaze /> Disconnect </li>
      </ul>
    </div>
  );
};

export default Sidebar;