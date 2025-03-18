---
author: Manthan Ankolekar
pubDatetime: 2025-01-28T08:44:00Z
modDatetime: 
title: Containerizing a Node.js Application with Docker
postSlug: containerizing-a-node-js-application-with-docker
featured: false
draft: false
tags:
  - Node.js
  - Docker
ogImage: ""
description: "Learn how to containerize a Node.js application with Docker, enabling you to build, ship, and run your app in a consistent environment."
---

In this blog post, we will walk through the process of containerizing a simple Node.js application using Docker. We will cover the project structure, Dockerfile configuration, Docker Compose setup, and continuous integration with GitHub Actions.

## Project Overview

Our project is a simple Node.js application that uses the Express framework to serve a basic web page. The application is containerized using Docker, allowing it to run consistently across different environments.

### Project Structure

Here's an overview of the project structure:

```text
.dockerignore
.github/
    workflows/
        ci.yml
.gitignore
docker-compose.yml
Dockerfile
index.js
LICENSE
package.json
README.md
```

### Key Files

- `Dockerfile`: Defines the Docker image configuration.
- **index.js**: The main application file that sets up the Express server.
- **package.json**: Lists the project dependencies and scripts.
- **.github/workflows/ci.yml**: GitHub Actions configuration for continuous integration.
- **docker-compose.yml**: Docker Compose configuration for running the application.

## Setting Up the Project

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.x
- Docker
- npm

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/manthanank/nodejs-docker.git
    cd nodejs-docker
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npm start
    ```

## Docker Configuration

### Dockerfile

The `Dockerfile` defines the steps to create a Docker image for our Node.js application:

```yml
# Use a more specific Node.js base image with Alpine Linux
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Use a non-root user for security
USER node

# Command to run the application
CMD ["npm", "start"]
```

Building and Running the Docker Image

1. Build the Docker image:

    ```bash
    docker build -t nodejs-docker .
    ```

2. Run the Docker container:

    ```bash
    docker run -d -p 3000:3000 nodejs-docker
    ```

3. Open the browser and navigate to `http://localhost:3000`.

### Docker Compose

Docker Compose simplifies the process of managing multi-container applications. Our `docker-compose.yml` file defines the configuration for running the application:

```yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules
```

### Running the Application with Docker Compose

1. Start the application using Docker Compose:

    ```bash
    docker-compose up -d
    ```

2. Open the browser and navigate to `http://localhost:3000`.

### Continuous Integration with GitHub Actions

We use GitHub Actions for continuous integration. The ci.yml file defines the CI pipeline:

```yml
name: CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm install

    # - name: Run tests
    #   run: npm test

    - name: Build Docker image
      run: docker build -t nodejs-docker .

    - name: Run Docker container
      run: docker run -d -p 3000:3000 nodejs-docker
```

## Conclusion

In this blog post, we covered the steps to containerize a Node.js application using Docker. We also set up Docker Compose for easier management and configured GitHub Actions for continuous integration. By following these steps, you can ensure your application runs consistently across different environments.

Feel free to explore the [GitHub repository](https://github.com/manthanank/nodejs-docker) for more details and to try out the project yourself. Happy coding!
