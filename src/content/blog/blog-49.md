---
author: Manthan Ankolekar
pubDatetime: 2025-01-31T08:44:00Z
modDatetime: 2025-01-31T08:44:00Z
title: Angular View Encapsulation - A Practical Guide to Component Styling
postSlug: angular-view-encapsulation-a-practical-guide-to-component-styling
featured: false
draft: false
tags:
  - Angular
ogImage: ""
description: "Learn about the three types of view encapsulation in Angular: Emulated, Shadow DOM, and None. Understand how each type works and when to use them in your Angular applications."
---

When building Angular applications, managing styles and encapsulating component-specific designs is crucial for maintaining scalability and avoiding unintended CSS overrides. Angular provides a mechanism called **View Encapsulation** that controls how styles are applied to components, ensuring that they do not affect other parts of the application.  

In this blog, we will explore **View Encapsulation** in Angular, its different strategies, and how to use them effectively.  

## What is View Encapsulation?  

View Encapsulation in Angular determines how styles defined in a component affect the DOM. By default, Angular scopes component styles to that specific component, preventing them from leaking outside.  

Angular provides three types of view encapsulation:  

1. **Emulated (Default)** – Styles are scoped to the component using attribute selectors.  
2. **Shadow DOM (Native)** – Uses the browser's native Shadow DOM to encapsulate styles.  
3. **None** – Styles are applied globally and can affect other components.  

Let’s break these down with examples.  

---

## 1. **Emulated (Default View Encapsulation)**  

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-emulated',
  template: `<p class="text">This is an Emulated encapsulation.</p>`,
  styles: [
    `.text { color: blue; font-weight: bold; }`
  ],
  encapsulation: ViewEncapsulation.Emulated, // Default behavior
})
export class EmulatedComponent {}
```

### How it Works in Emulated Mode

- Angular **modifies the CSS selectors** by appending unique attributes to ensure styles apply only to this component.  
- The generated CSS will look like this in the DOM:  

```css
.text[_ngcontent-abc123] {
  color: blue;
  font-weight: bold;
}
```

- This ensures that `.text` styles are **only applied** within the `app-emulated` component.  

---

## 2. **ShadowDom (Native Encapsulation)**  

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-shadow-dom',
  template: `<p class="text">This is Shadow DOM encapsulation.</p>`,
  styles: [
    `.text { color: red; font-style: italic; }`
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ShadowDomComponent {}
```

### How it Works in Shadow DOM Mode

- Angular **uses the browser’s native Shadow DOM API**, completely isolating the styles.  
- The HTML structure will look like this:  

```html
<app-shadow-dom>
  #shadow-root
  <p class="text">This is Shadow DOM encapsulation.</p>
</app-shadow-root>
```

- The styles inside `#shadow-root` **do not affect** any other part of the application.  

### Pros and Cons

✅ Completely isolated styles.  
✅ Avoids global style conflicts.  
❌ Not supported in older browsers (e.g., IE11).  

---

## 3. **None (Global Styles)**  

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-none',
  template: `<p class="text">This is without encapsulation.</p>`,
  styles: [
    `.text { color: green; text-decoration: underline; }`
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NoneComponent {}
```

### How it Works in None Mode

- The styles are **not scoped** and are applied globally across the application.  
- The generated CSS will look like this:  

```css
.text {
  color: green;
  text-decoration: underline;
}
```

- This means **any component** with `.text` will inherit these styles, which might cause conflicts.  

### When to Use?

- When you want **global styles** to be applied across multiple components intentionally.  
- In **third-party component libraries**, where encapsulation is unnecessary.  

---

## **Choosing the Right Encapsulation Strategy**  

| Encapsulation Type  | Style Scoping | Affects Global Styles? | Use Case |
|---------------------|--------------|------------------------|----------|
| **Emulated (Default)** | Scoped to the component | ❌ No | General component styling |
| **ShadowDom** | Fully isolated (uses Shadow DOM) | ❌ No | When strict style encapsulation is needed |
| **None** | Applied globally | ✅ Yes | When global styling is required |

---

## **Overriding Encapsulated Styles**  

Even with View Encapsulation, you might need to override styles. You can do this using **::ng-deep**, but be cautious, as it's deprecated.  

```css
::ng-deep .text {
  color: purple !important;
}
```

Alternatively, use **global styles** in `styles.scss`:  

```css
app-emulated .text {
  color: purple !important;
}
```

---

## **Conclusion**  

View Encapsulation in Angular helps maintain a clean and modular styling approach. Here’s a quick recap:  

- **Emulated** is the default and best for most cases.  
- **ShadowDom** provides full encapsulation but has browser limitations.  
- **None** applies styles globally and should be used carefully.  

Understanding when to use each can help you write maintainable, conflict-free styles in your Angular applications.  

Now let's combine all these concepts and build a sample application to see them in action.

## **Angular Project: View Encapsulation Demo**  

In this project, we will create an Angular application demonstrating **all three View Encapsulation types**:

1. **Emulated (Default)**  
2. **Shadow DOM**  
3. **None (Global Styles)**  

We will structure the project properly, using standalone components, and showcase the different encapsulation strategies.

---

### **Project Setup**  

#### **1. Create a New Angular Project**

Run the following command in your terminal:  

```sh
ng new angular-examples
cd angular-examples
```

---

### **2. Project Structure**  

```text
angular-examples/
│── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── emulated/
│   │   │   │   ├── emulated.component.ts
│   │   │   ├── shadow-dom/
│   │   │   │   ├── shadow-dom.component.ts
│   │   │   ├── none/
│   │   │   │   ├── none.component.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   ├── styles.scss
│── angular.json
│── package.json
│── tsconfig.json
```

---

### **3. Implement Components**  

#### **(a) Emulated Encapsulation Component**

Create `emulated.component.ts` inside `src/app/components/emulated/`  

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-emulated',
  standalone: true,
  template: `<p class="text">This is an Emulated Encapsulation.</p>`,
  styles: [
    `.text { color: blue; font-weight: bold; }`
  ],
  encapsulation: ViewEncapsulation.Emulated, // Default behavior
})
export class EmulatedComponent {}
```

✅ **CSS is scoped only to this component using attribute selectors.**  

---

#### **(b) Shadow DOM Encapsulation Component**

Create `shadow-dom.component.ts` inside `src/app/components/shadow-dom/`  

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-shadow-dom',
  standalone: true,
  template: `<p class="text">This is Shadow DOM Encapsulation.</p>`,
  styles: [
    `.text { color: red; font-style: italic; }`
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ShadowDomComponent {}
```

✅ **Uses the browser's native Shadow DOM for complete style isolation.**  

---

#### **(c) None (Global Styling) Component**

Create `none.component.ts` inside `src/app/components/none/`  

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-none',
  standalone: true,
  template: `<p class="text">This is No Encapsulation.</p>`,
  styles: [
    `.text { color: green; text-decoration: underline; }`
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NoneComponent {}
```

✅ **Applies styles globally, affecting other components with the same class.**  

---

### **4. Configure `app.component.ts`**  

Modify `src/app/app.component.ts`  

```typescript
import { Component } from '@angular/core';
import { EmulatedComponent } from './components/emulated/emulated.component';
import { ShadowDomComponent } from './components/shadow-dom/shadow-dom.component';
import { NoneComponent } from './components/none/none.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Angular View Encapsulation Demo</h1>
    <app-emulated></app-emulated>
    <app-shadow-dom></app-shadow-dom>
    <app-none></app-none>
  `,
  styles: [`
    h1 { text-align: center; color: #333; }
    app-emulated, app-shadow-dom, app-none {
      display: block;
      padding: 10px;
      border: 1px solid #ddd;
      margin: 10px 0;
    }
  `],
  imports: [EmulatedComponent, ShadowDomComponent, NoneComponent],
})
export class AppComponent {}
```

---

### **5. Run the Project**

Start the Angular server:  

```sh
ng serve
```

---

### **6. Expected Output**  

When you open `http://localhost:4200/`, you should see:  

```text
Angular View Encapsulation Demo
---------------------------------
This is an Emulated Encapsulation.  (Blue, Bold)
This is Shadow DOM Encapsulation.   (Red, Italic)
This is No Encapsulation.            (Green, Underline)
```

#### **Verifying Styles in DevTools**  

- **Emulated:** Inspect the element; styles should have `_ngcontent-xyz` attributes.  
- **ShadowDom:** Open the component in DevTools; styles should be inside `#shadow-root`.  
- **None:** Styles should appear globally in the `styles` section.  

---

### **Conclusion of the Angular Project**

This project demonstrates Angular's **View Encapsulation** strategies in action.  

| Encapsulation Type  | Behavior | Use Case |
|---------------------|----------|----------|
| **Emulated (Default)** | Scoped styles using attributes | General component styling |
| **Shadow DOM** | Fully isolated styles | Strict encapsulation needed |
| **None** | Global styles applied everywhere | When styles should be shared |

Feel free to explore the [GitHub repository](https://github.com/manthanank/angular-examples/tree/view-encapulation) and [Stackblitz Link](https://stackblitz.com/edit/angular-view-encapsulation-examples) for more details and to try out the project yourself. Happy coding!
