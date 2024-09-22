---
author: Manthan Ankolekar
pubDatetime: 2024-09-22T08:44:00Z
title: Building a CRUD Application with NestJS and MongoDB
postSlug: building-a-crud-application-with-nestjs-and-mongodb
featured: false
draft: false
tags:
  - NestJS
  - MongoDB
  - Prettier
ogImage: ""
description: Learn how to build a CRUD application using NestJS and MongoDB, providing a RESTful API for managing resources and integrating with a NoSQL database.
---

In this blog, we’ll explore how to build a CRUD (Create, Read, Update, Delete) application using NestJS, a progressive Node.js framework, along with MongoDB as the database. We’ll walk through key concepts, structure, and code snippets from the project files.

### Why NestJS?

NestJS is a TypeScript-based framework for building scalable server-side applications. It leverages the full power of Node.js and incorporates elements of OOP (Object-Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

### Setting Up the Project

#### Creating a New NestJS Project

To create a new NestJS project, you can use the NestJS CLI. If you haven’t installed the CLI yet, you can do so using the following command:

```bash
npm install -g @nestjs/cli
```

Next, create a new NestJS project by running:

```bash
nest new crud-nestjs
```

This command will generate a new NestJS project with the name `crud-nestjs`. Navigate to the project directory:

```bash
cd crud-nestjs
```

#### Installing Dependencies

The first step is setting up your NestJS project. We’ll also include MongoDB through `@nestjs/mongoose` and `mongoose` for database interactions. Install the required dependencies:

```bash
npm install @nestjs/core @nestjs/common @nestjs/mongoose mongoose
```

Next, install the necessary dev dependencies:

```bash
npm install --save-dev prettier @nestjs/schematics
```

Your `package.json` should look something like this:

```json
{
  "name": "crud-nestjs",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/config": "^3.2.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/mongoose": "^10.0.2",
    "@nestjs/platform-express": "^10.0.0",
    "mongoose": "^8.0.3",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.42.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "jest": "^29.5.0",
    "prettier": "^3.0.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}
```

#### MongoDB Connection

We’ll use MongoDB as our database. Configure your environment variables to include the MongoDB credentials. Here’s an example `.env` file:

```bash
MONGODB_USER = "yourMongoUser"
MONGODB_PASSWORD = "yourMongoPassword"
```

Then, in `app.module.ts`, you can connect to MongoDB using `MongooseModule`:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.re3ha3x.mongodb.net/nestjs-crud-app`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Defining the User Schema

A user entity in MongoDB is represented by a schema. Here’s the `UserSchema` defined in `users.model.ts`:

```typescript
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

export interface User extends mongoose.Document {
  id: string;
  firstName: string;
  lastName: string;
}
```

### Building the Controller

The controller handles incoming requests and returns responses. In the `users.controller.ts`, we define routes for all CRUD operations:

```typescript
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body('firstName') userFirstName: string,
    @Body('lastName') userLastName: string,
  ) {
    const generatedId = await this.usersService.insertUser(
      userFirstName,
      userLastName,
    );
    return { message: 'User added successfully', id: generatedId };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return { message: 'All users retrieved successfully', users };
  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this.usersService.getSingleUser(userId);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('firstName') userFirstName: string,
    @Body('lastName') userLastName: string,
  ) {
    const updatedUser = await this.usersService.updateUser(
      userId,
      userFirstName,
      userLastName,
    );
    return { message: 'User updated successfully', updatedUser };
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string) {
    await this.usersService.deleteUser(userId);
    return { message: 'User deleted successfully' };
  }
}
```

### Service Layer

The service handles the business logic, interacting with the database. Below is an example from `users.service.ts`:

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(firstName: string, lastName: string) {
    const newUser = new this.userModel({
      firstName,
      lastName: lastName,
    });
    const result = await newUser.save();
    return result.id as string;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    }));
  }

  async getSingleUser(userId: string) {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  async updateUser(userId: string, firstName: string, lastName: string) {
    const updatedUser = await this.findUser(userId);
    if (firstName) {
      updatedUser.firstName = firstName;
    }
    if (lastName) {
      updatedUser.lastName = lastName;
    }
    const savedUser = await updatedUser.save();
    return savedUser;
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find user.');
    }
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}
```

### Users Module

The `UsersModule` is a feature module that encapsulates the user-related components. Here’s an example from `users.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './users.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

### App Controller

The `AppController` is the main controller that handles the root route. Here’s an example from `app.controller.ts`:

```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

### App Service

The `AppService` is the main service that returns a message when the API is running. Here’s an example from `app.service.ts`:

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'API is running!';
  }
}
```

### Main File

The main file, `main.ts`, is the entry point for the application. Here’s an example:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

### Running the Application

Finally, to run your NestJS application, use the following command:

```bash
npm run start:dev
```

Your CRUD operations are now live and accessible through the defined routes.

### Conclusion

This blog covered how to set up a simple CRUD application using NestJS and MongoDB. By following this pattern, you can easily extend it to manage more complex resources and integrate additional features like authentication, authorization, and error handling.

Happy coding!

---

Feel free to customize the content as needed. Let me know if you have any questions or need further assistance. Good luck with your project! 🚀

### Exploring the Code

Visit the [GitHub repository](https://github.com/manthanank/crud-nestjs) to explore the code in detail.

---
