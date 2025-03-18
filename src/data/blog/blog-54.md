---
author: Manthan Ankolekar
pubDatetime: 2025-03-04T08:44:00Z
modDatetime: 2025-03-04T08:44:00Z
title: Mastering Angular's Resource API - A Practical Guide
postSlug: mastering-angular-resource-api
featured: false
draft: false
tags:
  - Angular
ogImage: ""
description: "Master Angular's Resource API with this practical guide. Learn to fetch, display, and manage data efficiently in your applications."
---

Angular 19 introduced the **Resource API**, a powerful way to handle data fetching and state management efficiently. In this blog, we'll explore how to use the Resource API in Angular by walking through a practical example from my **Angular Examples** project.  

This guide covers:  
✅ What is the Resource API?  
✅ How to use `resource()` for fetching API data  
✅ Handling loading, success, and error states  
✅ Optimizing state management with signals and computed properties  

## 🔹 **What is the Resource API?**  

The **Resource API** in Angular simplifies data fetching by automatically managing:  
✔️ Request state (loading, success, error)  
✔️ Caching and re-fetching  
✔️ Automatic UI updates with **Angular Signals**  

It provides a **declarative** way to fetch and manage API data while reducing boilerplate code.  

---

## 🔹 **Project Overview: Using Resource API in AngularExamples**  

The **AngularExamples** project demonstrates how to:  
🟢 Fetch and display comments dynamically using the Resource API  
🟢 Use **signals** to manage state efficiently  
🟢 Handle API errors and loading states  

### **Project Structure**  

```text
angular-examples/
│── src/
│   ├── app/
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│── package.json
│── angular.json
│── tsconfig.json
│── README.md
```  

---

## 🔹 **Using the Resource API for Data Fetching**  

We fetch comments based on the **postId** using the **`resource()` API**:  

```typescript
import { Component, resource, signal, computed } from '@angular/core';

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-examples';

  // Signal for managing post ID state
  postId = signal(1);

  // Resource API for fetching comments dynamically
  comments = resource({
    request: () => ({ postId: this.postId() }), 
    loader: ({ request }) =>
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${request.postId}`)
        .then((response) => {
          if (!response.ok) throw new Error('Failed to fetch comments');
          return response.json() as Promise<Comment[]>;
        }),
  });

  // Computed property to get the first comment's email
  firstCommentEmail = computed(() => {
    return this.comments.value()?.[0]?.email ?? 'No comments available';
  });

  updatePostId(event: any) {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue > 0) {
      this.postId.set(newValue);
    }
  }

  nextPost() {
    this.postId.update((current) => current + 1);
  }

  previousPost() {
    if (this.postId() > 1) {
      this.postId.update((current) => current - 1);
    }
  }
}
```  

---

## 🔹 **Displaying API Data in the UI**  

### **1️⃣ Handling Loading, Error, and Success States**  

The **Resource API** provides built-in state management, making it easy to handle:  

✔️ **Loading State**  
✔️ **Error Handling**  
✔️ **Displaying API Data Dynamically**  

```html
<div class="container">
  <div class="input-container">
    <label for="postIdInput" class="input-label">Post ID:</label>
    <input type="number" id="postIdInput" [value]="postId()" (input)="updatePostId($event)" class="post-id-input" />
  </div>

  @if (comments.isLoading()) {
    <p class="loading-message">Loading comments...</p>
  } @else if (comments.error()) {
    <p class="error-message">Error: {{ comments.error() }}</p>
  } @else if (comments.hasValue()) {
    <p class="total-comments">Total Comments: {{ comments.value().length }}</p>
    <ul class="comment-list">
      @for (comment of comments.value(); track comment.id) {
        <li class="comment-item">
          <strong>{{ comment.name }}</strong> ({{ comment.email }}):<br />
          <span>{{ comment.body }}</span>
        </li>
      }
    </ul>
    <button (click)="comments.reload()" class="refresh-button">Refresh</button>
  }

  <div class="navigation-container">
    <button (click)="previousPost()" [disabled]="postId() <= 1" class="nav-button">Previous Post</button>
    <button (click)="nextPost()" class="nav-button">Next Post</button>
    <p class="current-post">Current Post ID: {{ postId() }}</p>
  </div>

  <div class="first-email-container">
    <p>First comment email: {{ firstCommentEmail() }}</p>
  </div>
</div>
```  

---

## 🔹 **Why Use the Resource API?**  

🔹 **Less Boilerplate Code**: No need to manually handle loading, error states, and caching.  
🔹 **Efficient State Management**: Works seamlessly with **signals** for dynamic updates.  
🔹 **Improved Performance**: Automatically caches responses and prevents unnecessary re-fetching.  
🔹 **Cleaner Template Code**: The control flow syntax (`@if`, `@for`) simplifies UI rendering.  

---

## 🔹 **Running the Project**  

To get started with **Angular Examples**, follow these steps:  

1️⃣ **Clone the Repository:**

```bash
git clone https://github.com/manthanank/angular-examples.git
cd angular-examples
```  

2️⃣ **Checkout to resource Branch:**

```bash
git checkout resource
```

3️⃣ **Install Dependencies:**

```bash
npm install
```  

4️⃣ **Run the Development Server:**

```bash
ng serve
```  

Now, open your browser and go to `http://localhost:4200/`. 🎉  

---

## 🔹 **Conclusion**  

The **Resource API** is a game-changer in Angular, making data fetching and state management simpler and more efficient. By integrating it with **signals and computed properties**, you can create highly reactive and performant applications with minimal effort.  

### Exploring the Code

Visit the [GitHub repository](https://github.com/manthanank/angular-examples/tree/resource) to explore the code in detail.

### Live Demo  

Check out the working example on [StackBlitz](https://stackblitz.com/edit/stackblitz-starters-zfzqgojq)  

---

## Additional Resources  

- [Angular Resource API Documentation](https://angular.dev/guide/signals/resource)  
- [Angular Signals Guide](https://angular.dev/guide/signals)  
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)  

Feel free to leave comments or questions below! 👋
