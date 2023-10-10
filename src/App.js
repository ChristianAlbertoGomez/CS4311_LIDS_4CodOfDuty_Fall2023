import './App.css';
import Sidebar from './Components/Sidebar';
import React, { useState, useEffect } from 'react';
import Loading from './Components/loading';
import AlertTable from './Components/AlertTable';
import NotificationsTable from './Components/NotificationsTable';
import ErrorTable from './Components/ErrorTable';
import KeyTable from './Components/KeyTable';
import SetConfigFile from './SetConfigFile';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import AlertsPage from './Components/AlertsPage';


const App = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulating 3 seconds of loading
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : (
        <div>        
          <Sidebar />
          <div className="header">
              Dashboard
          </div>
          <main className="mainBody">
            <AlertTable />
            <div className="tables">
              <div className="table-1">
                <NotificationsTable />
              </div>
              <div className="table-2">
                <ErrorTable />
              </div>
              <div className="table-2">
                <KeyTable />
              </div>
            </div>
          </main> 
       </div>
      )}
      
    </div>
  );
};


export default App;