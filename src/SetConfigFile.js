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

  // const submitFile = (event) => {
  //   event.preventDeafult();
  //   window.location.href = 'http://localhost:3000/home';
  // }


  // const history = useHistory();
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   history.push('/home');
  // }

 
  // const submitFile = () => {
  //   const sourceInput = document.getElementById(sourceInput);
  //   const targetInput= document.getElementById(targetInput);

  //   if(!sourceInput || !targetInput){
  //     console.error("No file found");
  //     return 
  //   }
  //   sourceInput.addEventListener("change", function() {
  //     if (sourceInput.files.length > 0){
  //       targetInput.removeAttribute("disabled");
  //     } else {
  //       targetInput.setAttribute("disabled", "disabled");
  //     }
  //   });
  // }
  

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
