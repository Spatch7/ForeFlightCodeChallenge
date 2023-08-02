import React, { useState, useEffect } from 'react';
import "../componentCSS/airportInformation.css"

const AirportInfo = ({ data }) => {
  const {
    conditions: {
      temperature_C,
      relative_humidity,
      visibility,
      wind_speed,
      humidity,
      cloud_coverage,
      wind_direction_card,
      forecast_report,
    },
    airport: {
      airport_identifier,
      airport_name,
      available_runways,
      latitude,
      longitude,
    },
  } = data;

  return (
    <div className="airport-info">
        
      <h2>Airport Information</h2>
      <p>
        Identifier: {airport_identifier}
        <br />
        Name: {airport_name}
        <br />
        Latitude: {latitude}
        <br />
        Longitude: {longitude}
      </p>
      <h2>Current Weather Report</h2>
      <p>
        Temperature (C): {temperature_C}
        <br />
        Relative Humidity (%): {relative_humidity}
        <br />
        Visibility (Statute Miles): {visibility.distanceSm}
        <br />
        Wind Speed (MPH): {wind_speed}
        <br />
        Wind Direction: {wind_direction_card}
        <br />
        Humidity: {humidity}
        <br />
        Cloud Coverage: {cloud_coverage}
      </p>

      <h2>Forecast Report For Next Two Periods</h2>
      <ul>
        {forecast_report.length >= 1 && (
          <li>
            <h3>Period One:</h3>
            Time Offset: {forecast_report[0].time_offset}
            <br />
            Wind Speed (MPH): {forecast_report[0].wind_speed_mph}
            <br />
            Wind Direction (degrees): {forecast_report[0].wind_direction_degrees}
          </li>
        )}
        {forecast_report.length >= 2 && (
          <li>
            <h3>Period Two:</h3>
            Time Offset: {forecast_report[1].time_offset}
            <br />
            Wind Speed (MPH): {forecast_report[1].wind_speed_mph}
            <br />
            Wind Direction (degrees): {forecast_report[1].wind_direction_degrees}
          </li>
        )}
    </ul> 
    </div>
  );
};

export default AirportInfo;
