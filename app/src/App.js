import React, { useState } from 'react';
import TextField from './components/inputAirport';
import AirportInfo from './components/airportInformation';
import logo from './logo.svg';
import './App.css';

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetJsonData = (data) => {
    setJsonData(data);
    setIsLoading(false);
  };

  const handleLoading = () => {
    setIsLoading(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Input Airport Identifier</h1>
          <TextField onReceiveData={handleSetJsonData} onLoading={handleLoading} />
          <h1>Weather Information</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            jsonData && <AirportInfo data={jsonData} />
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
