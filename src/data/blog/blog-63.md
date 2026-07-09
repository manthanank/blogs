---
author: Manthan Ankolekar
pubDatetime: 2026-07-14T08:44:00Z
modDatetime: 2026-07-14T08:44:00Z
title: Mastering Angular's New Control Flow with TypeScript Code Examples
postSlug: mastering-angular-new-control-flow-with-typescript-code-examples
featured: false
draft: false
tags:
  - Angular
ogImage: ""
description: "Learn how to master Angular's new control flow syntax with TypeScript code examples. This guide covers the new @if, @for, and @switch directives for cleaner and more efficient Angular templates."
---

With the introduction of **Angular v17**, the framework brings a **new control flow syntax** that replaces `*ngIf`, `*ngFor`, and `*ngSwitch` with **@if, @for, and @switch**. This makes Angular templates more readable, maintainable, and closer to JavaScript.

In this blog, we'll explore these features with practical **TypeScript** examples and how to implement them in real-world Angular applications.

> **Important Update**: The traditional structural directives (`*ngIf`, `*ngFor`, and `*ngSwitch`) will be **deprecated in Angular v20**. Now is the time to migrate your code to the new control flow syntax.

---

## **1. Setting Up an Angular Component**

Let's create a simple **User Dashboard** component that displays user details, a list of orders, and order status.

### **✅ TypeScript (`dashboard.component.ts`)**

```typescript
import { Component } from "@angular/core";

interface Order {
  id: number;
  status: "pending" | "shipped" | "delivered";
}

interface User {
  name: string;
  isLoggedIn: boolean;
  role: "admin" | "user";
  orders: Order[];
}

@Component({
  selector: "app-dashboard",
  standalone: true,
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent {
  user: User | null = {
    name: "John Doe",
    isLoggedIn: true,
    role: "user",
    orders: [
      { id: 1, status: "pending" },
      { id: 2, status: "shipped" },
      { id: 3, status: "delivered" },
    ],
  };

  toggleUser() {
    this.user = this.user
      ? null
      : {
          name: "John Doe",
          isLoggedIn: true,
          role: "user",
          orders: [
            { id: 1, status: "pending" },
            { id: 2, status: "shipped" },
            { id: 3, status: "delivered" },
          ],
        };
  }
}
```

---

## **2. Using `@if` for Conditional Rendering**

We'll use `@if` to check if a user is logged in and display the appropriate UI.

### **✅ Template (`dashboard.component.html`)**

```html
<button (click)="toggleUser()">Toggle User</button>

@if (user) {
<h2>Welcome, {{ user.name }}!</h2>
<p>You are logged in as {{ user.role }}.</p>
} @else {
<p>Please log in to access your dashboard.</p>
}
```

### **✨ Benefits of @if**

- No need for `<ng-container>` wrappers.
- Uses a syntax similar to JavaScript `if-else`.

---

## **3. Using `@for` to Loop Through Orders**

We'll display a list of orders using `@for`.

### **✅ Template for @for**

```html
@if (user) {
<h3>Your Orders:</h3>
<ul>
  @for (order of user.orders; track order.id) {
  <li>Order #{{ order.id }} - {{ order.status }}</li>
  } @empty {
  <li>No orders found.</li>
  }
</ul>
}
```

### **✨ Benefits of @for**

- `track order.id` improves performance.
- `@empty` handles cases when there are no items.

---

## **4. Using `@switch` to Handle Order Status**

We'll use `@switch` to display different messages based on order status.

### **✅ Template**

```html
<ul>
  @for (order of user?.orders ?? []; track order.id) {
  <li>
    Order #{{ order.id }} - @switch (order.status) { @case ('pending') {
    <span class="text-warning">Pending</span> } @case ('shipped') {
    <span class="text-info">Shipped</span> } @case ('delivered') {
    <span class="text-success">Delivered</span> } @default {
    <span class="text-muted">Unknown</span> } }
  </li>
  }
</ul>
```

### **✨ Benefits of @switch**

- Eliminates excessive `*ngSwitchCase` directives.
- Closely mirrors JavaScript `switch` syntax.

---

## **5. Full Working Example**

### **✅ Complete Implementation: TypeScript (`dashboard.component.ts`)**

```typescript
import { Component } from "@angular/core";

interface Order {
  id: number;
  status: "pending" | "shipped" | "delivered";
}

interface User {
  name: string;
  isLoggedIn: boolean;
  role: "admin" | "user";
  orders: Order[];
}

@Component({
  selector: "app-dashboard",
  standalone: true,
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent {
  user: User | null = {
    name: "John Doe",
    isLoggedIn: true,
    role: "user",
    orders: [
      { id: 1, status: "pending" },
      { id: 2, status: "shipped" },
      { id: 3, status: "delivered" },
    ],
  };

  toggleUser() {
    this.user = this.user
      ? null
      : {
          name: "John Doe",
          isLoggedIn: true,
          role: "user",
          orders: [
            { id: 1, status: "pending" },
            { id: 2, status: "shipped" },
            { id: 3, status: "delivered" },
          ],
        };
  }
}
```

### **✅ HTML (`dashboard.component.html`)**

```html
<button (click)="toggleUser()">Toggle User</button>

@if (user) {
<h2>Welcome, {{ user.name }}!</h2>
<p>You are logged in as {{ user.role }}.</p>

<h3>Your Orders:</h3>
<ul>
  @for (order of user.orders; track order.id) {
  <li>
    Order #{{ order.id }} - @switch (order.status) { @case ('pending') {
    <span class="text-warning">Pending</span> } @case ('shipped') {
    <span class="text-info">Shipped</span> } @case ('delivered') {
    <span class="text-success">Delivered</span> } @default {
    <span class="text-muted">Unknown</span> } }
  </li>
  } @empty {
  <li>No orders found.</li>
  }
</ul>
} @else {
<p>Please log in to access your dashboard.</p>
}
```

---

## **6. Key Takeaways**

✅ **More Readable** – No more `*` prefixes, making it JavaScript-like.  
✅ **Less Boilerplate** – No need for extra `<ng-container>` elements.  
✅ **Better Performance** – Faster change detection and rendering.  
✅ **Improved Debugging** – Clearer syntax simplifies troubleshooting.  
✅ **Future-Proof** – Legacy syntax will be deprecated in Angular v20.

---

## **7. How to Enable the New Control Flow?**

The new control flow is **enabled by default** in Angular v17+. If you're using an older version, upgrade your Angular project:

```sh
ng update @angular/core @angular/cli
```

or

```sh
ng generate @angular/core:control-flow
```

Once updated, you can start using `@if`, `@for`, and `@switch` in your templates.

---

## **Final Thoughts**

Angular's **new control flow** is a game-changer, making templates **cleaner, more readable, and more efficient**. With the upcoming deprecation of the old syntax in Angular v20, now is the perfect time to embrace these changes. Whether you're working on a small project or a large enterprise app, adopting this syntax will make your Angular development experience **smoother and faster** while ensuring your codebase stays current with Angular's evolution.

## **8. Exploring the Code**

Visit the [GitHub repository](https://github.com/manthanank/angular-examples/tree/new-control-flow) to explore the code in detail.

## **9. Live Demo**

Check out the working example on [StackBlitz](https://stackblitz.com/edit/stackblitz-starters-eq3uyo6r)

---

## **10. Additional Resources**

- [Angular New Control Flow Documentation](https://angular.dev/guide/templates/control-flow)

Feel free to leave comments or questions below! 👋
