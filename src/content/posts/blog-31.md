---
author: Manthan Ankolekar
pubDatetime: 2024-10-02T08:44:00Z
title: Building a CRUD API with Node.js, Express, MySQL, and Swagger UI
postSlug: building-a-crud-api-with-nodejs-express-mysql-and-swagger-ui
featured: false
draft: false
tags:
  - Node.js
  - Express
  - MySQL
  - Swagger
ogImage: ""
description: "In this blog post, we'll walk through the process of building a simple CRUD API using Node.js, Express, MySQL, and Swagger UI. This project demonstrates how to set up a RESTful API with database integration and API documentation."
---

In this blog post, we'll walk through the process of building a simple CRUD (Create, Read, Update, Delete) API using Node.js, Express, MySQL, and Swagger UI. This project demonstrates how to set up a RESTful API with database integration and API documentation.

## Project Structure

Here's an overview of the project structure:

```plaintext
.env
.env.example
.gitignore
config/
  database.js
controllers/
  userController.js
index.js
LICENSE
models/
  userModel.js
package.json
README.md
routes/
  userRoutes.js
swagger/
  swagger.json
swagger.js
```

### Configuration

The project uses environment variables to manage configuration settings. The `.env.example` file provides a template for the required environment variables:

```example
PORT=3000
DB_HOST=localhost

DB_USER=your_user
DB_PASSWORD=your_password
DB_DATABASE=your_database
```

### Database Connection

The database connection is configured in the `config/database.js` file:

```js
const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
```

### Models

The `models/userModel.js` file defines the `User` model and its CRUD operations:

```js
const db = require("../config/database");

const User = function (user) {
  this.name = user.name;
  this.email = user.email;
};

// Create a new User
User.create = (newUser, result) => {
  db.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newUser });
  });
};

// Get all Users
User.getAll = (result) => {
  db.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

// Find User by ID
User.findById = (id, result) => {
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res[0]);
  });
};

// Update User by ID
User.updateById = (id, user, result) => {
  db.query(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [user.name, user.email, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

// Delete User by ID
User.remove = (id, result) => {
  db.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = User;
```

### Controllers

The `controllers/userController.js` file handles the API requests and responses:

```js
const User = require("../models/userModel");

// Create and Save a new User
exports.create = (req, res) => {
  const newUser = new User(req.body);

  User.create(newUser, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};

// Retrieve all Users
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};

// Find a single User with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err)
      res.status(500).send({
        message: `Error retrieving User with id ${req.params.userId}`,
      });
    else res.send(data);
  });
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
  User.updateById(req.params.userId, new User(req.body), (err, data) => {
    if (err)
      res.status(500).send({
        message: `Error updating User with id ${req.params.userId}`,
      });
    else res.send(data);
  });
};

// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err)
      res.status(500).send({
        message: `Error deleting User with id ${req.params.userId}`,
      });
    else res.send({ message: "User deleted successfully!" });
  });
};
```

### Routes

The `routes/userRoutes.js` file defines the API endpoints:

```js
const express = require("express");
const router = express.Router();
const users = require("../controllers/userController");

// Create a new User
router.post("/users", users.create);

// Retrieve all Users
router.get("/users", users.findAll);

// Retrieve a single User with userId
router.get("/users/:userId", users.findOne);

// Update a User with userId
router.put("/users/:userId", users.update);

// Delete a User with userId
router.delete("/users/:userId", users.delete);

module.exports = router;
```

### Swagger Setup

The `swagger.js` file sets up Swagger UI for API documentation:

```js
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
```

### Main Application

The main application is defined in the `index.js` file:

```js
const express = require("express");
const bodyParser = require("body-parser");
const swaggerSetup = require("./swagger");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send(
    "API is running... Do you want to see the API documentation? Go to /api-docs"
  );
});
app.use("/api", userRoutes);

// Swagger setup
swaggerSetup(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
```

### Running the Project

To run the project, follow these steps:

1. Install the dependencies:

    ```sh
    npm install
    ```

2. Create a `.env` file based on the `.env.example` file and fill in your database credentials.

3. Start the server:

    ```sh
    npm start
    ```

4. Access the API documentation at `http://localhost:3000/api-docs`.

## Conclusion

In this blog post, we built a simple CRUD API using Node.js, Express, MySQL, and Swagger UI. This project demonstrates how to set up a RESTful API with database integration and API documentation. Feel free to extend this project by adding more features or improving the existing ones. Happy coding!
