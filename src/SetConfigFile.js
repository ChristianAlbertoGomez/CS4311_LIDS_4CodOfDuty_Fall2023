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
      <div className="title">Welcome to LIDS</div>
      <div className="title-2">Please select the Configuration File</div>
      <form>
        <input type="file" onChange={uploadFile} id="fileInput"/>
        <Link to="/home">

        <input type="submit" value="Submit" onChange={uploadFile} id="targetInput" className="submit-button" disabled/>

        </Link>
      </form>
    </div>
    
  );

}

export default SetConfigFile;