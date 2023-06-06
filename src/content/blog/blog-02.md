---
author: Configuring build cache in Angular App
pubDatetime: 2023-04-22T05:35:45.757Z
title: Configuring build cache in Angular App
postSlug: configuring-build-cache-angular-app
featured: true
draft: false
tags:
  - angular
ogImage: ""
description: Build cache setup in angular app..
---

## Adding `cache` in `anular.json`

```tsx
{
    "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
    "version": 1,
    "newProjectRoot": "projects",
    "projects"
    {
        ...
    },
    "cli": {
        "cache": {
            "enabled": true, // select true or false
            "environment": "all", // select all, ci or local
            "path": "temp/cache/.angular" // folder name where it should add
        }
    }
}
```
