import React, { useRef } from 'react';
import './CSS Files/ConfigServerModal.css';
import { BsFileText } from 'react-icons/bs';

const ConfigServerModal = ({ onClose }) => {
  const fileInputRef = useRef(null); // Crea una referencia para el elemento input

  const handleFileSubmit = (event) => {
    event.preventDefault();
    const selectedFile = fileInputRef.current.files[0];
    console.log(selectedFile);
    
    window.location.href = '/home';
  };

  const browserForFile = () => {
    fileInputRef.current.click(); // Accede al elemento input a través de la referencia
  };

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <button className='close-button' onClick={onClose}>X</button>
        <BsFileText className='modal-icon' />
        <div className='modal-text'>Config_File.xml</div>
        <button className='modal-start-button' onClick={handleFileSubmit}>
          Start Server
        </button>
        <form onSubmit={handleFileSubmit}>
          <input
            type='file'
            name='fileInput'
            id='fileInput'
            ref={fileInputRef} // Asocia la referencia con el elemento input
            style={{ display: 'none' }}
          />
          <button
            type='button'
            onClick={browserForFile}
            className='modal-browser-button'
          >
            Browser
          </button>
          <button type='submit' style={{ display: 'none' }} />
        </form>
      </div>
    </div>
  );
};

export default ConfigServerModal;
