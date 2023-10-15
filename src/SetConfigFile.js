import React from "react";
import './SetConfigFile.css';
import { Link } from "react-router-dom";
import { useState } from "react";



const SetConfigFile = () => {

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    const submit = document.getElementById("targetInput");
    submit.removeAttribute("disabled");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    
    console.log('Selected file:', selectedFile);
  
  };

  return (
    <div className="config">
      <div className="title">Welcome to LIDS</div>
      <div className="title-2">Please select the Configuration File</div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".xml" onChange={handleFileChange} id="fileInput" />
        <Link to="/home">
          <input type="submit" value="Submit" id="targetInput" className="submit-button" disabled={selectedFile === null} />
        </Link>
      </form>
    </div>
  );
}

export default SetConfigFile;





