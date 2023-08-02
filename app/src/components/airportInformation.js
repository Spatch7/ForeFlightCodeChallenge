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
        Temperature (C): {temperature_C !== null ? temperature_C : "Unavailable"}
        <br />
        Relative Humidity (%): {relative_humidity !== null ? relative_humidity : "Unavailable"}
        <br />
        Visibility (Statute Miles): {visibility.distanceSm !== null ? visibility.distanceSm : "Unavailable"}
        <br />
        Wind Speed (MPH): {wind_speed !== null ? wind_speed : "Unavailable"}
        <br />
        Wind Direction: {wind_direction_card !== null ? wind_direction_card : "Unavailable"}
        <br />
        Humidity: {humidity !== null ? humidity : "Unavailable"}
        <br />
        Cloud Coverage: {cloud_coverage !== null ? cloud_coverage : "Unavailable"}
      </p>

      <h2>Forecast Report For Next Two Periods</h2>
      <div className="forecast-columns">
        {forecast_report.length >= 1 && (
          <div className="forecast-column">
            <h3>Period One:</h3>
            <p>
              Time Offset: {forecast_report[0].time_offset !== null ? forecast_report[0].time_offset : "Unavailable"}
              <br />
              Wind Speed (MPH): {forecast_report[0].wind_speed_mph !== null ? forecast_report[0].wind_speed_mph : "Unavailable"}
              <br />
              Wind Direction (degrees): {forecast_report[0].wind_direction_degrees !== null ? forecast_report[0].wind_direction_degrees : "Unavailable"}
            </p>
          </div>
        )}
        {forecast_report.length >= 2 && (
          <div className="forecast-column">
            <h3>Period Two:</h3>
            <p>
              Time Offset: {forecast_report[1].time_offset !== null ? forecast_report[1].time_offset : "Unavailable"}
              <br />
              Wind Speed (MPH): {forecast_report[1].wind_speed_mph !== null ? forecast_report[1].wind_speed_mph : "Unavailable"}
              <br />
              Wind Direction (degrees): {forecast_report[1].wind_direction_degrees !== null ? forecast_report[1].wind_direction_degrees : "Unavailable"}
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default AirportInfo;
