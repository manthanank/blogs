---
author: Manthan Ankolekar
pubDatetime: 2025-03-06T08:44:00Z
modDatetime: 2025-03-08T08:44:00Z
title: Enhancing Angular Applications with HTTP Interceptors for Authentication and Retry Logic
postSlug: enhancing-angular-applications-with-http-interceptors-for-authentication-and-retry-logic
featured: false
draft: false
tags:
  - Angular
ogImage: ""
description: "Learn how to implement HTTP interceptors in Angular for authentication and retry logic. This guide covers creating an interceptor, handling token expiration, and ensuring robust API communication in your applications."
---

### **Introduction**

When working with **Angular applications**, handling **authentication tokens** and **retrying failed HTTP requests** are common challenges. Angular provides a powerful feature called **HTTP Interceptors**, which allows developers to:  

✅ Automatically attach **authentication tokens** to outgoing requests  
✅ Retry failed requests **automatically**  
✅ Centralize **HTTP request modifications** for cleaner code  

In this blog, we will explore how to create and use **HTTP Interceptors in Angular** for:  
1️⃣ **Adding Authorization Headers** dynamically  
2️⃣ **Retrying Failed Requests Automatically**  

We will also demonstrate **how to test an HTTP interceptor dynamically** using an input-based API URL fetcher.  

---

## **🔹 Setting Up HTTP Interceptors in Angular**  

In our project, we have two interceptors:  

📌 **`auth.interceptor.ts`** → Adds a Bearer **auth token** to every request  
📌 **`retry.interceptor.ts`** → **Retries failed requests** up to **2 times** before throwing an error  

These interceptors are provided globally in `app.config.ts`.  

---

## **🔹 1️⃣ Creating an Authentication Interceptor**  

**Goal:** Attach a dynamic **Authorization token** from `localStorage` to every outgoing request.  

### **📌 auth.interceptor.ts**  

```typescript
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authToken = localStorage.getItem('authToken');

  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
```  

### **🔹 How It Works?**

✔ Fetches `authToken` from `localStorage`  
✔ If the token exists, **modifies the request** to include the `Authorization` header  
✔ Passes the modified request to the next handler  

---

## **🔹 2️⃣ Implementing an HTTP Retry Interceptor**  

**Goal:** Automatically **retry failed requests** up to **2 times** before throwing an error.  

### **📌 retry.interceptor.ts**  

```typescript
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Observable, retry } from 'rxjs';

export const retryInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  return next(req).pipe(retry(2)); // Retries failed requests twice
};
```  

### **🔹 Why Use Retry Logic?**

✔ Handles **temporary network failures**  
✔ Improves **user experience** by automatically retrying failed requests  
✔ Reduces **manual error handling**  

---

## **🔹 3️⃣ Providing Interceptors Globally**  

Once we create the interceptors, we must **register them globally** in `app.config.ts`:  

### **📌 app.config.ts**  

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorFn } from './interceptors/auth.interceptor';
import { retryInterceptorFn } from './interceptors/retry.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter([]),
    provideHttpClient(
      withInterceptors([authInterceptorFn, retryInterceptorFn])
    ),
  ],
};
```  

Now, **all HTTP requests in the app** will automatically:  
✅ Include the **Authorization token**  
✅ **Retry** on failure (up to 2 times)  

---

## **🔹 4️⃣ Testing Interceptors with Dynamic API Fetching**  

We will now create a simple **API Fetching Component**, where users can enter an **API URL** and fetch data. The response will be displayed dynamically, and **both interceptors will work behind the scenes**.  

---

### **📌 app.component.ts**  

```typescript
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'angular-examples';

  response: string = '';
  apiUrl: string = 'https://jsonplaceholder.typicode.com/todos/1';

  http = inject(HttpClient);

  constructor() {}

  ngOnInit() {
    localStorage.setItem('authToken', 'your_dynamic_test_token');
  }

  fetchData() {
    this.http.get(this.apiUrl).subscribe({
      next: (data: any) => {
        this.response = data;
      },
      error: (error) => {
        this.response = `Error: ${error.message}`;
      },
    });
  }
}
```  

---

## **🔹 5️⃣ Creating the HTML Template**  

### **📌 app.component.html**  

```html
<h1>Dynamic HTTP Interceptor Test</h1>
<label>URL: <input type="text" [(ngModel)]="apiUrl" /></label><br />
<button (click)="fetchData()">Fetch Data</button>
@if(response){
<p>{{ response | json }}</p>
}
```  

---

## **🔹 6️⃣ Styling the UI**  

### **📌 app.component.css**  

```css
h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  width: 100%;
}

input[type="text"] {
  width: calc(100% - 18px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}

p {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #eee;
  background-color: #f9f9f9;
  white-space: pre-wrap;
  word-wrap: break-word;
}
```  

---

## **🔹 How to Test the Interceptors?**  

1️⃣ **Run the Application**

```bash
ng serve
```  

2️⃣ **Enter an API URL** (e.g., `https://jsonplaceholder.typicode.com/todos/1`)  
3️⃣ **Click "Fetch Data"** to see the response  
4️⃣ **Check Browser DevTools > Network Tab**

- Requests will include **Authorization Headers**  
- Failed requests will **retry automatically**  

---

## **🔹 Key Takeaways**  

✔ **Authentication Interceptor** adds a Bearer token dynamically  
✔ **Retry Interceptor** retries failed requests **up to 2 times**  
✔ **Global Interceptor Registration** ensures all requests are modified automatically  
✔ **Dynamic API Fetching** helps test interceptors in real-time  

---

## **🔹 Final Thoughts**  

Using **Angular HTTP Interceptors**, we can efficiently handle **authentication** and **error retries** without modifying individual API calls. This **improves maintainability and performance**.  

### Exploring the Code

Visit the [GitHub repository](https://github.com/manthanank/angular-examples/tree/httpInterceptorfn) to explore the code in detail.

### Live Demo  

Check out the working example on [StackBlitz](https://stackblitz.com/edit/stackblitz-starters-rtncew)  

---

## Additional Resources  

- [Angular HTTP Interceptors Documentation](https://angular.dev/api/common/http/HttpInterceptor)
- [Angular HTTP Client Guide](https://angular.dev/guide/http)
- [Angular Signals Guide](https://angular.dev/guide/signals)

Feel free to leave comments or questions below! 👋
