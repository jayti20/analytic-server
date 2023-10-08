# Analytics Server

A simple Express.js server that collects user interactions (button clicks) and stores them in a PostgreSQL database. The application uses Handlebars as its view engine and captures the username, IP address, and button event to store in the database.

## Prerequisites

- Node.js
- PostgreSQL
- npm
- Express

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-repository-directory>
```

### 2. Install Dependencies

Navigate to the root of your project and run:

```bash
npm install
```

This will install all required dependencies, including `express`, `pg`, `body-parser`, and `express-handlebars`.

### 3. Environment Variables

For connecting to your PostgreSQL instance, set up the environment variable `DATABASE_URL`. This URL should be the connection string provided by your PostgreSQL hosting service (e.g., Render.com).

Example:

```
DATABASE_URL=postgres://user:password@host:port/databasename
```

### 4. Running the Server

To start the server, simply run:

```bash
node server.js
```

By default, the server will start on port `8000`. Navigate to `http://localhost:8000/user` to begin interacting with the application.

## Features

1. **User Entry**: A simple form where users can enter their username.
2. **Button Interaction**: A page with buttons. When clicked, the button's event, the user's IP, and the username are captured.
3. **Database Storage**: Every 20 seconds, captured data is stored in a PostgreSQL database.

## Deployment on Render.com

To deploy on Render:

1. Push your repository to GitHub or another Git provider.
2. Connect your repository to Render.
3. Set up the `DATABASE_URL` environment variable in the Render dashboard.
4. Deploy your web service and database.

For detailed steps, refer to Render's official documentation.

Check out the live demo : https://basic-analytic-server.onrender.com
