---
author: Manthan Ankolekar
pubDatetime: 2023-07-20T08:44:00Z
title: Ways to unsubscribe in Angular to avoid memory leaks
postSlug: ways-to-unsubscribe-in-angular-to-avoid-memory-leaks
featured: false
draft: false
tags:
  - angular
ogImage: ""
description: Ways to unsubscribe in Angular to avoid memory leaks
---

Here are 5 ways to unsubscribe in Angular to avoid memory leaks:

1. Using the Subscription variable. This is the most common way to unsubscribe from an observable in Angular. When you subscribe to an observable, you get a Subscription object back. You can use this object to unsubscribe from the observable at any time by calling its unsubscribe() method.

   ```jsx
   const subscription = observable$.subscribe(value => {
     // Do something with the value.
   });

   // Unsubscribe from the observable.
   subscription.unsubscribe();
   ```

2. Using the takeUntil() operator. The takeUntil() operator allows you to unsubscribe from an observable when a certain condition is met. For example, you could use the takeUntil() operator to unsubscribe from an observable when a component is destroyed.

   ```jsx
   const subscription = observable$.pipe(takeUntil(componentWillDestroy$));

   // Unsubscribe from the observable when the component is destroyed.
   componentWillDestroy$.subscribe(() => subscription.unsubscribe());
   ```

3. Using the take() operator. The take() operator allows you to unsubscribe from an observable after a certain number of values have been emitted. For example, you could use the take() operator to unsubscribe from an observable after 10 values have been emitted.

   ```jsx
   const subscription = observable$.pipe(take(10));

   // Unsubscribe from the observable after 10 values have been emitted.
   subscription.unsubscribe();
   ```

4. Using the first() method. The first() method allows you to unsubscribe from an observable after the first value has been emitted. For example, you could use the first() method to unsubscribe from an observable after the first user has logged in.

   ```jsx
   const subscription = observable$.pipe(first());

   // Unsubscribe from the observable after the first value has been emitted.
   subscription.unsubscribe();
   ```

5. Using the firstValueFrom() method. The firstValueFrom() method allows you to unsubscribe from an observable after the first value has been emitted, but it also allows you to listen for additional values. For example, you could use the firstValueFrom() method to unsubscribe from an observable after the first user has logged in, but you could also listen for additional values, such as the user's name and email address.

   ```jsx
   const subscription = observable$.pipe(firstValueFrom());

   // Unsubscribe from the observable after the first value has been emitted.
   subscription.unsubscribe();
   ```

It is important to unsubscribe from observables in Angular to avoid memory leaks. If you do not unsubscribe from an observable, it will continue to run in the background, even if the component that subscribed to it is no longer visible. This can lead to memory leaks and performance problems.
