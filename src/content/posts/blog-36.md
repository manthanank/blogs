---
author: Manthan Ankolekar
pubDatetime: 2024-10-22T08:44:00Z
modDatetime: 
title: Building an Investment Calculator in Angular with Tailwind CSS
postSlug: building-an-investment-calculator-in-angular-with-tailwind-css
featured: false
draft: false
tags:
  - Angular
  - Tailwind CSS
ogImage: ""
description: "Learn how to build an investment calculator in Angular using Tailwind CSS. This blog provides a step-by-step guide to creating an investment calculator that calculates the future value of an investment based on user inputs."
---

In today’s world, financial planning is essential for individuals and businesses. Investment calculators play a significant role in estimating returns and making informed decisions. In this blog, I will walk you through creating an investment calculator using Angular for functionality and Tailwind CSS for styling. Additionally, I’ll showcase a custom logo that represents financial growth through the Indian rupee symbol.

### **Project Overview**

The investment calculator helps users estimate the future value of their investments based on an initial investment amount, annual interest rate, and investment duration. The app will be built using Angular, with Tailwind CSS providing a responsive and modern user interface.

### **Why Angular and Tailwind CSS?**

- **Angular:** A robust framework perfect for building complex applications with reusable components.
- **Tailwind CSS:** A utility-first CSS framework that allows for rapid UI development, enabling you to create responsive designs with minimal effort.

### **Step 1: Setting Up the Angular Project**

Start by creating a new Angular project.

```bash
ng new investment-calculator
cd investment-calculator
```

Next, install and configure Tailwind CSS in your Angular project:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

Configure the `tailwind.config.js` file:

```js
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Finally, add Tailwind directives to your `src/styles.css` file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### **Step 2: Creating the Investment Calculator Component**

Generate a component to handle the investment calculation logic:

```bash
ng generate component investment-calculator
```

Now, implement the logic in `investment-calculator.component.ts`:

```ts
import { CurrencyPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-investment-calculator',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './investment-calculator.component.html',
  styleUrl: './investment-calculator.component.scss',
})
export class InvestmentCalculatorComponent {
  initialInvestment = signal(0);
  annualRate = signal(0);
  years = signal(0);
  futureValue = signal<number | null>(null);

  calculateInvestment() {
    const rate = this.annualRate() / 100;
    this.futureValue.set(this.initialInvestment() * Math.pow(1 + rate, this.years()));
  }
}
```

### **Step 3: Designing the User Interface**

In the template file, create a form for user input and display the calculated future value.

```html
<div class="container mx-auto mt-10">
    <h1 class="text-2xl font-bold text-center mb-6">Investment Calculator</h1>

    <form class="space-y-4" (ngSubmit)="calculateInvestment()">
        <div>
            <label class="block text-lg font-medium">Initial Investment (₹)</label>
            <input type="number" [(ngModel)]="initialInvestment" class="input-field" required
                name="initialInvestment" />
        </div>

        <div>
            <label class="block text-lg font-medium">Annual Interest Rate (%)</label>
            <input type="number" [(ngModel)]="annualRate" class="input-field" required name="annualRate" />
        </div>

        <div>
            <label class="block text-lg font-medium">Years</label>
            <input type="number" [(ngModel)]="years" class="input-field" required name="years" />
        </div>

        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Calculate</button>
    </form>

    @if (futureValue()) {
    <div class="mt-6">
        <h2 class="text-xl font-bold">Future Value: {{ futureValue() | currency: 'INR' }}</h2>
    </div>
    }
</div>
```

### **Step 4: Adding Styling with Tailwind CSS**

You can style the input fields and buttons using Tailwind CSS utility classes for a clean and modern interface.

```css
.input-field {
  @apply w-full border border-gray-300 rounded px-4 py-2 mt-2;
}
```

### **Step 5: Running the Application**

To run the application, use the Angular CLI:

```bash
ng serve
```

Once the server starts, open your browser at `http://localhost:4200` to see your investment calculator in action.

### **Conclusion**

In this blog, we built a fully functional investment calculator using Angular and styled it with Tailwind CSS. With the combination of Angular’s robust framework and Tailwind’s modern styling, we achieved a responsive and user-friendly application. This tool can now help users project their future financial growth with a clean interface and accurate results.

I hope this blog inspires you to explore more Angular and Tailwind CSS projects.

Happy coding!

---

Feel free to customize the content as needed. Let me know if you have any questions or need further assistance. Good luck with your project! 🚀

### Exploring the Code

Visit the [GitHub repository](https://github.com/manthanank/investment-calculator) to explore the code in detail.

---
