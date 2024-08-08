---
author: Manthan Ankolekar
pubDatetime: 2023-01-04T08:44:00Z
title: Angular with TailwindCSS
postSlug: angular-with-tailwindcss
featured: false
draft: false
tags:
  - angular
ogImage: ""
description: Angular with TailwindCSS
---

**First need to Install Tailwind CSS using CLI command :**

```bash
npm install -D tailwindcss postcss autoprefixer
```

Next Run init command to generate `tailwind.config.js`

```bash
npx tailwindcss init
```

**Configuring template paths :**

In `tailwind.config.js`

```bash
/** @type {import('tailwindcss').Config} */
module.exports = {

...

  content: [
    "./src/**/*.{html,ts}",
  ],

...

}
```

**Adding the Tailwind directives to your CSS :**

In style.css

```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```
