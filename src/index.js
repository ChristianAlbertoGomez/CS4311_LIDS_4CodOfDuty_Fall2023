import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AlertsPage from './Components/AlertsPage';
import NetworkPage from './Components/NetworkPage';
import SettingsPage from './Components/SettingsPage';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SetConfigFile from './SetConfigFile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<SetConfigFile />} />
    <Route path="/home" element={<App/>} />
    <Route path="/AlertsPage" element={<AlertsPage/>} />
    <Route path="/NetworkPage" element={<NetworkPage/>} />
    <Route path="/SettingsPage" element={<SettingsPage/>} />
  </Routes>
</BrowserRouter>,
document.getElementById("root")
);

