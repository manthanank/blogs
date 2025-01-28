---
author: Manthan Ankolekar
pubDatetime: 2025-01-28T08:44:00Z
modDatetime: 
title: Setting Up Tailwind CSS 4.0 in Angular v19.1 - A Step-by-Step Guide
postSlug: setting-up-tailwind-css-4-in-angular-v19-1-a-step-by-step-guide
featured: false
draft: false
tags:
  - Angular
  - Tailwind CSS
ogImage: ""
description: "Learn how to set up Tailwind CSS 4.0 in Angular v19.1 to create beautiful, responsive web applications."
---

In this blog, I’ll guide you through setting up Tailwind CSS 4.0 in an Angular v19.1 project, allowing you to leverage utility-first styling for rapid UI development.

## Prerequisites

Before we dive in, ensure you have Angular CLI installed. If you don’t, you can install it globally by running:

```bash
npm install -g @angular/cli
```

Now, let's begin the setup process!

## 1. Create Your Angular Project

If you don’t already have an Angular project, let’s create a new one. We’ll use Angular CLI, the most efficient way to create and manage Angular projects.

Run the following command to generate a new Angular project:

```bash
ng new my-project --style css
cd my-project
```

This command creates a new Angular project with CSS as the default style option. Once it’s set up, navigate into the project directory.

## 2. Configure PostCSS Plugins

Next, we need to configure PostCSS, which is essential for using Tailwind CSS. In the root of your Angular project, create a `.postcssrc.json` file and add the `@tailwindcss/postcss` plugin.

Here’s the content for the `.postcssrc.json` file:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

This configuration ensures that PostCSS processes your styles using the Tailwind CSS plugin.

## 3. Install Tailwind CSS and PostCSS

Now, let’s install the necessary dependencies. Tailwind CSS relies on both Tailwind itself and PostCSS for processing styles. Install these dependencies by running:

```bash
npm install tailwindcss @tailwindcss/postcss postcss --force
```

This installs Tailwind CSS, PostCSS, and Autoprefixer (to add vendor prefixes to your CSS for better browser compatibility).

## 4. Import Tailwind CSS

To get Tailwind into your project, you need to import it into your styles. Open the `src/styles.css` file and add the following import statement:

```css
@import "tailwindcss";
```

This will make all of Tailwind’s utility classes available globally in your project.

## 5. Start Your Build Process

With everything set up, it's time to build and serve your Angular project. Run the following command to start the development server:

```bash
ng serve
```

Your Angular project is now running with Tailwind CSS integrated. Open your browser and navigate to `http://localhost:4200` to see your application in action.

## 6. Start Using Tailwind in Your Project

You’re all set to use Tailwind’s utility-first classes to style your application. For example, let’s style a simple heading element with Tailwind’s utilities:

```html
<h1 class="text-3xl font-bold underline text-center mt-10">
  Angular v19.1 + Tailwind CSS 4.0
</h1>
```

This will render a large, bold, and underlined heading on your webpage.

## Conclusion

Integrating Tailwind CSS with Angular v19.1 is a straightforward process that allows you to enhance your UI development with a utility-first approach. With Tailwind’s classes at your disposal, you can easily create responsive, modern designs in no time.

Now you can start applying Tailwind's utility classes throughout your application to speed up your development process and achieve beautiful, consistent designs.

Happy coding!

---

### Exploring the Code

Visit the [GitHub repository](https://github.com/manthanank/angular-tailwindcss) to explore the code in detail.

---
