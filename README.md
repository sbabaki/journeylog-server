# JourneyLog (Backend)

## Overview

JourneyLog is a place for travellers to map their journeys, document their travels, and inspire other travellers building itineraries for their next journey. The backend of JourneyLog supports RESTful APIs, handles data storage, and facilitates communication with the frontend.

## Implementation


### Tech Stack (Backend)

- **Node.js**: Backend JavaScript runtime.
- **Express.js**: Web framework for creating RESTful APIs.
- **UUID**: Generates unique identifiers for logs and cities.
- **dotenv**: Loads environment variables for secure configuration.


### APIs

- Google Places API

### Endpoints

**GET /your-logs**

- Fetch logs
- Parameters: none
- Response:

```json
[
    {
    "id": 1,
    "name": "Europe Trip"
    }
]
```

**GET /your-logs/:id**

- Fetch detailed information about a specific log
- Parameters: id
- Response:

```json
{
  "id": "d3b081d6-7529-4f14-bc62-ef67b49cfb8d",
  "name": "Europe Getaway",
  "cities": [
    {
      "id": "4e78e7c7-f6fc-4b85-8cb2-72c06cc1b1b6",
      "city": "Paris, France",
      "coordinates": { "latitude": 48.8566, "longitude": 2.3522 },
      "image": "/images/paris.jpg",
      "startDate": "2024-01-01",
      "endDate": "2024-01-10",
      "note": "Exploring the streets of Paris was magical..."
    },
    ...
  ]
}
```

**GET /journey-map**

- Fetch list of all city coordinates across all journey logs
- Parameters: none
- Response:

```json
[
  {
    "city": "Paris, France",
    "coordinates": { "latitude": 48.8566, "longitude": 2.3522 }
  },
  {
    "city": "Tokyo, Japan",
    "coordinates": { "latitude": 35.6895, "longitude": 139.6917 }
  },
  ...
]
```

**POST /your-logs**

- create new log with unique id, name and array of cities
- Request:

```json
{
  "name": "New Journey Name",
  "cities": [
    {
      "city": "Lake Atitlan, Guatemala",
      "coordinates": { "longitude": -91.1501, "latitude": 14.6872 },
      "startDate": "2024-03-01",
      "endDate": "2024-03-05",
      "note": "A beautiful serene lake surrounded by volcanoes."
    },
    ...
  ]
}
```

- Response:

```json
{
  "id": "unique-log-id",
  "name": "New Journey Name",
  "cities": [
    {
      "id": "unique-city-id",
      "city": "Lake Atitlan, Guatemala",
      "coordinates": { "longitude": -91.1501, "latitude": 14.6872 },
      "image": "/images/atitlan.jpg",
      "startDate": "2024-03-01",
      "endDate": "2024-03-05",
      "note": "A beautiful serene lake surrounded by volcanoes."
    },
    ...
  ]
}
```

## Installation and Setup

### Prerequisites:
Ensure you have the following installed:
- Node.js (version 18 or higher)
- npm

### Instructions:

1. Clone the Repository
```
git clone <repository-url>
cd journeylog-server
```

2. Install Dependencies:
```
npm install
```

3. Obtain the Google Places API Key:
   - Go to the Google Cloud Console.
   - Create a new project or use an existing one.
   - Navigate to APIs & Services > Credentials.
   - Create an API key and enable the Places API.
   - Restrict the API key to your application's domain or IP address for security.
<br>

4. Set Up Environmental Variables

- Create a .env file:
```
PORT=your-port
GOOGLE_API_KEY=your-google-api-key
```

5. Start the Server
```
npm start
```
6. Access the Application
