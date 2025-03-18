---
author: Manthan Ankolekar
pubDatetime: 2025-03-17T08:44:00Z
modDatetime: 
title: Building a Node.js CRUD API with Supabase
postSlug: building-a-nodejs-crud-api-with-supabase
featured: false
draft: false
tags:
  - Node.js
  - Supabase
  - Express.js
ogImage: ""
description: "Learn how to build a RESTful API using Node.js, Express.js, and Supabase. This guide covers CRUD operations, API documentation with Swagger, and real-time capabilities."
---

## Introduction

In modern web development, integrating a backend with a scalable database is essential for building dynamic applications. In this blog, we will explore how to create a RESTful API using **Node.js**, **Express.js**, and **Supabase** (a powerful open-source alternative to Firebase). This API will handle basic CRUD (Create, Read, Update, Delete) operations for user management.

## Why Supabase?

Supabase is an open-source backend-as-a-service (BaaS) that provides features like:

- **PostgreSQL database** with real-time capabilities
- **Authentication and authorization**
- **Storage** for managing files
- **Auto-generated APIs** for database interactions

With Supabase, you get a fully managed PostgreSQL database with an easy-to-use JavaScript SDK.

## Tech Stack

- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Minimalist web framework for Node.js
- **Supabase**: PostgreSQL-based backend
- **dotenv**: For managing environment variables
- **Swagger**: API documentation tool
- **CORS**: Enables cross-origin resource sharing

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/manthanank/nodejs-supabase.git
cd nodejs-supabase
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file and add your Supabase credentials:

```ini
SUPABASE_URL=https://your-project-url.supabase.co
SUPABASE_KEY=your-anon-or-service-role-key
PORT=5000
```

### 4. Run the Application

Start the development server:

```bash
npm run dev
```

For production:

```bash
npm start
```

Your API will now be running at `http://localhost:5000`.

## Project Structure

```text
nodejs-supabase
├── .env                   # Environment variables
├── index.js               # Main application entry point
├── package.json           # Project dependencies and scripts
├── README.md              # Project documentation
├── config/
│   ├── supabaseClient.js  # Supabase client configuration
│   └── swagger.js         # Swagger configuration
├── controllers/
│   └── userController.js  # User controller functions
├── routes/
│   └── userRoutes.js      # API route definitions with Swagger docs
└── services/
    └── userService.js     # Business logic for user operations
```

## API Endpoints

### Users CRUD Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Create a new user |
| GET | `/api/users` | Get all users |
| GET | `/api/users/search?query=name` | Search users by name |
| GET | `/api/users/:id` | Get user by ID |
| GET | `/api/users/email/:email` | Get user by email |
| PUT | `/api/users/:id` | Update user by ID |
| DELETE | `/api/users/:id` | Delete user by ID |

## Key Implementations

### Supabase Client Setup

Create `config/supabaseClient.js`:

```javascript
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default supabase;
```

### CRUD Operations in `userService.js`

#### Create User

```javascript
export const createUser = async (userData) => {
  const { data, error } = await supabase
    .from("users")
    .insert([userData])
    .select();

  if (error) throw new Error(error.message);
  return data;
};
```

#### Fetch Users

```javascript
export const getUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) throw new Error(error.message);
  return data;
};
```

#### Update User

```javascript
export const updateUser = async (id, updates) => {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};
```

#### Delete User

```javascript
export const deleteUser = async (id) => {
  const { error } = await supabase
    .from("users")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true, message: "User deleted successfully" };
};
```

### API Routes in `userRoutes.js`

```javascript
import express from "express";
import { addUser, fetchUsers, fetchUserById, fetchUserByEmail, modifyUser, removeUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/users", addUser);
router.get("/users", fetchUsers);
router.get("/users/:id", fetchUserById);
router.get("/users/email/:email", fetchUserByEmail);
router.put("/users/:id", modifyUser);
router.delete("/users/:id", removeUser);

export default router;
```

## Testing the API

### Create a User

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "age": 30}'
```

### Search Users

```bash
curl -X GET http://localhost:5000/api/users/search?query=John
```

## Swagger API Documentation

To enable API documentation, navigate to:

```text
http://localhost:5000/api-docs
```

This provides an interactive UI for testing endpoints.

## Conclusion

In this blog, we covered how to build a CRUD API using Node.js, Express.js, and Supabase. Supabase simplifies database management while offering powerful features like authentication and real-time updates. By integrating Swagger, we also ensured that our API is well-documented and easy to use.

This API can be extended with additional functionalities like authentication, role-based access control, and real-time updates.

Happy coding! 🚀

### Exploring the Code

Visit the [GitHub repository](https://github.com/manthanank/nodejs-supabase) to explore the code in detail.
