

import datetime
import os
from datetime import datetime
from flask import Flask, jsonify, request
import requests

port = int(os.getenv('port', 5000))
app = Flask(__name__, static_folder='./build', static_url_path='/')


@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/hello')
def hello():
    return jsonify(message='Hello World!')

@app.route('/api/submit_text', methods=['POST'])
def submit_airport():
    data = request.get_json()
    text = data.get('text', '').upper()
    airport_identifiers = text.split()
    res = []

    for id in airport_identifiers:
        FOREFLIGHT_CONDITIONS_URL = f"https://qa.foreflight.com/weather/report/{id}"
        FOREFLIGHT_AIRPORT_URL = f"https://qa.foreflight.com/airports/{id}"
        
        # Call the ForeFlight API with the entered text
        conditions_response = requests.get(FOREFLIGHT_CONDITIONS_URL, headers={'ff-coding-exercise': '1'})
        airport_response = requests.get(FOREFLIGHT_AIRPORT_URL, headers={'ff-coding-exercise': '1'}, auth=('ff-interview', '@-*KzU.*dtP9dkoE7PryL2ojY!uDV.6JJGC9'))
        
        # If bad input, skip and do not append data
        if not conditions_response.ok or not airport_response.ok:
            continue

        # Extract data from airport conditions and data, respectively.
        conditions_data = extract_conditions_data(conditions_response.json())
        airport_data = extract_airport_data(airport_response.json())

        if conditions_data['wind_direction'] == None:
            best_runway = None
        else:
            best_runway = calculate_best_runway(int(conditions_data['wind_direction']), airport_data['available_runways'])

        # Package data for front-end
        combined_data = {
            'conditions': conditions_data,
            'airport': airport_data,
            'best_runway':best_runway
        }
        res.append(combined_data)

    # Send a response back to the React front-end
    return jsonify(res)

# Extract conditions data
def extract_conditions_data(response_data):
    forecast_report = []
    temperature_C = response_data.get('report', {}).get('conditions', {}).get('tempC', None)
    realative_humidity = response_data.get('report', {}).get('conditions', {}).get('relativeHumidity', None)
    visibility = response_data.get('report', {}).get('conditions', {}).get('visibility', None)
    wind_speed = response_data.get('report', {}).get('conditions', {}).get('wind', {}).get('speedKts', None)
    humidity = response_data.get('report', {}).get('conditions', {}).get('relativeHumidity', None)
    cloud_coverage = response_data.get('report', {}).get('conditions', {}).get('text', None)
    cloud_layers1 = response_data.get('report', {}).get('conditions', {}).get('cloudLayers', None)
    cloud_layers2 = response_data.get('report', {}).get('conditions', {}).get('cloudLayersV2', None)
    wind_direction = response_data.get('report', {}).get('conditions', {}).get('wind', {}).get('direction', None)
    wind_direction_card = degrees_to_cardinal(wind_direction)
    if wind_speed != None: wind_speed = (knots_to_mph(wind_speed))
    if wind_speed != None: wind_speed = int(wind_speed)
    if cloud_coverage != None: cloud_coverage = summerize_cloud_text(cloud_coverage)

    #  --- Create Forecast Report ---
    start_time = response_data.get('report', {}).get('forecast', {}).get('period').get('dateStart')
    for current_day, condition in enumerate(response_data.get('report', {}).get('forecast', {}).get('conditions', [])):
        # Skip the first and last loop of conditions
        if current_day == 1 or current_day == 2:
            current_time = condition.get('dateIssued', None)
            wind_speed_kts = condition.get('wind', {}).get('speedKts', None)
            wind_direction_degrees = condition.get('wind', {}).get('direction', None)

            # Calculate the time offset
            time_offset = calculate_time_offset(start_time, current_time)
            wind_speed_mph = int(knots_to_mph(wind_speed_kts))
            forecast_data = {
                'time_offset': time_offset,
                'wind_speed_mph': wind_speed_mph,
                'wind_direction_degrees': wind_direction_degrees
            }
            forecast_report.append(forecast_data)

    condition_data = {
        'temperature_C': temperature_C,
        'relative_humidity': realative_humidity,
        'visibility': visibility,
        'wind_speed': wind_speed,
        'humidity': humidity,
        'cloud_coverage': cloud_coverage,
        'cloud_layers1': cloud_layers1,
        'cloud_layers2': cloud_layers2,
        'wind_direction': wind_direction,
        'wind_direction_card':wind_direction_card,
        'forecast_report': forecast_report
    }
    return condition_data


# Extract data from the airport_response
def extract_airport_data(response_data):
    airport_identifier = response_data.get('faaCode', None)
    airport_name = response_data.get('name', None)
    available_runways = response_data.get('runways', None)
    latitude = response_data.get('latitude', None)
    longitude = response_data.get('longitude', None)
    airport_data = {
        'airport_identifier': airport_identifier,
        'airport_name': airport_name,
        'available_runways': available_runways,
        'airport_name': airport_name,
        'latitude': latitude,
        'longitude': longitude        
    }
    return airport_data

def degrees_to_cardinal(degrees):
    directions = [
        "N", "NNE", "NE", "ENE",
        "E", "ESE", "SE", "SSE",
        "S", "SSW", "SW", "WSW",
        "W", "WNW", "NW", "NNW"
    ]
    if degrees:
        index = round(degrees / 22.5) % 16
        return directions[index]
    else:
        return None

def knots_to_mph(knots):
    if knots != None:
        return knots * 1.15078
    else:
        return None


# Calculate the time offset in hrs:min
def calculate_time_offset(start_time_str, current_time_str):
    start_time = datetime.strptime(start_time_str, '%Y-%m-%dT%H:%M:%S%z')
    current_time = datetime.strptime(current_time_str, '%Y-%m-%dT%H:%M:%S%z')
    time_difference = current_time - start_time
    hours, remainder = divmod(time_difference.total_seconds(), 3600)
    minutes, _ = divmod(remainder, 60)
    return f"{int(hours):02d}:{int(minutes):02d}"


def summerize_cloud_text(cloud_data):
    cloud_layers = cloud_data.split(" ")
    cloud_coverage = []
    for layer in cloud_layers:
        if layer.startswith("FEW") or layer.startswith("SCT") or layer.startswith("BKN") or layer.startswith("OVC"):
            coverage = layer[:3]
            cloud_coverage.append(coverage)
    if cloud_coverage:
        return max(cloud_coverage)
    else:
        return None


def calculate_best_runway(wind_direction, available_runways):
    best_runway = None
    smallest_angle_diff = float('inf')
    for runway in available_runways:
        runway_heading = int(runway['trueHeading'])
        angle_diff = abs(runway_heading - wind_direction)
        if angle_diff < smallest_angle_diff:
            smallest_angle_diff = angle_diff
            best_runway = runway

    return best_runway

# if __name__ == '__main__':
#     port = int(os.environ.get("PORT", 5000))
#     app.run(host='0.0.0.0', port=port)