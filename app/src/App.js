import React, { useState } from 'react';
import TextField from './components/inputAirport';
import AirportInfo from './components/airportInformation';
import Compass from './components/compass';
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
    <div>
      <h1>Input Airport Identifier</h1>
      <TextField onReceiveData={handleSetJsonData} onLoading={handleLoading} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        jsonData && <AirportInfo data={jsonData} />
      )}
      {jsonData && jsonData.best_runway && jsonData.best_runway.magneticHeading !== undefined && (
        <div>
          <h2>Best Runway: {jsonData.best_runway.name}</h2>
          <Compass angle={jsonData.best_runway.magneticHeading} />
        </div>
      )}
    </div>
  );
}

export default App;
