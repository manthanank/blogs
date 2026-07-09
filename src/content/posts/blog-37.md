---
author: Manthan Ankolekar
pubDatetime: 2024-10-23T08:44:00Z
modDatetime: 
title: Handling Global Errors in Angular - A Simple App with Custom ErrorHandler
postSlug: handling-global-errors-in-angular-a-simple-app-with-custom-errorhandler
featured: false
draft: false
tags:
  - Angular
ogImage: ""
description: "Learn how to handle global errors in Angular by creating a simple app with a custom ErrorHandler. This blog provides a step-by-step guide to implementing a global error handler in Angular to manage errors across the application."
---

In every Angular application, handling errors gracefully is crucial to providing a seamless user experience. Angular’s built-in `ErrorHandler` service offers a robust way to manage uncaught errors globally. By customizing this service, we can manage errors effectively—whether they’re caused by invalid user inputs, failed HTTP requests, or other unforeseen issues.

In this blog, we’ll walk through the creation of a simple Angular app with a custom global error handler. The app will feature a basic form where users input a value. If an error occurs (e.g., the user provides invalid input), it will be caught and handled by the custom error handler.

### Why Use a Global ErrorHandler?

In Angular, exceptions in the application that are not caught will be handled by the default `ErrorHandler` service, which simply logs the errors to the console. While this may suffice during development, in production, you’ll want to provide more robust error-handling solutions, such as:

- Logging errors to an external service (e.g., Sentry, LogRocket).
- Displaying user-friendly error messages.
- Redirecting users to a custom error page.

### Let’s Build It: Step-by-Step Guide

#### 1. Setting Up the Angular Application

To get started, create a new Angular project if you don’t already have one:

```bash
ng new error-handler-app
cd error-handler-app
```

#### 2. Creating a Custom Error Handler

We need to extend Angular's `ErrorHandler` service to create our custom error handler. This custom handler will override the default behavior and allow us to display error alerts and log the errors for debugging.

Create a file called `global-error-handler.ts` in the `src/app` folder:

```typescript
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('Global Error:', error);
    alert('An error occurred! Please check the console for details.');
  }
}
```

In this simple example, we log the error to the console and show an alert notifying the user that something went wrong.

#### 3. Updating the `AppModule`

Next, we need to inform Angular that we want to use our custom error handler. Open `src/app/app.module.ts` and update the `providers` array to register the `GlobalErrorHandler`:

```typescript
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { GlobalErrorHandler } from './global-error-handler';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Here, we are telling Angular to use our `GlobalErrorHandler` instead of the default `ErrorHandler`.

#### 4. Creating a Simple Form Component

We will create a basic form that simulates an error if the user inputs invalid data. In `src/app/app.component.ts`, add the following code:

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  inputValue = signal<string>('');
  result = signal<number | null>(null);

  onSubmit() {
    try {
      // Simulate an error if input is not a valid number
      const numberValue = parseInt(this.inputValue());
      if (isNaN(numberValue)) {
        throw new Error('Invalid number input');
      }
      this.result.set(numberValue * 10);
    } catch (error) {
      throw error; // This will be caught by the GlobalErrorHandler
    }
  }
}
```

```html
<div class="container">
  <h1>Simple Error Handler Example</h1>
  <p>
    Enter a number and see the result multiplied by 10. If the input is invalid, an error will be thrown.
  </p>
  <form (ngSubmit)="onSubmit()">
    <label for="number">Enter a number:</label>
    <input type="text" [(ngModel)]="inputValue" name="number" />
    <button type="submit">Submit</button>
  </form>
  @if (result()) {
  <p>Result: {{ result() }}</p>
  }
</div>
```

```css
.container {
  max-width: 400px;
  margin: 100px auto;
}

input {
  display: block;
  margin-bottom: 10px;
}
```

#### How It Works

- The app consists of a simple form where the user enters a number.
- When the user submits the form, the input is validated by trying to convert it to an integer using `parseInt()`.
- If the input is not a valid number, an error is thrown, which will be caught and handled by the `GlobalErrorHandler`.

#### 5. Running the App

To test your application, run the following command:

```bash
ng serve
```

Go to `http://localhost:4200`, and you’ll see the form. Try submitting a non-numeric value (e.g., letters), and the custom error handler will display an alert, while the error details are logged in the console.

### Conclusion

Handling errors properly is vital for any production-ready Angular application. In this simple app, we created a custom `ErrorHandler` to catch and manage errors globally. This approach allows you to centralize error handling and ensure that your users are informed when something goes wrong—without overwhelming them with technical details.

As you expand this example, consider:

- Logging errors to an external service.
- Implementing different error-handling strategies for client-side vs. server-side errors.
- Creating user-friendly error pages.

With Angular’s `ErrorHandler`, you have the flexibility to manage errors in a way that enhances both the user experience and the maintainability of your application.

---

Feel free to extend this example or customize the `ErrorHandler` to meet your specific needs.

Happy coding!

---

Feel free to customize the content as needed. Let me know if you have any questions or need further assistance. Good luck with your project! 🚀

### Exploring the Code

Visit the [GitHub repository](https://github.com/manthanank/error-handler-app) to explore the code in detail.

---
