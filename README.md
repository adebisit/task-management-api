# Task Management API

The api is a NestJS API that performs CRUD services on tasks. It also implements user authentication with Json Web Tokens (JWT). The project implements NestJS and MySql in Docker.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Running Migrations](#running-migrations)
- [Testing](#testing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14.x or later)
- [Docker](https://docs.docker.com/engine/install/)
- [Docker-compose](https://docs.docker.com/compose/install/) (should come preinstalled with Docker)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/adebisit/task-management-api
   cd task-management-api
   ```
2. **Build Docker Image:**
   ```bash
   docker build -t task-mgmt-api .
   ```

## Environment Configuration
Create a .env file in the root directory of the project with the following content:

o run this project, you will need to add the following environment variables to your `.env` file:

| Variable Name      | Description                                  | Example Value            |
|--------------------|----------------------------------------------|--------------------------|
| `DATABASE_PORT`    | The port number your database server uses    | `3306`                   |
| `DATABASE_USER`    | The username for your database connection    | `root`                   |
| `DATABASE_PASSWORD`| The password for your database connection    | `password`               |
| `DATABASE_NAME`    | The name of your database                    | `my_database`            |
| `JWT_SECRET`       | Secret key for JWT token generation          | `your_jwt_secret_key`    |

### Example `.env` File
You can rename the `.env.example` file to `.env` and populate it with your variables.

```plaintext
DB_PASSWORD=password
DB_PORT=3306
DB_USERNAME=root
DB_NAME=my_database
JWT_SECRET=your_jwt_token
```
## Running the Application
Start both the NestJS and the MySql db services with docker-compose
```bash
docker-compose up --build -d
```

> ***Note:***
> NestJs service might fail to connect to the database initially. This is because mysql_db takes some time to start up. It should succesfully connect after a few retries.

The application will be available at http://localhost:3000.

## Stopping the Application
```bash
docker-compose down
```

## Running DB Migrations (Important)
To run TypeORM migrations, use the following commands:

Run migrations:
```bash
docker-compose exec api npx typeorm migration:run -d dist/data-source.js
```

## API Documentation
Documentations for the API endpoints are available at http://localhost:3000/api/.

### Websocket (WS)
The application provides the capability to listen for real-time updates on the tasks database through WebSocket events. The following events are supported:

1. `onTaskAdded`: Triggered when a new task is added to the database.
2. `onTaskUpdated`: Triggered when an existing task is updated.
3. `onTaskRemoved`: Triggered when a task is removed from the database.
These events allow for seamless real-time updates, ensuring that all connected clients remain synchronized with the latest changes in the tasks database.

You can test these with Postman as it supports socket.io requests

## Testing
Test scripts are currently under development