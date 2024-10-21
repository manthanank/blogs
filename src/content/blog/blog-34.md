---
author: Manthan Ankolekar
pubDatetime: 2024-10-17T08:44:00Z
modDatetime: 
title: Creating Custom Directives in Angular - A Step-by-Step Guide
postSlug: creating-custom-directives-in-angular-a-step-by-step-guide
featured: false
draft: false
tags:
  - Angular
ogImage: ""
description: "Learn how to create custom directives in Angular. This blog provides a step-by-step guide to creating custom directives and using them in your Angular applications."
---

Angular provides a rich set of built-in directives, such as `NgIf`, `NgFor`, `NgSwitch`, `NgClass`, `NgStyle`, and `NgModel`, which allow developers to manipulate the DOM and enhance template rendering easily. But what if you want to create your own custom directives that replicate or extend the behavior of these built-in ones? In this blog, we’ll walk through how to create custom Angular directives to achieve similar functionalities and integrate them into an Angular app.

By the end of this tutorial, you will understand how to:

- Create custom structural and attribute directives.
- Replicate built-in Angular directives like `NgIf`, `NgFor`, `NgSwitch`, `NgClass`, `NgStyle`, and `NgModel`.
- Use custom directives in your Angular application.

### **What Are Directives in Angular?**

Directives are classes that add additional behavior to elements in Angular applications. There are three types of directives:

1. **Component Directives** – A component is a directive with a template.
2. **Structural Directives** – These directives change the DOM structure (e.g., `*ngIf`, `*ngFor`).
3. **Attribute Directives** – These modify the behavior or appearance of an element (e.g., `ngClass`, `ngStyle`).

In this guide, we’ll focus on creating custom structural and attribute directives.

### **Step 1: Setting Up the Angular Project**

To get started, create a new Angular project if you don’t have one already:

```bash
ng new custom-directives-app
cd custom-directives-app
```

### **Step 2: Creating Custom Directives**

We’ll create custom directives that mimic the behavior of popular built-in Angular directives.

#### **Custom `NgIf` Directive**

The `NgIf` directive conditionally adds or removes an element from the DOM. Here’s how you can create a custom `appCustomIf` directive to replicate this behavior.

**Directive Code:**

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCustomIf]',
  standalone: true,
})
export class CustomIfDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appCustomIf(condition: boolean) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
```

With this directive, you can now conditionally render elements in your template like this:

```html
<p *appCustomIf="isVisible">This is conditionally visible based on isVisible.</p>
<button (click)="toggleVisibility()">Toggle Visibility</button>
```

#### **Custom `NgFor` Directive**

The `NgFor` directive is used to loop through a collection and render templates for each item. Let’s build a custom `appCustomFor` directive.

**Directive Code:**

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCustomFor]',
  standalone: true,
})
export class CustomForDirective {
  @Input() set appCustomForOf(collection: any[]) {
    this.viewContainer.clear();
    collection.forEach((item, index) => {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: item,
        index: index,
      });
    });
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}
```

In your template, you can use it like so:

```html
<ul>
  <li *appCustomFor="let item of items; index as i">Index: {{ i }} - Item: {{ item }}</li>
</ul>
```

#### **Custom `NgSwitch` Directive**

The `NgSwitch` directive allows conditional rendering based on matching values. Let’s create `appCustomSwitch` and `appCustomSwitchCase` directives.

**Directive Code:**

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCustomSwitch]',
  standalone: true,
})
export class CustomSwitchDirective {
  private cases = new Map<string, TemplateRef<any>>();

  constructor(private viewContainer: ViewContainerRef) {}

  @Input() set appCustomSwitch(value: string) {
    this.viewContainer.clear();
    const template = this.cases.get(value);
    if (template) {
      this.viewContainer.createEmbeddedView(template);
    }
  }

  addCase(caseValue: string, templateRef: TemplateRef<any>) {
    this.cases.set(caseValue, templateRef);
  }
}

@Directive({
  selector: '[appCustomSwitchCase]',
  standalone: true,
})
export class CustomSwitchCaseDirective {
  @Input() set appCustomSwitchCase(value: string) {
    this.customSwitch.addCase(value, this.templateRef);
  }

  constructor(
    private customSwitch: CustomSwitchDirective,
    private templateRef: TemplateRef<any>
  ) {}
}
```

Usage:

```html
<div [appCustomSwitch]="currentView">
  <ng-template appCustomSwitchCase="view1">View 1 Content</ng-template>
  <ng-template appCustomSwitchCase="view2">View 2 Content</ng-template>
</div>
<button (click)="toggleView()">Toggle View</button>
```

#### **Custom `NgClass` Directive**

The `NgClass` directive dynamically adds or removes classes based on conditions. Here’s how to create the `appCustomClass` directive.

**Directive Code:**

```typescript
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCustomClass]',
  standalone: true,
})
export class CustomClassDirective {
  @Input() set appCustomClass(classObject: { [key: string]: boolean }) {
    for (const key in classObject) {
      if (classObject[key]) {
        this.renderer.addClass(this.el.nativeElement, key);
      } else {
        this.renderer.removeClass(this.el.nativeElement, key);
      }
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}
}
```

Usage:

```html
<div [appCustomClass]="{ 'active': isActive, 'hidden': !isActive }">
  This element has dynamic classes.
</div>
<button (click)="toggleClass()">Toggle Class</button>
```

#### **Custom `NgStyle` Directive**

The `NgStyle` directive dynamically applies inline styles to elements. Here’s how you can create a similar directive called `appCustomStyle`.

**Directive Code:**

```typescript
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCustomStyle]',
  standalone: true,
})
export class CustomStyleDirective {
  @Input() set appCustomStyle(styleObject: { [key: string]: string }) {
    for (const key in styleObject) {
      this.renderer.setStyle(this.el.nativeElement, key, styleObject[key]);
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}
}
```

Usage:

```html
<div [appCustomStyle]="{ 'color': textColor, 'font-size': fontSize }">
  This element has dynamic styles.
</div>
<button (click)="changeStyle()">Change Style</button>
```

#### **Custom `NgModel` Directive**

Finally, `NgModel` provides two-way data binding. Here’s how you can create a custom directive for two-way binding called `appCustomModel`.

**Directive Code:**

```typescript
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appCustomModel]',
  standalone: true,
})
export class CustomModelDirective {
  @Input() appCustomModel: any;
  @Output() appCustomModelChange = new EventEmitter<any>();

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  onInputChange(value: any) {
    this.appCustomModelChange.emit(value);
  }

  ngOnChanges() {
    this.el.nativeElement.value = this.appCustomModel;
  }
}
```

Usage:

```html
<input [appCustomModel]="userInput" (appCustomModelChange)="userInput = $event">
<p>User input: {{ userInput }}</p>
```

### **Step 3: Using Custom Directives in Your App**

Once you’ve created all these directives, you can use them in your Angular app by importing them into your module and integrating them into your template.

For example, in `app.component.ts`:

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomClassDirective } from './directives/custom-class.directive';
import { CustomForDirective } from './directives/custom-for.directive';
import { CustomIfDirective } from './directives/custom-if.directive';
import { CustomModelDirective } from './directives/custom-model.directive';
import { CustomStyleDirective } from './directives/custom-style.directive';
import {
  CustomSwitchCaseDirective,
  CustomSwitchDirective,
} from './directives/custom-switch.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CustomIfDirective,
    CustomForDirective,
    CustomSwitchDirective,
    CustomSwitchCaseDirective,
    CustomClassDirective,
    CustomStyleDirective,
    CustomModelDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isVisible = true;
  items = ['Item 1', 'Item 2', 'Item 3'];
  currentView = 'view1';
  isActive = true;
  textColor = 'blue';
  fontSize = '20px';
  userInput = 'Type something...';

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  toggleView() {
    this.currentView = this.currentView === 'view1' ? 'view2' : 'view1';
  }

  toggleClass() {
    this.isActive = !this.isActive;
  }

  changeStyle() {
    this.textColor = this.textColor === 'blue' ? 'red' : 'blue';
    this.fontSize = this.fontSize === '20px' ? '25px' : '20px';
  }
}
```

### **Conclusion**

By creating custom directives, you can extend the functionality of your Angular applications while maintaining reusable and modular code. This guide demonstrated how to replicate popular Angular built-in directives like `NgIf`, `NgFor`, `NgSwitch`, `NgClass`, `NgStyle`, and `NgModel` with custom implementations. Try incorporating these into your projects and further extend them to meet your app’s specific needs.

Happy coding!

---

Feel free to customize the content as needed. Let me know if you have any questions or need further assistance. Good luck with your project! 🚀

### Exploring the Code

Visit the [GitHub repository](https://github.com/manthanank/custom-directives-app) to explore the code in detail.

---
