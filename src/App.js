import './App.css';
import Sidebar from './Components/Sidebar';
import React, { useState, useEffect } from 'react';
import Loading from './Components/loading';
import AlertTable from './Components/AlertTable';
import NotificationsTable from './Components/NotificationsTable';
import ErrorTable from './Components/ErrorTable';
import SetConfigFile from './SetConfigFile';
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
            <NotificationsTable />
            <ErrorTable />
          </main> 
       </div>
      )}
      
    </div>
  );

  // return(
  //   <div>
  //      <Sidebar />
  //     <main className="mainBody">
  //       <AlertTable />
  //     </main> 
  //   </div>
  // );
};


export default App;
