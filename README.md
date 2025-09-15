Drone Photography Booking API
This project is a robust backend REST API for a drone photography booking service. It provides a complete, scalable solution for managing customer profiles and their associated aerial shot bookings.

## Problem Statement

This project aims to solve this by creating a centralized, secure, and reliable backend system. It exposes a well-defined REST API to handle all customer and booking operations, providing a solid foundation for future applications and streamlining the business's workflow.

## Features
Full CRUD Operations: Complete Create, Read, Update, and Delete functionality for both customer profiles and their bookings.

RESTful API Design: Clean, predictable, and well-structured API endpoints.

Asynchronous: Built with FastAPI and an async ODM to handle concurrent requests efficiently.

Data Validation: Uses Pydantic for robust, type-safe data validation on all incoming requests.

Automatic Documentation: Provides interactive API documentation (Swagger UI) for easy testing and exploration of endpoints.

## Tech Stack
Backend: Python 3.12, FastAPI

Database: MongoDB

ODM (Object-Document Mapper): Beanie

ASGI Server: Uvicorn

Data Validation: Pydantic

## Setup and Installation
Follow these steps to get the project running on your local machine.

Clone the repository:

Bash

git clone <your-repository-url>
cd Droame-Dashboard-backend
Create and activate a virtual environment:

Bash

# For Windows
python -m venv venv_stable
.\venv_stable\Scripts\activate
Install the required dependencies:

Bash

pip install -r requirements.txt
## Environment Configuration
The application requires environment variables to connect to the database.

Create a file named .env in the root directory of the project.

Copy the contents of .env.example (or the format below) into your new .env file.

Plaintext

# .env file

# Your secret connection string for the MongoDB Atlas database
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster-url>/YourDatabaseName?retryWrites=true&w=majority"

# Application environment and port
NODE_ENV="development"
PORT=8000
Replace the placeholder values with your actual MongoDB Atlas credentials.

## Running the Application
Once the setup is complete, you can start the server with the following command:

Bash

uvicorn app.main:app --reload
The server will be running at http://127.0.0.1:8000.

You can access the interactive API documentation at http://127.0.0.1:8000/docs.

## API Endpoints
Here is a list of the available API endpoints.

HTTP Method	Endpoint	Description
POST	/api/customer	Add a new customer.
GET	/api/customer/{email}	Get details of a specific customer.
PUT	/api/customer/{email}	Update a specific customer's details.
POST	/api/dashboard/{email}/booking	Add a new booking to a customer.
GET	/api/dashboard/{email}/booking/{bookingId}	View a specific booking.
PUT	/api/dashboard/{email}/booking/{bookingId}	Update a specific booking.
DELETE	/api/dashboard/{email}/booking/{bookingId}	Delete a specific booking.
