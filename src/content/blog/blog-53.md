---
author: Manthan Ankolekar
pubDatetime: 2025-02-27T08:44:00Z
modDatetime: 
title: Fetching and Displaying Data in Angular Using httpResource
postSlug: fetching-and-displaying-data-in-angular-using-httpresource
featured: false
draft: false
tags:
  - Angular
ogImage: ""
description: "Learn how to fetch and display data in Angular using httpResource for efficient API communication."
---

Handling data fetching and displaying in Angular applications is crucial for creating dynamic and interactive user experiences. In this blog post, we'll explore how to use `httpResource` to fetch data from an API and display it in a user-friendly format.

We'll build a simple blog application that fetches posts from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com) and displays them in a grid layout.

## **Project Overview**

We have built an Angular app that:

- Uses the **Angular CLI (v19.2.0)** for project setup.
- Fetches blog posts from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com).
- Displays posts in a grid layout with error handling.
- Implements **standalone components** for cleaner architecture.

Let's dive into the details!

## **1. Setting Up the Angular Project**

To create an Angular app, install the Angular CLI if you haven't already:

```bash
npm install -g @angular/cli
```

Then, generate a new project:

```bash
ng new angular-examples
cd angular-examples
```

Start the development server:

```bash
ng serve
```

Now, open `http://localhost:4200/` in your browser.

## **2. Creating the Blog Component**

The blog component fetches posts from JSONPlaceholder and displays them in a grid layout.

### **Component Code: `app.component.ts`**

```typescript
import { httpResource } from '@angular/common/http';
import { Component, computed, Resource } from '@angular/core';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-blog';

  apiUrl = 'https://jsonplaceholder.typicode.com';

  posts = httpResource<Post[]>(`${this.apiUrl}/posts`);
  error = computed(() => {
    const error = this.posts.error() as Error;
    return error ? error.message : null;
  });

  constructor() {}
}
```

### **Explanation**

- We define a `Post` interface to model the API response.
- We use `httpResource` to fetch blog posts.
- `computed()` is used to handle API errors dynamically.

## **3. Displaying Blog Posts**

The fetched posts are displayed in the `app.component.html` file.

### **Template Code: `app.component.html`**

```html
<div class="container">
  <header>
    <h1>Blog Posts</h1>
  </header>

  @if (posts.isLoading()) {
    <div class="loading">
      <p>Loading posts...</p>
      <div class="spinner"></div>
    </div>
  } @else {
    @if (error()) {
      <div class="error">
        <p>Error loading posts: {{ error() }}</p>
      </div>
    } @else {
      <div class="posts-grid">
        @for (post of posts.value(); track post.id) {
          <article class="post-card">
            <h2>{{ post.title }}</h2>
            <p>{{ post.body }}</p>
            <footer>
              <small>Post ID: {{ post.id }}</small>
            </footer>
          </article>
        }
      </div>
    }
  }
</div>
```

### **Key Features**

- Displays a **loading spinner** while fetching posts.
- Shows an **error message** if the API request fails.
- Uses `@for` directive to iterate through posts and display them in a **grid layout**.

## **4. Styling the Blog**

We use **CSS Grid** to style the blog layout in `app.component.css`.

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.post-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.post-card:hover {
  transform: translateY(-5px);
}

.post-card h2 {
  color: #2c3e50;
  font-size: 1.5rem;
}

.post-card p {
  color: #34495e;
}
```

This makes the blog **responsive, visually appealing, and user-friendly**.

## **5. Configuring Angular for API Calls**

To enable HTTP requests, update `app.config.ts`:

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter([]),
    provideHttpClient(),
  ],
};
```

This **configures Angular's HTTP client** to handle API calls efficiently.

## **6. Running and Testing the App**

To test the application:

```bash
ng serve
```

Visit `http://localhost:4200/` to see the blog posts rendered dynamically.

## **Conclusion**

We have successfully built a **simple Angular blog** that:

- Fetches blog posts from an external API.
- Displays posts dynamically with **error handling**.
- Uses **Angular standalone components** for modularity.
- Features **responsive styling with CSS Grid**.

### Exploring the Code

Visit the [GitHub repository](https://github.com/manthanank/angular-examples/tree/httpresource) to explore the code in detail.
