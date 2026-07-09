---
author: Manthan Ankolekar
pubDatetime: 2024-09-24T08:44:00Z
title: Building Dynamic Forms with Angular and Formly
postSlug: building-dynamic-forms-with-angular-and-formly
featured: false
draft: false
tags:
  - Angular
  - Formly
ogImage: ""
description: "In this blog post, we'll explore how to build dynamic forms using Angular and the Formly library. We'll walk through the setup, configuration, and implementation of a simple form that can be easily extended and customized."
---

In this blog post, we'll explore how to build dynamic forms using Angular and the Formly library. We'll walk through the setup, configuration, and implementation of a simple form that can be easily extended and customized.

## Introduction

Dynamic forms are a powerful feature in web applications, allowing developers to create forms that can change based on user input or other conditions. Angular, combined with the Formly library, provides a robust solution for building such forms with minimal effort.

## Project Setup

First, let's set up our Angular project. We'll use the Angular CLI to generate a new project and install the necessary dependencies.

```bash
ng new angular-formly
cd angular-formly
npm install @angular/forms @ngx-formly/core @ngx-formly/bootstrap --save
```

## Project Structure

Here's a quick overview of the project structure:

```plaintext
src/
  app/
    app-routing.module.ts
    app.component.html
    app.component.scss
    app.component.spec.ts
    app.component.ts
    app.module.ts
  index.html
  main.ts
  styles.scss
```

## Configuring Formly

Next, we'll configure Formly in our Angular application. Open `src/app/app.module.ts` and add the necessary imports and configuration:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Creating the Form Component

Now, let's create our form component. Open `src/app/app.component.ts` and define the form structure:

```typescript
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Formly Example';
  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      props: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      },
    },
  ];

  onSubmit(model: any) {
    console.log(model);
  }
}
```

## Creating the Form Template

Next, we'll create the template for our form. Open `src/app/app.component.html` and add the following code:

```typescript
<h1>{{ title }}</h1>
<form [formGroup]="form" (ngSubmit)="onSubmit(model)">
  <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>
  <button type="submit" class="btn btn-default">Submit</button>
</form>
{{ model | json }}
```

## Running the Application

To run the application, use the following command:

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser to see the form in action.

## Conclusion

In this blog post, we've seen how to set up and configure an Angular application with Formly to create dynamic forms. This setup allows for easy customization and extension of forms, making it a powerful tool for building complex form-based applications. Happy coding!
