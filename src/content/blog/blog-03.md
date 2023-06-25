---
author: Manthan Ankolekar
pubDatetime: 2023-04-23T05:52:02.680Z
title: Add package manager to Angular app
postSlug: add-package-manager-angular-app
featured: false
draft: false
tags:
  - angular
ogImage: ""
description: Package manager in angular app.
---

## Adding `packageManager` in `angular.json`

```tsx
{``
    "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
    "version": 1,
    "newProjectRoot": "projects",
    "projects" {
        ...
    },
    "cli": {
        "packageManager": "npm" // either select yarn, npm, pnpm or cnpm
    }
}
```
