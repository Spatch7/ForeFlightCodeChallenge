import React, { useState, useEffect } from 'react';
import TextField from './components/inputAirport';
import logo from './logo.svg';
import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div>
        <h1>Input Airport Identifier</h1>
        <TextField />
        </div>
      </header>
    </div>
  );
}

export default App;
