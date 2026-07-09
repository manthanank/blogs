---
author: Manthan Ankolekar
pubDatetime: 2023-06-26T08:44:00Z
title: Most Used commands, methods, and concepts of Node.js
postSlug: most-used-commands-methods-and-concepts-of-nodejs
featured: false
draft: false
tags:
  - javascript
  - nodejs
  - node
ogImage: ""
description: Most Used commands, methods, and concepts of Node.js
---

Setting up a Node.js project involves several steps and tasks that help you create and manage your project effectively. Here are some explanations and examples for each step:

Create a new project:

The npm init command initializes a new Node.js project and creates a package.json file in the project directory. This file contains metadata about the project and its dependencies.

Example:

```bash
npm init
```

Install dependencies:

Use the npm install <package-name> command to install the required packages or modules for your project. These dependencies are listed in the package.json file.

Example:

```bash
npm install express
```

Create an entry point file:

Create a file, typically named index.js, which serves as the entry point for your Node.js application. This file is where you write the main logic of your project.

Example:

```jsx
// index.js
const express = require("express");
```

Working with modules:

Importing modules:

Use the require() function to import modules or packages in your Node.js project. The module name should be passed as a parameter to the require() function.

Example:

```jsx
const express = require("express");
```

Exporting from a module:

To export functions, variables, or objects from a module, assign them to the module.exports object.

Example:

```jsx
// myModule.js
module.exports = {
  greet: function () {
    console.log("Hello!");
  },
};
```

Working with the file system:

Reading a file:

Use the fs.readFile() function to read the contents of a file. You need to provide the file path, encoding (optional), and a callback function to handle the data.

Example:

```jsx
const fs = require("fs");

fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

Writing to a file:

Use the fs.writeFile() function to write data to a file. Provide the file path, data to write, and a callback function to handle any errors.

Example:

```jsx
const fs = require("fs");

const data = "Hello, world!";

fs.writeFile("file.txt", data, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Data written to file successfully.");
});
```

Checking if a file/directory exists:

Use the fs.existsSync() function to check if a file or directory exists at a given path.

Example:

```jsx
const fs = require("fs");

const path = "file.txt";

if (fs.existsSync(path)) {
  console.log("File exists.");
} else {
  console.log("File does not exist.");
}
```

HTTP server and requests:

Creating an HTTP server:

Use the http.createServer() function to create an HTTP server instance. Provide a callback function that will be executed for each incoming request.

Example:

```jsx
const http = require("http");

const server = http.createServer((request, response) => {
  response.end("Hello, World!");
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
```

Handling requests and responses:

The request and response objects are provided as parameters to the callback function of the HTTP server. You can access request headers, URL, and other details from the request object and send a response using the response object.

Example:

```jsx
const http = require("http");

const server = http.createServer((request, response) => {
  console.log("Received request:", request.url);

  response.statusCode = 200;
  response.setHeader("Content-Type", "text/plain");
  response.end("Hello, World!");
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
```

Making HTTP requests (external):

To make an HTTP request to an external server, you can use the http.get() or https.get() functions. Provide the URL and a callback function to handle the response.

Example:

```jsx
const http = require("http");

const options = {
  hostname: "api.example.com",
  path: "/data",
  method: "GET",
};

const req = http.get(options, res => {
  console.log(`Status code: ${res.statusCode}`);

  res.on("data", data => {
    console.log(data.toString());
  });
});

req.on("error", error => {
  console.error(error);
});
```

Working with the command line:

Accessing command-line arguments:

The process.argv array provides access to the command-line arguments passed to your Node.js script.

Example:

```jsx
console.log(process.argv);
```

Exiting a Node.js program:

Use the process.exit() function to exit a Node.js program. You can pass an exit code (0 for success, non-zero for failure) as an optional parameter.

Example:

```jsx
process.exit(0); // Exit with success
```

Working with packages and dependencies:

Installing a package locally:

Use the npm install <package-name> command to install a package locally in your project. The package is added as a dependency in the package.json file.

Example:

```bash
npm install express
```

Installing a package globally:

Use the npm install -g <package-name> command to install a package globally on your system. Global packages can be used in any Node.js project.

Example:

```bash
npm install -g nodemon
```

Uninstalling a package:

Use the npm uninstall <package-name> command to remove a package from your project's dependencies.

Example:

```bash
npm uninstall express
```

Asynchronous programming:

Using callbacks:

Callbacks are a traditional way of handling asynchronous operations in Node.js. Pass a callback function as a parameter to an asynchronous function to handle the result or error.

Using Promises:

Promises provide a more structured way of handling asynchronous operations. You can create a new Promise and use resolve and reject to handle success and failure.

Using async/await:

Async/await is a modern syntax for writing asynchronous code. You can use the async keyword to define an asynchronous function and await to pause the execution until a promise is resolved.

Debugging and logging:

Printing to the console:

Use console.log() to print messages or variables to the console for debugging or informational purposes.
Debugging with breakpoints:

You can set breakpoints in your code using the debugger statement. When the code reaches the breakpoint, it pauses, allowing you to inspect variables and step through the code.

Using a debugger:

Node.js provides built-in debugging support. You can use the node inspect <filename> or node --inspect <filename> command to start the debugger and debug your code.

Package.json scripts:

Defining custom scripts:

In the package.json file, you can define custom scripts under the "scripts" field. These scripts can be executed using the npm run <script-name> command.

Running scripts:

Use the npm run <script-name> command to run custom scripts defined in the package.json file.

NPM commands:

Installing all dependencies:

Use the npm install command to install all the dependencies listed in the package.json file.

Updating packages:

Use the npm update command to update all or specific packages in your project. You can also specify a particular package to update.

Listing installed packages:

Use the npm list command to display a list of installed packages and their dependencies in your project.

Searching for packages:

Use the npm search <package-name> command to search for packages available in the NPM registry that match the provided package name or keywords.
