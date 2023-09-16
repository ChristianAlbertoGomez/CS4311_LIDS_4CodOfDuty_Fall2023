import React from "react";
import './SetConfigFile.css';
import { Link } from "react-router-dom";


const SetConfigFile = () => {
  
  const uploadFile = (event) => {
    const config = event.target.files[0];
    const submit = document.getElementById("targetInput");

    if (config) {
      console.log("Selected file ", config.name);
      submit.removeAttribute("disabled");
    }
  };

  return (
    <div className="config"> 
      <h1>Welcome to LIDS</h1>
      <h3>Please select the Configuration File</h3>
      <form>
        <input type="file" onChange={uploadFile} id="fileInput" />
        <Link to="/home">
          <input type="submit" value="submit" onChange={uploadFile} id="targetInput" disabled />
        </Link>
      </form>
    </div>
    
  );

}

export default SetConfigFile;
