// Team 4 - Cod of Duty
// Students: Christian Gomez and Carlos Cepeda
// Customer: Devcom
// Copyright © 2023 Team 4. All rights reserved.

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AlertsPage from './Components/AlertsPage';
import NetworkPage from './Components/NetworkPage';
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
  </Routes>
</BrowserRouter>,
document.getElementById("root")
);

