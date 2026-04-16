simple-api-integration

A REST API built with Node.js, Express.js, and TypeScript that integrates with the Genderize API to predict the gender of a given name and return a processed response.

This project was built as part of the Backend Wizards Stage 0 Assessment, which tests API integration, data processing, and error handling.

Features

Single GET endpoint for name classification
Integration with an external API
Data extraction and transformation
Confidence evaluation logic
Structured error handling
Dynamic timestamp generation
CORS enabled for external access


Tech Stack

Node.js
Express.js
TypeScript
Axios

Installation

Clone the repository:

git clone https://github.com/reigner007/simple-api-integration.git
cd simple-api-integration

Install dependencies:

npm install


Running the Server?
Development mode:

npm run dev

Production build:
npm run build
npm start

Server runs on:
http://localhost:3000


API Endpoint
Classify Name
GET /api/classify?name={name}

Example request:
GET /api/classify?name=john

✅ Success Response (200)
{
  "status": "success",
  "data": {
    "name": "john",
    "gender": "male",
    "probability": 0.99,
    "sample_size": 1234,
    "is_confident": true,
    "processed_at": "2026-04-01T12:00:00Z"
  }
}

Data Processing Logic

The API performs the following steps:

Sends a request to the Genderize API with the provided name.
Extracts the following fields from the response:
gender
probability
count
Renames count to sample_size.
Calculates a confidence flag.