import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import Loading from './loading';

const App = () => {
  const [loading, setLoading] = useState(true);
  
  // Simulate an async operation
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
        // Render your main content when loading is false
        <div>
          <h1>Welcome to My App</h1>
          {/* Your main content */}
        </div>
      )}
    </div>
  );
};


export default App;
