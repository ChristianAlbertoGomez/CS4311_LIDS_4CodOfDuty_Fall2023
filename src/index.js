import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AlertsPage from './Components/AlertsPage';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SetConfigFile from './SetConfigFile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<SetConfigFile />} />
    <Route path="/home" element={<App/>} />
    <Route path="/AlertsPage" element={<AlertsPage/>} />
  </Routes>
</BrowserRouter>,
document.getElementById("root")
);
