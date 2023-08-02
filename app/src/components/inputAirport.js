import React, { useState, useEffect } from 'react';
import '../componentCSS/inputAirport.css'

const TextField = ({ onReceiveData }) => {
  const [textValue, setTextValue] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleSubmit = () => {
    fetch('/api/submit_text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: textValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Call the callback function with the received JSON data
        onReceiveData(data);

        setResponseMessage(data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="inputID">
      <input
        type="text"
        value={textValue}
        onChange={handleInputChange}
        placeholder="Enter your text here"
      />
      <button onClick={handleSubmit}>Submit</button>
      {responseMessage && <p>API Response: {responseMessage}</p>}
    </div>
  );
};

export default TextField;
