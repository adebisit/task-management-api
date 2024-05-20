# Task Management API

The api is a NestJS API that performs CRUD services on tasks. It also implements user authentication with Json Web Tokens (JWT).
This project is a NestJS application that connects to a MySQL database using TypeORM.

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
- [MySql](https://www.mysql.com/downloads/)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```
2. **Install dependecies:**

   ```bash
   npm install

## Environment Configuration
Create a .env file in the root directory of the project with the following content:

o run this project, you will need to add the following environment variables to your `.env` file:

| Variable Name      | Description                                  | Example Value            |
|--------------------|----------------------------------------------|--------------------------|
| `DATABASE_HOST`    | The hostname of your database server         | `localhost`              |
| `DATABASE_PORT`    | The port number your database server uses    | `3306`                   |
| `DATABASE_USER`    | The username for your database connection    | `root`                   |
| `DATABASE_PASSWORD`| The password for your database connection    | `password`               |
| `DATABASE_NAME`    | The name of your database                    | `my_database`            |
| `JWT_SECRET`       | Secret key for JWT token generation          | `your_jwt_secret_key`    |
| `PORT_NUM`        |  The port number to run the NestJS application on |   3000 |

### Example .env File

```plaintext
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=password
DATABASE_NAME=my_database
JWT_SECRET=your_jwt_secret_key
PORT_NUM=3000
```

## Running the Application
1. Start the MySQL database:
2. Run the NestJS application:
```bash
npm run start
```
The application will be available at http://localhost:3000.

## Running Migrations
To run TypeORM migrations, use the following commands:

Run migrations:
```bash
npm run typeorm migration:run
```

## Testing
Test scripts are currently under development