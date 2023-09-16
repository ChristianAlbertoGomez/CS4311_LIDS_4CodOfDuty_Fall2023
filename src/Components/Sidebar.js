import React from 'react';
import './Sidebar.css';
import { BsDiagram2, BsFillExclamationCircleFill, BsFillGearFill, BsGearFill, BsHouseFill} from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="nav-links">
        <li><BsHouseFill />Home</li>
        <li><BsFillExclamationCircleFill />Alerts</li>
        <li><BsDiagram2 />Network</li>
       <li><BsGearFill />Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;