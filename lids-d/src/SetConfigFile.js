import React from "react";
import './SetConfigFile.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SetConfigFile = () => {

  const [ file, setFile ] = useState(null);
  const [ progress, setProgress ] = useState({started: false, pc: 0});
  const [ msg, setMsg ] = useState(null);

  function handleUpload(){
    if(!file){
      setMsg("No file uploaded");
      return;
    }
    const fd = new FormData();
    fd.append('file', file);

    setMsg("Uploading...");
    setProgress(prevState => {
      return {...prevState, started: true}
    })
    axios.post('http://127.0.0.1:5001/', fd, {
      // 'http://httpbin.org/post'
      onUploadProgress: (progressEvent) => {setProgress(prevState => {
        return { ...prevState, pc: progressEvent.progress*100}
      }) },
      headers: {
        "Custom-Header": "value",
      }
    })
    .then(res => {
      setMsg("Upload Succesful");
      console.log(res.data);
      const submit = document.getElementById("targetInput");
      submit.removeAttribute("disabled");
    })
    .catch(err =>{ 
      setMsg("Upload Failed");
      console.log(err)
    });
  }


  return (
    <div className="config">
      <div className="title">Welcome to LIDS-D</div>
      <div className="title-2">Please select the Configuration File</div>
      <form>
        <input type="file" accept=".xml" onChange={ (e) => { setFile(e.target.files[0]) } } id="fileInput" />
        <Link to="/home"> 
          <input type="submit" value="Submit" id="targetInput" className="submit-button" onClick={ handleUpload} disabled={file === null}/>
          {progress.started && <progress max="100" value={progress.pc}></progress>}
          {msg && <span>{msg}</span>}
        </Link>
      </form>
    </div>
  );
}

export default SetConfigFile;
