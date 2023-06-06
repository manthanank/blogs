---
author: Manthan Ankolekar
pubDatetime: 2023-06-06T08:44:00Z
title: What is ForwardRef Function in Angular?
postSlug: forwardRef-function-in-angular
featured: true
draft: false
tags:
  - angular
ogImage: ""
description: What is ForwardRef Function in Angular application?
---

**ForwardRef** function is used to resolve circular dependencies when working with dependency injection. Circular dependencies occur when two or more services or components depend on each other. The **ForwardRef** function allows you to reference a service or component that is not yet defined.

Here's how you can use ForwardRef in Angular:

- Import the ForwardRef function from the @angular/core module:

  ```typescript
  import { ForwardRef } from "@angular/core";
  ```

- Define a class or a function that represents the service or component with the circular dependency.

  ```typescript
  import { Injectable } from "@angular/core";

  @Injectable()
  export class ServiceA {
    constructor(private serviceB: ServiceB) {}
  }

  @Injectable()
  export class ServiceB {
    constructor(private serviceA: ServiceA) {}
  }
  ```

- To resolve the circular dependency, use the ForwardRef function.

  ```typescript
  import { Injectable, forwardRef } from "@angular/core";

  @Injectable()
  export class ServiceA {
    constructor(
      @Inject(forwardRef(() => ServiceB)) private serviceB: ServiceB
    ) {}
  }

  @Injectable()
  export class ServiceB {
    constructor(
      @Inject(forwardRef(() => ServiceA)) private serviceA: ServiceA
    ) {}
  }
  ```

By using forwardRef(() => ServiceB), we're telling Angular to wait until ServiceB is defined before injecting it into ServiceA, and vice versa.

The **ForwardRef** function is particularly useful when working with circular dependencies between services or components in Angular. It helps Angular's dependency injection system resolve the dependencies correctly.

Example:

```typescript
// service file
import { Injectable, Inject, forwardRef } from "@angular/core";

@Injectable()
export class ServiceA {
  constructor(@Inject(forwardRef(() => ServiceB)) private serviceB: ServiceB) {
    this.serviceB.setValue("Hello from ServiceA");
  }

  getValueFromServiceB(): string {
    return this.serviceB.getValue();
  }
}

@Injectable()
export class ServiceB {
  private value: string;

  constructor(@Inject(forwardRef(() => ServiceA)) private serviceA: ServiceA) {
    this.serviceA.setValue("Hello from ServiceB");
  }

  setValue(value: string): void {
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
}
```

```typescript
// example component
import { Component } from "@angular/core";
import { ServiceA } from "./service-a.service";

@Component({
  selector: "app-example",
  template: `
    <p>Value from ServiceA: {{ valueFromServiceA }}</p>
    <p>Value from ServiceB: {{ valueFromServiceB }}</p>
  `,
})
export class ExampleComponent {
  valueFromServiceA: string;
  valueFromServiceB: string;

  constructor(private serviceA: ServiceA) {
    this.valueFromServiceA = this.serviceA.getValueFromServiceB();
    this.valueFromServiceB = this.serviceA.getValue();
  }
}
```

```typescript
// app.module.ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ExampleComponent } from "./example.component";
import { ServiceA, ServiceB } from "./service-a.service";

@NgModule({
  imports: [BrowserModule],
  declarations: [ExampleComponent],
  providers: [ServiceA, ServiceB],
  bootstrap: [ExampleComponent],
})
export class AppModule {}
```

```typescript
// main.ts
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app.module";

platformBrowserDynamic().bootstrapModule(AppModule);
```
