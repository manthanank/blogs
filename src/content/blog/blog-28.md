---
author: Manthan Ankolekar
pubDatetime: 2024-09-03T08:44:00Z
title: Building a Unit Converter App in Angular with Tailwind CSS
postSlug: building-a-unit-converter-app-in-angular-with-tailwind-css
featured: false
draft: false
tags:
  - Angular
  - Tailwind CSS
ogImage: ""
description: Learn how to build a unit converter app in Angular using Tailwind CSS for styling, providing a simple yet powerful tool for converting units of length.
---

Unit converters are handy tools for converting measurements between different units, making it easier to work with various systems of measurement. In this tutorial, we'll build a unit converter app in Angular that allows users to convert values between different length units, such as meters, kilometers, centimeters, and millimeters. We'll implement the conversion logic and use Tailwind CSS for styling to create a visually appealing and user-friendly interface.

## **Table of Contents**

- Introduction
- Setting Up the Project
- Implementing the Conversion Logic
- Styling with Tailwind CSS
- Running the Application
- Conclusion
- Exploring the Code

---

### **Introduction**

A unit converter app provides a useful tool for converting measurements between different units, making it easier to work with various systems of measurement. In this project, we'll focus on length units, allowing users to convert values between meters, kilometers, centimeters, and millimeters. The app will feature a simple and intuitive interface that enables users to input a value, select the units to convert from and to, and view the converted result instantly.

### **Setting Up the Project**

Start by creating a new Angular project. If you haven't already set up Angular CLI, install it using the command:

```bash
npm install -g @angular/cli
```

Next, create a new Angular project:

```bash
ng new unit-converter-app
cd unit-converter-app
```

After the project is set up, install Tailwind CSS:

```bash
npm install -D tailwindcss
npx tailwindcss init
```

Configure Tailwind CSS by updating the `tailwind.config.js` file:

```javascript
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Include Tailwind's base, components, and utilities in your `src/styles.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### **Implementing the Conversion Logic**

In `app.component.ts`, define the conversion logic between units:

```typescript
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  units = signal(['Meter', 'Kilometer', 'Centimeter', 'Millimeter']);
  inputValue = signal(0);
  fromUnit = signal('Meter');
  toUnit = signal('Meter');
  result = signal<number | null>(null);
  errorMessage = signal<string | null>(null);

  meta = inject(Meta);

  constructor() {
    this.meta.addTag({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    });
    this.meta.addTag({
      rel: 'icon',
      type: 'image/x-icon',
      href: 'favicon.ico',
    });
    this.meta.addTag({
      rel: 'canonical',
      href: 'https://unit-converter-app-manthanank.vercel.app/',
    });
    this.meta.addTag({ property: 'og:title', content: 'Unit Converter App' });
    this.meta.addTag({ name: 'author', content: 'Manthan Ankolekar' });
    this.meta.addTag({ name: 'keywords', content: 'angular' });
    this.meta.addTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      property: 'og:description',
      content:
        'A simple unit converter app built using Angular that converts units like meter, kilometer, and more.',
    });
    this.meta.addTag({
      property: 'og:image',
      content: 'https://unit-converter-app-manthanank.vercel.app/image.jpg',
    });
    this.meta.addTag({
      property: 'og:url',
      content: 'https://unit-converter-app-manthanank.vercel.app/',
    });
  }

  convert() {
    if (!this.validateInput()) {
      return;
    }

    const conversionRates: { [key: string]: number } = {
      Meter: 1,
      Kilometer: 0.001,
      Centimeter: 100,
      Millimeter: 1000,
    };

    const fromRate = conversionRates[this.fromUnit()];
    const toRate = conversionRates[this.toUnit()];

    this.result.set((this.inputValue() * fromRate) / toRate);
  }

  reset() {
    this.inputValue.set(0);
    this.fromUnit.set('Meter');
    this.toUnit.set('Meter');
    this.result.set(null);
    this.errorMessage.set(null);
  }

  swapUnits() {
    const temp = this.fromUnit();
    this.fromUnit.set(this.toUnit());
    this.toUnit.set(temp);
  }

  validateInput(): boolean {
    if (this.inputValue() < 0) {
      this.errorMessage.set('Input value cannot be negative.');
      return false;
    }
    this.errorMessage.set(null);
    return true;
  }
}
```

This code sets up the basic conversion logic, handling user inputs for converting units of length.

### **Styling with Tailwind CSS**

Now, let's design the interface using Tailwind CSS in `app.component.html`:

```html
<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-4">
    <h2 class="text-2xl font-bold text-center">Unit Converter</h2>

    <div class="space-y-2">
      <label for="inputValue" class="block text-sm font-medium text-gray-700">Input Value:</label>
      <input type="number" id="inputValue" [(ngModel)]="inputValue"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>

    <div class="space-y-2">
      <label for="fromUnit" class="block text-sm font-medium text-gray-700">From:</label>
      <select id="fromUnit" [(ngModel)]="fromUnit"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        @for (unit of units(); track $index) {
        <option [value]="unit">{{ unit }}</option>
        }
      </select>
    </div>

    <div class="space-y-2">
      <label for="toUnit" class="block text-sm font-medium text-gray-700">To:</label>
      <select id="toUnit" [(ngModel)]="toUnit"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        @for (unit of units(); track $index) {
        @if (unit !== fromUnit()) {
        <option [value]="unit">{{ unit }}</option>
        }
        }
      </select>
    </div>

    <div class="flex space-x-2">
      <button (click)="convert()"
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Convert</button>
      <button (click)="reset()"
        class="w-full bg-gray-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Reset</button>
      <button (click)="swapUnits()"
        class="w-full bg-yellow-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">Swap</button>
    </div>

    @if (errorMessage()){
    <div class="text-red-500 text-center mt-4">{{ errorMessage() }}</div>
    }

    @if (result() !== null) {
    <h3 class="text-xl font-semibold text-center mt-4">Result: {{result()}}</h3>
    }
  </div>
</div>
```

The design uses Tailwind CSS classes to create a simple, responsive UI that adjusts seamlessly across different devices.

### **Running the Application**

Run your application with:

```bash
ng serve
```

Navigate to `http://localhost:4200/` to see your Unit Converter App in action. You can input a value, select units from the dropdown menus, and click "Convert" to see the result instantly.

### **Conclusion**

Congratulations! You've successfully built a unit converter app in Angular using Tailwind CSS for styling. This project demonstrates how to create a functional and visually appealing web application that provides a valuable tool for converting units of length. You can further enhance the app by adding more unit options, improving the design, or implementing additional features.

Happy coding!

---

Feel free to customize the content as needed. Let me know if you have any questions or need further assistance. Good luck with your project! 🚀

### Exploring the Code

Visit the [GitHub repository](https://github.com/manthanank/unit-converter-app) to explore the code in detail.

---
