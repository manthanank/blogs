---
author: Manthan Ankolekar
pubDatetime: 2024-11-20T08:44:00Z
modDatetime: 
title: Building an Angular App with Enum - A Hands-On Guide
postSlug: building-an-angular-app-with-enum-a-hands-on-guide
featured: false
draft: false
tags:
  - Angular
  - Enums
ogImage: ""
description: "Learn how to build an Angular app with enums to manage related constants in your application. This blog provides a hands-on guide to creating, using, and effectively applying enums in Angular."
---

Let's create a simple Angular app that demonstrates how to use enums to manage related constants. Enums are a powerful feature in TypeScript that can help you organize and maintain your codebase more effectively. In this guide, we'll walk through the process of building an Angular app that uses enums to manage user roles and statuses.

### Step 1: Set Up the Angular App

First, generate a new Angular app. Run the following command:

```bash
ng new user-management
cd user-management
```

Then, generate the components we’ll need:

```bash
ng generate component UserStatus
ng generate component UserRole
```

### Step 2: Define Alternatives to Enum

Let's create a folder called `types` to keep all our constants and types organized.

```bash
mkdir src/app/types
```

#### Union Type (`types/user-status.type.ts`)

Define a union type to represent user statuses:

```typescript
export type UserStatusType = 'Active' | 'Inactive' | 'Pending';
```

#### Constant Object (`types/status.constant.ts`)

Define a constant object for user statuses:

```typescript
export const STATUS = {
  Active: 'Active',
  Inactive: 'Inactive',
  Pending: 'Pending'
} as const;

export type StatusValues = typeof STATUS[keyof typeof STATUS];
```

#### Namespace with Constant Values (`types/role.namespace.ts`)

Define a namespace for user roles:

```typescript
export namespace Role {
  export const Admin = 'Admin';
  export const User = 'User';
  export const Guest = 'Guest';
}

export type RoleType = typeof Role.Admin | typeof Role.User | typeof Role.Guest;
```

#### Class with Static Properties (`types/role.class.ts`)

Define a class for user roles with static properties:

```typescript
export class UserRole {
  static readonly Admin = 'Admin';
  static readonly User = 'User';
  static readonly Guest = 'Guest';
}

export type UserRoleType = string;
```

#### Mapped Type (`types/status-values.ts`)

Use a mapped type to dynamically create the status keys:

```typescript
const StatusValues = {
  Active: 'Active',
  Inactive: 'Inactive',
  Pending: 'Pending'
} as const;

export type MappedStatusType = keyof typeof StatusValues;
```

### Step 3: Use Alternatives in Components

In each component, we’ll use different ways of handling and displaying user roles and statuses.

#### `UserStatusComponent` (using Union Type and Constant Object)

In `user-status.component.ts`, add the following:

```typescript
import { Component } from '@angular/core';
import { UserStatusType } from '../types/user-status.type';
import { STATUS, StatusValues } from '../types/status.constant';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-status',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-status.component.html',
  styleUrl: './user-status.component.scss',
})
export class UserStatusComponent {
  status: UserStatusType = 'Active';
  statusValues = Object.values(STATUS);

  setStatus(newStatus: StatusValues) {
    this.status = newStatus;
  }
}
```

In `user-status.component.html`:

```html
<h3>Set User Status</h3>
<select [(ngModel)]="status">
    @for (s of statusValues; track $index) {
    <option [value]="s">{{ s }}</option>
    }
</select>
<p>Current Status: {{ status }}</p>
```

#### `UserRoleComponent` (using Namespace and Static Class)

In `user-role.component.ts`, add the following:

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

In `user-role.component.html`:

```html
<h3>Set User Role</h3>
<select [(ngModel)]="role">
    @for (r of userRoles; track $index) {
    <option [value]="r">{{ r }}</option>
    }
</select>
<p>Current Role: {{ role }}</p>
```

### Step 4: Display in the App Component

In `app.component.html`, add both components:

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
  title = 'user-management';
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

Finally, run the Angular app:

```bash
ng serve
```

### Conclusion

In this example, we created a basic Angular app that demonstrates how to use alternatives to enums for managing constants and types in TypeScript. Each approach has unique benefits, and understanding how to use them can help you write cleaner, more readable, and maintainable code in Angular. You can choose any alternative based on your project’s needs and the complexity of your data structure.

Feel free to extend this example or customize it further to suit your requirements. Enums and their alternatives are powerful tools in TypeScript that can help you manage related constants effectively.

Happy coding! 🚀

---

### Exploring the Code

Visit the [GitHub repository](https://github.com/manthanank/user-management) to explore the code in detail.

---
