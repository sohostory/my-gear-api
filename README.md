# My Gear Backend API

Welcome to the backend API documentation for My Gear - Photography Equipment Management App. This API serves as the backend for the web application and provides the necessary endpoints to manage equipment data.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [License](#license)

### Prerequisites

- Node.js (version 20.1.0)
- PostgreSQL (version 13.0.0)

## Installation

1. Clone the repository to your local machine.
2. Install the necessary dependencies using the package manager of your choice.
3. Set up the environment variables for the server address and other configuration options.
4. Run the development server.
5. Set up the database:
   Create a new PostgreSQL database.
   Update the database configuration in the .env file with your database credentials.

## API Documentation

### Authentication

POST /api/auth/register - Register a new user.
POST /api/auth/login - Log in and retrieve an access token.

### Equipment

GET /api/equipment - Get a list of all equipment entries.
GET /api/equipment/:id - Get a specific equipment entry by ID.
POST /api/equipment - Create a new equipment entry.
PUT /api/equipment/:id - Update an existing equipment entry.
DELETE /api/equipment/:id - Delete an equipment entry.

###Error Handling
The API handles errors using HTTP status codes and provides meaningful error messages in the response body.

400 Bad Request - Invalid request or missing required fields.
401 Unauthorized - Authentication failed or user not authorized.
404 Not Found - Resource not found.
500 Internal Server Error - Server-side errors.

## Technologies Used

- Node.js
- Express
- PostgreSQL
- Sequelize
- bcrypt

## Contributing

Contributions to this project are welcome. Feel free to open an issue or submit a pull request with any improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).
