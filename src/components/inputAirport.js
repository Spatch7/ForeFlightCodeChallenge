import React, { useState } from 'react';

const TextField = () => {
  const [textValue, setTextValue] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  // Event handler to update the state when the user types in the input field
  const handleInputChange = (event) => {
    setTextValue(event.target.value);
  };

  // Event handler for submitting the text to the Flask server
  const handleSubmit = () => {
    // Replace 'YOUR_FLASK_API_ENDPOINT' with the actual URL of your Flask API endpoint
    fetch('/api/submit_text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: textValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponseMessage(data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
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