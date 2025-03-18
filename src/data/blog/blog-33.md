---
author: Manthan Ankolekar
pubDatetime: 2024-10-11T08:44:00Z
title: Building a Simple Todo App with Deno and Oak
postSlug: building-a-simple-todo-app-with-deno-and-oak
featured: false
draft: false
tags:
  - Deno
ogImage: ""
description: "Learn how to build a simple Todo application using Deno and the Oak framework. This blog provides a step-by-step guide to creating a REST API for managing todos."
---

In this blog, we’ll explore how to build a simple REST API for a Todo application using Deno and the Oak framework. Deno is a secure runtime for JavaScript and TypeScript, and Oak is a middleware framework for Deno's HTTP server. If you're familiar with Node.js and Express, you'll find Deno and Oak to be a similar yet modern and secure approach to building web applications.

### Prerequisites

Before diving into the code, ensure that you have Deno installed on your machine. You can install it by following the [official Deno installation guide](https://deno.land/#installation).

Once installed, you can verify your installation by running:

```bash
deno --version
```

### Project Setup

1. **Creating the Project**: Start by creating a new directory for your Todo application and navigate into it:

   ```bash
   mkdir deno-app
   cd deno-app
   ```

2. **main.ts**: This is our main file where the entire server setup and routes are defined.

### Code Breakdown

#### 1. Importing Oak Modules

We start by importing `Application` and `Router` from Oak:

```ts
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
```

- `Application` is the core of our API, responsible for handling HTTP requests and responses.
- `Router` helps define the API routes.

#### 2. Creating the Application and Router

```ts
const app = new Application();
const router = new Router();
```

- We initialize the application and router instances, which will be used to define routes and handle incoming HTTP requests.

#### 3. Todo Interface and Data

To define the structure of our todos, we create a TypeScript interface:

```ts
interface Todo {
  id: string;
  task: string;
}
```

The todos will be stored in an in-memory array:

```ts
let todos: Todo[] = [];
```

#### 4. Middleware for Logging and Error Handling

Deno and Oak allow you to set up middleware, which is useful for tasks like logging requests and handling errors.

- **Logging Middleware**: Logs the HTTP method and request URL for each request.

  ```ts
  app.use(async (ctx, next) => {
    console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}`);
    await next();
  });
  ```

- **Error Handling Middleware**: Catches any errors and sends a generic 500 response if something goes wrong.

  ```ts
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      console.error(err);
      ctx.response.status = 500;
      ctx.response.body = { message: 'Internal Server Error' };
    }
  });
  ```

#### 5. Defining the Routes

We define several RESTful routes for handling CRUD operations on todos.

- **Root Route**: Simple welcome message.

  ```ts
  router.get('/', (ctx) => {
    ctx.response.body = 'Welcome to the API!';
  });
  ```

- **Get All Todos**: Fetch all the todos.

  ```ts
  router.get("/todos", (ctx) => {
    ctx.response.body = { todos: todos };
  });
  ```

- **Create a Todo**: Add a new todo item. The new todo's `id` is generated using the current timestamp.

  ```ts
  router.post("/todos", async (ctx) => {
    const data = await ctx.request.body.json();
    const newTodo: Todo = {
      id: new Date().toISOString(),
      task: data.task,
    };
  
    todos.push(newTodo);
    ctx.response.body = { message: "Created todo!", todo: newTodo };
  });
  ```

- **Update a Todo**: Modify an existing todo by its `id`.

  ```ts
  router.put("/todos/:todoId", async (ctx) => {
    const tid = ctx.params.todoId;
    const data = await ctx.request.body.json();
    const todoIndex = todos.findIndex((todo) => todo.id === tid);
  
    if (todoIndex !== -1) {
      todos[todoIndex] = { id: todos[todoIndex].id, task: data.task };
      ctx.response.body = { message: "Updated todo" };
    } else {
      ctx.response.status = 404;
      ctx.response.body = { message: "Todo not found" };
    }
  });
  ```

- **Delete a Todo**: Remove a todo by its `id`.

  ```ts
  router.delete("/todos/:todoId", (ctx) => {
    const tid = ctx.params.todoId;
    const initialLength = todos.length;
    todos = todos.filter((todo) => todo.id !== tid);
  
    if (todos.length < initialLength) {
      ctx.response.body = { message: "Deleted todo" };
    } else {
      ctx.response.status = 404;
      ctx.response.body = { message: "Todo not found" };
    }
  });
  ```

#### 6. Registering Routes and Starting the Server

After defining the routes, we need to tell the application to use them:

```ts
app.use(router.routes());
app.use(router.allowedMethods());
```

Finally, we start the server on port `3000`:

```ts
console.log('API is running on http://localhost:3000');
await app.listen({ port: 3000 });
```

### Running the Application

To run the application, use the following command:

```bash
deno run --allow-net main.ts
```

- `--allow-net` grants network access to the application, which is necessary for Oak to run the HTTP server.

Now, open your browser or use an API client like Postman to access the routes:

- `GET http://localhost:3000/todos`: Retrieve all todos.
- `POST http://localhost:3000/todos`: Add a new todo (send JSON `{ "task": "Sample task" }` in the request body).
- `PUT http://localhost:3000/todos/:todoId`: Update an existing todo.
- `DELETE http://localhost:3000/todos/:todoId`: Delete a todo by ID.

### Conclusion

In this blog, we’ve built a simple Todo API using Deno and Oak. This project highlights how easy it is to create web applications with Deno, thanks to its modern features like secure permissions and TypeScript support out of the box. You can expand on this app by adding database integration, authentication, and more.

Deno provides a fresh take on backend development, and Oak makes the transition from Express to Deno almost seamless. Give it a try and explore how Deno can improve your web development experience!

Happy coding!

---

Feel free to customize the content as needed. Let me know if you have any questions or need further assistance. Good luck with your project! 🚀

### Exploring the Code

Visit the [GitHub repository](https://github.com/manthanank/deno-app) to explore the code in detail.

---
