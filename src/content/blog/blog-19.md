---
author: Manthan Ankolekar
pubDatetime: 2023-07-27T08:44:00Z
title: Building a real-time chat application using Node.js, MongoDB, and Express
postSlug: building-a-real-time-chat-application-using-nodejs-mongodb-and-express
featured: false
draft: false
tags:
  - nodejs
  - expressjs
  - mongodb
ogImage: ""
description: Building a real-time chat application using Node.js, MongoDB, and Express
---

Let's get started!

Prerequisites:

1. Node.js and npm installed on your system.
2. Basic understanding of JavaScript and Node.js.

Step 1: Set up the Project

Create a new project folder and initialize a new Node.js project with npm.

```bash
mkdir real-time-chat-app
cd real-time-chat-app
npm init -y
```

Step 2: Install Dependencies

Install the necessary packages for our application.

```bash
npm install express socket.io mongoose
```

Step 3: Set up the Server

Create an app.js file in the root of your project and set up the server using Express and Socket.io.

```jsx
// app.js

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("your_mongodb_uri", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Step 4: Create MongoDB Schema

In this example, we'll create a simple schema for storing chat messages. Create a new folder called models in your project's root and add a Message.js file with the following content:

```jsx
// models/Message.js

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  user: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
```

Step 5: Implement Socket.io for Real-Time Chat

Now, we'll implement the Socket.io logic to handle real-time chat functionality.

```jsx
// app.js

// Add these lines after the previous code in app.js

const Message = require("./models/Message");

io.on("connection", socket => {
  console.log("User connected:", socket.id);

  // Listen for incoming chat messages
  socket.on("chat message", data => {
    console.log("Received message:", data);

    // Save the message to MongoDB
    const message = new Message({ user: data.user, text: data.message });
    message.save(err => {
      if (err) {
        console.error("Error saving message to database:", err);
      } else {
        console.log("Message saved to the database");
      }
    });

    // Broadcast the message to all connected clients
    io.emit("chat message", data);
  });

  // Listen for user disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
```

Step 6: Create Frontend

Now, create a basic HTML file to interact with the server using Socket.io.

```jsx
<!-- index.html -->

<!DOCTYPE html>
<html>
<head>
  <title>Real-Time Chat</title>
</head>
<body>
  <h1>Real-Time Chat App</h1>
  <div id="chat">
    <ul id="messages"></ul>
    <form id="messageForm">
      <input id="messageInput" autocomplete="off" />
      <button>Send</button>
    </form>
  </div>

  <script src="/socket.io/socket.io.js"></script>
  <script>
    const socket = io();

    // Handle incoming chat messages
    socket.on('chat message', (data) => {
      const messages = document.getElementById('messages');
      const li = document.createElement('li');
      li.textContent = `${data.user}: ${data.message}`;
      messages.appendChild(li);
    });

    // Handle form submission
    document.getElementById('messageForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('messageInput');
      const message = input.value.trim();
      if (message !== '') {
        socket.emit('chat message', { user: 'User', message });
        input.value = '';
      }
    });
  </script>
</body>
</html>
```

Step 7: Serving Static Files

Create a folder called public in your project's root directory and place the index.html file inside it. Additionally, modify the app.js to serve static files from this folder.

```jsx
// app.js

// Add these lines after the previous code in app.js

app.use(express.static("public"));
```

Step 8: Run the Application

Now, you can run your real-time chat application using the following command:

```bash
node app.js
```

Open your browser and visit `http://localhost:3000`. You can open multiple browser tabs to simulate multiple users and see real-time chat in action.

Remember, this example is a basic implementation. In a real-world scenario, you may need to handle user authentication, store messages more efficiently, and add various other features to make the chat application more robust and secure.

Complete Code: [GitHub](https://github.com/manthanank/Real-Time-Chat-Application)
