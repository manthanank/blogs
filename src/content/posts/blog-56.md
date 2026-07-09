---
author: Manthan Ankolekar
pubDatetime: 2025-03-06T08:44:00Z
modDatetime: 
title: Exploring Angular's linkedSignal for Reactive State Management
postSlug: exploring-angular-linkedsignal
featured: false
draft: false
tags:
  - Angular
ogImage: ""
description: "Discover Angular's linkedSignal for efficient state management. Learn how to create reactive signals that depend on other signals, enhancing your app's performance and maintainability."
---

### **Introduction**  

With the latest advancements in **Angular 19**, **Signals** have become a powerful alternative to traditional state management approaches. Among these, **linkedSignal** provides a seamless way to derive state from other signals dynamically.  

In this blog, we will explore **linkedSignal** and **computed properties** using an example from my **AngularExamples** project. We’ll create a simple **dynamic item list**, where users can **add, select, reset, and remove items**, all while leveraging **Angular Signals for reactivity**.  

---

## **🔹 What is linkedSignal?**  

`linkedSignal` is a **reactive derived signal** that updates automatically based on changes to its source signal. It’s useful when you need to derive state from an existing signal without manually updating it.  

✅ **Automatically tracks changes** in the source signal  
✅ **Ensures reactive updates** when the source signal changes  
✅ **Simplifies state management** with fewer manual updates  

---

## **🔹 Implementing linkedSignal in an Angular App**  

Let's build a simple **Item List Manager** using **linkedSignal** and **computed properties**.  

### **1️⃣ Define the Component with Signals**  

```typescript
import { JsonPipe } from '@angular/common';
import { Component, computed, linkedSignal, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-examples';

  // Signal to store the list of items
  items = signal<string[]>(['Item 1', 'Item 2', 'Item 3']);

  // linkedSignal: Automatically selects the first item from the list
  selectedItem = linkedSignal({
    source: this.items,
    computation: (items) => items[0] || null,
  });

  // Computed property to count the number of items
  itemCount = computed(() => this.items().length);

  // Add a new item to the list
  addItem() {
    this.items.update((currentItems) => [
      ...currentItems,
      `Item ${currentItems.length + 1}`,
    ]);
  }

  // Select a specific item
  selectItem(item: string) {
    if (this.items().includes(item)) {
      this.selectedItem.set(item);
    }
  }

  // Reset items to a default list
  resetItems() {
    this.items.set(['Apple', 'Banana', 'Cherry']);
  }

  // Remove the selected item
  removeItem() {
    const selected = this.selectedItem();
    if (selected) {
      this.items.update((currentItems) =>
        currentItems.filter((item) => item !== selected)
      );
      this.selectedItem.set(this.items()[0] || null); // Reset selection
    }
  }
}
```  

---

## **🔹 Creating the UI for the Item List**  

We will now build a simple UI to **display the item list** and **allow user interactions**.  

```html
<div class="container">
  <h2>Item List Example</h2>
  <p>Items: {{ items() | json }}</p>
  <p>Selected Item: {{ selectedItem() }}</p>
  <p>Item Count: {{ itemCount() }}</p>

  <div class="button-group">
    <button (click)="addItem()">Add Item</button>
    <button (click)="selectItem('Item 2')">Select Item 2</button>
    <button (click)="resetItems()">Reset Items</button>
    <button (click)="removeItem()">Remove Selected Item</button>
  </div>

  <div class="item-list">
    <h3>Current Items:</h3>
    <ul>
      @for (item of items(); track $index) {
      <li>
        {{ item }}
        <button class="select-button" (click)="selectItem(item)">Select</button>
      </li>
      }
    </ul>
  </div>
</div>
```  

---

## **🔹 Styling the UI**  

To make the UI visually appealing, we add some simple CSS styles.  

```css
.container {
  font-family: sans-serif;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.button-group {
  margin-bottom: 20px;
}

button {
  padding: 8px 16px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  background-color: #f0f0f0;
}

button:hover {
  background-color: #e0e0e0;
}

.item-list {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  margin-top: 20px;
}

.item-list ul {
  list-style: none;
  padding: 0;
}

.item-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.item-list li:last-child {
  border-bottom: none;
}

.select-button {
  padding: 4px 8px;
  font-size: 0.8em;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.select-button:hover {
  background-color: #45a049;
}
```  

---

## **🔹 Why Use linkedSignal and computed?**  

✅ **Automatic Updates:** When `items` change, `selectedItem` updates automatically.  
✅ **No Manual State Management:** No need for extra event listeners or manual subscriptions.  
✅ **Reactive Performance Boost:** Computed properties optimize updates efficiently.  

---

## **🔹 Running the Project**  

To test this in your **AngularExamples** project:  

1️⃣ **Clone the Repository:**

```bash
git clone https://github.com/yourusername/angular-examples.git
cd angular-examples
```  

2️⃣ **Checkout to rxresource Branch:**

```bash
git checkout rxresource
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

The **linkedSignal API** provides a clean and efficient way to manage **derived state** in Angular applications. Combined with **computed properties**, it offers a **powerful reactive state management** solution.  

### Exploring the Code

Visit the [GitHub repository](https://github.com/manthanank/angular-examples/tree/linkedsignal) to explore the code in detail.

### Live Demo  

Check out the working example on [StackBlitz](https://stackblitz.com/edit/stackblitz-starters-s9d6dbpg)  

---

## Additional Resources  

- [Angular LinkedSignal Documentation](https://angular.dev/guide/signals/linked-signal)
- [Angular Signals Guide](https://angular.dev/guide/signals)

Feel free to leave comments or questions below! 👋
