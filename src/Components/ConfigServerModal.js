import React, { useRef } from 'react';
import './CSS Files/ConfigServerModal.css';
import { BsFileText } from 'react-icons/bs';

const ConfigServerModal = ({ onClose }) => {
  const fileInputRef = useRef(null); // Create a reference for the input element

  const handleFileSubmit = (event) => {
    event.preventDefault();
    const selectedFile = fileInputRef.current.files[0];
    console.log(selectedFile);

    // Redirect the user to '/home'
    window.location.href = '/home';
  };

  const browserForFile = () => {
    fileInputRef.current.click(); // Access the input element through the reference
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
            ref={fileInputRef} // Associate the reference with the input element
            style={{ display: 'none' }} // Hide the file input visually
          />
          <button
            type='button'
            onClick={browserForFile}
            className='modal-browser-button'
          >
            Browse
          </button>
          <button type='submit' style={{ display: 'none' }} /> // This button is hidden and triggers file submission
        </form>
      </div>
    </div>
  );
};

export default ConfigServerModal;
