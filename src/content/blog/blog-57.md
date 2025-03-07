---
author: Manthan Ankolekar
pubDatetime: 2025-03-06T08:44:00Z
modDatetime: 
title: Enhancing Angular Applications with afterRenderEffect and Signals
postSlug: exploring-angular-linkedsignal
featured: false
draft: false
tags:
  - Angular
ogImage: ""
description: "Discover how to use afterRenderEffect and Signals in Angular for efficient state management. Learn to create reactive components that respond to changes in real-time, enhancing your app's performance and user experience."
---

### **Introduction**

With the introduction of **Angular Signals**, state management has become more efficient and intuitive. One powerful feature that complements Signals is **`afterRenderEffect`**, which allows us to execute code after the DOM has been updated.  

In this blog, we'll explore **`afterRenderEffect`**, its use cases, and how it integrates with **Angular Signals**. We'll also walk through an example where we dynamically update a message based on user input while ensuring that DOM updates are efficiently handled.  

---

## **🔹 What is afterRenderEffect?**  

`afterRenderEffect` is a lifecycle hook that runs **after** the component has rendered and the DOM has been updated.  

### **🔹 Why use `afterRenderEffect`?**  

✅ Ensures **side effects** (e.g., logging, API calls, animations) happen after DOM updates  
✅ Works seamlessly with **Angular Signals**  
✅ Eliminates the need for manual change detection  
✅ Helps in debugging state changes  

---

## **🔹 Implementing afterRenderEffect in an Angular Component**  

Let's create a simple **Message Updater** application where:  
✔ Users can enter a message in an input field  
✔ The message updates dynamically upon clicking a button  
✔ We use `afterRenderEffect` to log changes **after the DOM is updated**  

---

### **1️⃣ Component Implementation**  

```typescript
import { afterRenderEffect, Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // Signal to hold the message
  message = signal('Initial Message');

  // Signal to store the input field value
  inputValue = signal('');

  constructor() {
    // Logs when the message updates in the DOM
    afterRenderEffect(() => {
      console.log('Message updated in DOM:', this.message());
    });

    // Logs when the input value changes
    afterRenderEffect(() => {
      console.log('Input value updated:', this.inputValue());
    });
  }

  // Check if input is valid (non-empty)
  isValidInput(): boolean {
    return this.inputValue().trim() !== '';
  }

  // Update message when button is clicked
  updateMessage() {
    this.message.set(this.inputValue());
  }

  // Update inputValue as user types
  updateInputValue(event: any) {
    this.inputValue.set(event.target.value);
  }
}
```  

---

### **2️⃣ Creating the HTML Template**  

```html
<div class="container">
  <p class="message">{{ message() }}</p>
  <div class="input-row">
    <input type="text" [value]="inputValue()" (input)="updateInputValue($event)" placeholder="Enter text"
      class="input-field">
    <button class="update-button" (click)="updateMessage()" [disabled]="!isValidInput()">Update</button>
  </div>
  <p class="input-value">Input Value: {{ inputValue() }}</p>
</div>
```  

---

### **3️⃣ Styling the UI with CSS**  

```css
.container {
  font-family: sans-serif;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 400px;
  margin: 20px auto;
}
.message {
  color: #333;
  font-size: 1.5em;
  margin-bottom: 15px;
}
.input-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.input-field {
  border: 1px solid #ccc;
  padding: 10px;
  width: 70%;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 1em;
}
.update-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}
.update-button:hover {
  background-color: #0056b3;
}
.update-button:disabled {
  background-color: #ddd;
  color: #999;
  cursor: not-allowed;
}
.input-value {
  font-weight: 600;
  color: #555;
  margin-top: 10px;
}
```  

---

## **🔹 How Does afterRenderEffect Work in This Example?**  

1️⃣ **Logging Message Updates:**

- When a user clicks **Update**, `message` updates, and **afterRenderEffect** logs the new message **after** the DOM reflects the change.  

2️⃣ **Tracking Input Changes:**

- As users type, `inputValue` updates, and **afterRenderEffect** logs the new input.  

3️⃣ **Ensuring Side Effects Run at the Right Time:**

- `console.log('Message updated in DOM:', this.message());` only runs **after the UI is updated**, ensuring we never log stale data.  

---

## **🔹 Why Use afterRenderEffect Instead of ngAfterViewChecked?**  

| Feature             | `afterRenderEffect` | `ngAfterViewChecked` |
|--------------------|-------------------|----------------------|
| **When it runs**  | After DOM updates  | After every change detection cycle |
| **Performance**   | Optimized          | Can be inefficient if overused |
| **Works with Signals** | ✅ Yes          | ❌ No |
| **Ideal for**     | UI-related side effects | General change detection |

Since **`afterRenderEffect` is optimized for Signals**, it avoids performance issues caused by `ngAfterViewChecked`.  

---

## **🔹 Running the Project**  

To try out **afterRenderEffect** in your project:  

1️⃣ **Clone the Repository:**

```bash
git clone https://github.com/yourusername/angular-examples.git
cd angular-examples
```  

2️⃣ **Checkout to afterrendereffect Branch:**

```bash
git checkout afterrendereffect
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

## **🔹 Conclusion**  

The **afterRenderEffect API** is a powerful tool for managing **side effects** in Angular applications. By ensuring that code runs **only after DOM updates**, it improves performance and prevents unnecessary re-executions.  

### Exploring the Code

Visit the [GitHub repository](https://github.com/manthanank/angular-examples/tree/afterrendereffect) to explore the code in detail.

### Live Demo  

Check out the working example on [StackBlitz](https://stackblitz.com/edit/stackblitz-starters-1bbjkjpl)  

---

## Additional Resources  

- [Angular afterRenderEffect Documentation](https://angular.dev/api/core/afterRenderEffect)
- [Angular Signals Guide](https://angular.dev/guide/signals)

Feel free to leave comments or questions below! 👋
