import React, { useState } from 'react';
import TextField from './components/inputAirport';
import AirportInfo from './components/airportInformation';
import Compass from './components/compass';
import './App.css';

function App() {
  const [jsonDataList, setJsonDataList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetJsonData = (data) => {
    setJsonDataList(data);
    setCurrentIndex(0);
    setIsLoading(false);
  };

  const handleLoading = () => {
    setIsLoading(true);
  };

  const handleNext = () => {
    // Increment the currentIndex to move to the next JSON object in the list
    setCurrentIndex((prevIndex) => (prevIndex + 1) % jsonDataList.length);
  };

  const handlePrevious = () => {
    // Decrement the currentIndex to move to the previous JSON object in the list
    setCurrentIndex((prevIndex) => (prevIndex - 1 + jsonDataList.length) % jsonDataList.length);
  };

  return (
    <div>
      <h1>Input Airport Identifier</h1>
      <TextField onReceiveData={handleSetJsonData} onLoading={handleLoading} />
      {isLoading ? (
        <p>Loading...</p>
      ) : jsonDataList.length > 0 && (
        <div>
          {jsonDataList.length > 1 && ( 
            <div className="button-container">
              <button onClick={handlePrevious}>Previous</button>
              <button onClick={handleNext}>Next</button>
            </div>
          )}
          <AirportInfo data={jsonDataList[currentIndex]} />
          {jsonDataList[currentIndex].best_runway &&
            jsonDataList[currentIndex].best_runway.magneticHeading !== undefined && (
              <div className="runway-info-container">
                <div>
                  <h2>Best Runway: {jsonDataList[currentIndex].best_runway.name}</h2>
                </div>
                <div>
                  <Compass angle={jsonDataList[currentIndex].best_runway.magneticHeading} />
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
}

export default App;
