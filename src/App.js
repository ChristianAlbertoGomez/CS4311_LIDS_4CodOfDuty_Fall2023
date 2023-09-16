import './App.css';
import Sidebar from './Components/Sidebar';
import React, { useState, useEffect } from 'react';
import Loading from './Components/loading';
import AlertTable from './Components/AlertTable';

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
          <main className="mainBody">
            <AlertTable />
          </main> 
       </div>
      )}
      
    </div>
  );
};


export default App;
