---
author: Manthan Ankolekar
pubDatetime: 2023-01-04T08:44:00Z
title: Angular with angular material
postSlug: angular-with-angular-material
featured: false
draft: false
tags:
  - angular
ogImage: ""
description: Angular with angular material.
---

**Install Angular Material** -

```python
ng add @angular/material
```

The `ng add`command will install Angular Material, the [Component Dev Kit (CDK)](https://material.angular.io/cdk/categories), [Angular Animations](https://angular.io/guide/animations) and ask you the following questions to determine which features to include:

1. Choose theme custom or pre-built-in material themes.
2. Set up global Angular Material Typography Styles.
3. Set up browser animation for Angular material.

On Installation in angular project files

- Added project dependencies to `package.json`
- Added the Roboto font to your `index.html`
- Added the Material Design icon font to your `index.html`
- Added a few global CSS styles to:
  1. Remove margins from `body`
  2. Set `height: 100%` on `html` and `body`
  3. Set Roboto as the default application font

Finally need to import module in `app.modult.ts` to display the component.

Example :

```tsx
//app.module.ts
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@NgModule({
  imports: [MatSlideToggleModule],
})
class AppModule {}
```

And in `app.component.html` file and run the project

```tsx
<mat-slide-toggle>Toggle me!</mat-slide-toggle>
```
