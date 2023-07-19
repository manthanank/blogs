---
author: Manthan Ankolekar
pubDatetime: 2023-06-26T08:44:00Z
title: Useful Input Decorator Features in Angular 16
postSlug: useful-input-decorator-features-in-angular-16
featured: false
draft: false
tags:
  - angular
ogImage: ""
description: Useful Input Decorator Features in Angular 16
---

Here are 3 useful Input Decorator Features in Angular 16

**Required Input**: This feature allows you to mark an input as required by using the @Input({ required: true }) decorator. This means that the parent component must provide a value for the input, otherwise a runtime error will be thrown. This is useful for ensuring that your components have all the data they need to function properly.

**Transform**: This feature allows you to transform the input value before it is assigned to the input property. This can be useful for validating the input value, formatting it, or converting it to a different type. For example, you could use the transform property to convert a string input to a number.

**Alias**: This property allows you to specify a different name for the input property in the template. This can be useful if you want to use a different name for the input property in the template than the name of the input property in the component class.

```typescript
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-component",
  template: `
    <h1>Input Decorator Features in Angular 16 Example</h1>

    <input type="text" [(ngModel)]="name" placeholder="Name" required />
    <input type="number" [(ngModel)]="age" placeholder="Age" />
    <input type="text" [(ngModel)]="customName" placeholder="Custom Name" />

    <p>Name: {{ name }}</p>
    <p>Age: {{ age }}</p>
    <p>Custom Name: {{ customName }}</p>
  `,
})
export class AppComponent {
  @Input({ required: true })
  name: string;

  @Input({ transform: (value: string) => parseInt(value, 10) })
  age: number;

  @Input({ alias: "customName" })
  customName: string;
}
```

In the above example, the name input property is required, the age input property is transformed from a string to a number, and the customName input property is aliased to the name input property. The HTML code binds the input properties to the component properties using the ngModel directive.

When the user changes the value of an input property in the HTML, the new value is automatically updated in the component property. This is because Angular uses the @Input decorator to listen for changes to the input properties.

[Stackblitz Example Link](https://stackblitz.com/edit/stackblitz-starters-dkoixf?file=src%2Fmain.ts)
