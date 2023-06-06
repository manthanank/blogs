---
author: Manthan Ankolekar
pubDatetime: 2023-04-23T05:52:02.680Z
title: Command to generate new new app in current app
postSlug: command-generate-app-current-app
featured: true
draft: false
tags:
  - angular
ogImage: ""
description: Multiple projects in one angular app.
---

## Command to generate new new app in current app

```jsx
ng generate application app-name
```

To create multiple apps in one with clean structure

1.First new app with below command line

```jsx
ng new app-name --create-application=false
```

2.Next create one more app in above app with this command

```jsx
ng generate application app-name
```
