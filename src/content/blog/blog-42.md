---
author: Manthan Ankolekar
pubDatetime: 2024-11-25T08:44:00Z
modDatetime: 
title: Building an Angular App with Enum Alternatives - A Hands-On Guide
postSlug: building-an-angular-app-with-enum-alternatives-a-hands-on-guide
featured: false
draft: false
tags:
  - Angular
  - Enums
ogImage: ""
description: "Learn how to build an Angular app with enum alternatives to manage related constants in your application. This blog provides a hands-on guide to creating, using, and effectively applying enum alternatives in Angular."
---

Let's create a simple Angular app that demonstrates how to use enum alternatives to manage related constants. Enum alternatives offer flexibility and type safety when working with a small set of constants in TypeScript. In this guide, we'll walk through the process of building an Angular app that uses various enum alternatives to manage user statuses and roles.

### Step 1: Set Up the Angular App

Create a new Angular project and navigate into it:

```bash
ng new enum-alternatives-app
cd enum-alternatives-app
```

Generate two components that will demonstrate different ways to handle user statuses and roles:

```bash
ng generate component UserStatus
ng generate component UserRole
```

### Step 2: Define Enum Alternatives

In the `src/app` directory, create a folder named `types` to keep your enum alternatives organized:

```bash
mkdir src/app/types
```

Then, create the following files inside the `types` folder to define each enum alternative.

#### 1. Union Type (`types/user-status.type.ts`)

Define a union type to represent user statuses:

```typescript
export type UserStatusType = 'Active' | 'Inactive' | 'Pending';
```

#### 2. Constant Object (`types/status.constant.ts`)

Define a constant object with `as const` for user statuses:

```typescript
export const STATUS = {
  Active: 'Active',
  Inactive: 'Inactive',
  Pending: 'Pending'
} as const;

export type StatusValues = typeof STATUS[keyof typeof STATUS];
```

#### 3. Namespace with Constant Values (`types/role.namespace.ts`)

Define a namespace for user roles:

```typescript
export namespace Role {
  export const Admin = 'Admin';
  export const User = 'User';
  export const Guest = 'Guest';
}

export type RoleType = typeof Role.Admin | typeof Role.User | typeof Role.Guest;
```

#### 4. Class with Static Properties (`types/role.class.ts`)

Define a class with static properties for user roles:

```typescript
export class UserRole {
  static readonly Admin = 'Admin';
  static readonly User = 'User';
  static readonly Guest = 'Guest';
}

export type UserRoleType = string;
```

#### 5. Mapped Type (`types/status-values.ts`)

Define a mapped type for user statuses:

```typescript
const StatusValues = {
  Active: 'Active',
  Inactive: 'Inactive',
  Pending: 'Pending'
} as const;

export type MappedStatusType = keyof typeof StatusValues;
```

### Step 3: Implement Components Using Enum Alternatives

Next, let’s set up each component to demonstrate these alternatives.

#### `UserStatusComponent` (Union Type and Constant Object)

In `user-status.component.ts`, import the union type and constant object, and create a method to set the user's status:

```typescript
import { Component } from '@angular/core';
import { UserRoleType, UserRole } from '../types/role.class';
import { RoleType, Role } from '../types/role.namespace';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-role',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-role.component.html',
  styleUrl: './user-role.component.scss',
})
export class UserRoleComponent {
  role: RoleType = Role.User;
  userRoles: UserRoleType[] = [UserRole.Admin, UserRole.User, UserRole.Guest];

  setRole(newRole: RoleType) {
    this.role = newRole;
  }
}
```

In `user-status.component.html`, use a dropdown to display and select statuses:

```html
<h3>Set User Status</h3>
<select [(ngModel)]="status">
    @for (s of statusValues; track $index) {
    <option [value]="s">{{ s }}</option>
    }
</select>
<p>Current Status: {{ status }}</p>
```

#### `UserRoleComponent` (Namespace and Static Class)

In `user-role.component.ts`, import the namespace and class-based role definitions:

```typescript
import { Component } from '@angular/core';
import { UserRoleType, UserRole } from '../types/role.class';
import { RoleType, Role } from '../types/role.namespace';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-role',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-role.component.html',
  styleUrl: './user-role.component.scss',
})
export class UserRoleComponent {
  role: RoleType = Role.User;
  userRoles: UserRoleType[] = [UserRole.Admin, UserRole.User, UserRole.Guest];

  setRole(newRole: RoleType) {
    this.role = newRole;
  }
}
```

In `user-role.component.html`, use a dropdown to select roles:

```html
<h3>Set User Role</h3>
<select [(ngModel)]="role">
    @for (r of userRoles; track $index) {
    <option [value]="r">{{ r }}</option>
    }
</select>
<p>Current Role: {{ role }}</p>
```

### Step 4: Display Components in the App Component

In `app.component.html`, add both `UserStatusComponent` and `UserRoleComponent` to display them on the page:

```html
<h2>User Management</h2>
<app-user-status></app-user-status>
<app-user-role></app-user-role>
```

### Step 5: Configure the Application

Make sure to import the components in `app.component.ts`:

```typescript
import { Component } from '@angular/core';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserStatusComponent } from './user-status/user-status.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserRoleComponent, UserStatusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'enum-alternatives-app';
}
```

In `app.config.ts`, provide the necessary configuration:

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
```

### Step 6: Run the Application

Now, start the Angular development server:

```bash
ng serve
```

Open your browser and navigate to `http://localhost:4200` to see the application. You should see dropdowns to select the user status and role, with current selections displayed below each dropdown.

### Summary

This Angular app demonstrates how to use various enum alternatives in TypeScript: union types, constant objects, namespaces, classes with static properties, and mapped types. This approach allows for flexibility and type safety when working with a small set of constants and types in Angular.

Feel free to extend this example or customize it further to suit your requirements. Enum alternatives are powerful tools in TypeScript that can help you manage related constants effectively in your Angular applications.

Happy coding! 🚀

---

### Exploring the Code

Visit the [GitHub repository](https://github.com/manthanank/enum-alternatives-app) to explore the code in detail.

---
