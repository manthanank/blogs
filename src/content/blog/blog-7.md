---
author: Manthan Ankolekar
pubDatetime: 2023-05-18T08:44:00Z
title: Router Debugging in Angular
postSlug: router-debugging-in-angular
featured: true
draft: false
tags:
  - angular
ogImage: ""
description:
  Router Debugging in angular application.
---

## Steps of Router Debugging in angular application

1. Enable router tracing: In `app.module.ts`

    ```typescript
    import { RouterModule, Routes } from '@angular/router';

    const routes: Routes = [
    // Define your routes here
    ];

    @NgModule({
    imports: [
        RouterModule.forRoot(routes, { enableTracing: true })
    ],
    // ...
    })
    export class AppModule { }
    ```

    if working with standalone application

    ```typescript
    const appRoutes: Routes = [];
    bootstrapApplication(AppComponent,
    {
        providers: [
        provideRouter(appRoutes, withDebugTracing())
        ]
    }
    );
    ```

2. Use console.log() to inspect

    ```typescript
    import { Component } from '@angular/core';
    import { Router } from '@angular/router';

    @Component({
    // ...
    })
    export class MyComponent {
    constructor(private router: Router) {}

    navigateToRoute() {
        console.log('Before navigation');
        this.router.navigate(['/my-route']);
        console.log('After navigation');
    }
    }
    ```

    else use below code

    ```typescript
    isLoading$ = new BehaviorSubject<boolean>(false);

    constructor(private router: Router) {
    this.router.events
        .subscribe((event) => {
        if (event instanceof NavigationStart) {
            this.isLoading$.next(true);    
        }
        else if (event instanceof NavigationEnd) {
            this.isLoading$.next(false); 
        }
        });
    }
    ```
