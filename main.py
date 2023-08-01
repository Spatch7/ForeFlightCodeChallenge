

import os
import time
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

load_dotenv()
port = int(os.getenv('port', 5000))

app = Flask(__name__, static_folder='./build', static_url_path='/')
CORS(app)


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
    FOREFLIGHT_CONDITIONS_URL = f"https://qa.foreflight.com/weather/report/{text}"
    FOREFLIGHT_AIRPORT_URL = f"https://qa.foreflight.com/airports/{text}"

    # Call the ForeFlight API with the entered text
    conditions_response = requests.get(FOREFLIGHT_CONDITIONS_URL, headers={'ff-coding-exercise': '1'})
    airport_response = requests.get(FOREFLIGHT_AIRPORT_URL, headers={'ff-coding-exercise': '1'}, auth=('ff-interview', '@-*KzU.*dtP9dkoE7PryL2ojY!uDV.6JJGC9'))

    # Process the responses and extract the required data
    # ...
    print(conditions_response)
    print(airport_response)

    conditions_data = extract_conditions_data(conditions_response.json())
    # airport_data = extract_airport_data(airport_response.json())

    combined_data = {
        'conditions': conditions_data,
        # 'airport': airport_data
    }
    # Send a response back to the React front-end
    return combined_data
    # return jsonify({'message': 'Data received successfully'})





def extract_conditions_data(response_data):   
    print(response_data)
    temperature = response_data.get('fieldB', None)
    visibility = response_data.get('fieldB', None)
    wind_speed = response_data.get('fieldB', None)
    wind_direction = response_data.get('fieldB', None)
    # data_field1 = response_data.get('field1', None)
    # data_field2 = response_data.get('field2', None)
    # ...

    # Process the data as needed
    # ...

    # return {
    #     'field1': data_field1,
    #     'field2': data_field2,
    #     # ...
    # }

# Function to extract data from the airport_response
def extract_airport_data(response_data):
    # Replace 'fieldA', 'fieldB', etc. with the actual field names from the response
    # print(response_data)
    airport_identifier = response_data.get('faaCode', None)
    airport_name = response_data.get('name', None)
    available_runways = response_data.get('runways', None)
    latitude = response_data.get('latitude', None)
    longitude = response_data.get('longitude', None)
    # 

    # # ...

    # # Process the data as needed
    # # ...
    print(airport_identifier, longitude)
    return {
        'airport_identifier': airport_identifier,
        'airport_name': airport_name,
        'available_runways': available_runways,
        'airport_name': airport_name,
        'latitude': latitude,
        'longitude': longitude        
    }

# if __name__ == '__main__':
#     port = int(os.environ.get("PORT", 5000))
#     app.run(host='0.0.0.0', port=port)