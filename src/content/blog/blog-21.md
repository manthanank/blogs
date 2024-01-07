---
author: Manthan Ankolekar
pubDatetime: 2023-06-19T08:44:00Z
title: Difference between Promises and Observables.
postSlug: difference-between-promises-and-observables
featured: false
draft: false
tags:
  - javascript
  - angular
ogImage: ""
description: Difference between Promises and Observables.
---

**Promises** and **observables** are both mechanisms for handling asynchronous operations in JavaScript, but they have some differences in terms of functionality and behavior.

A **Promise** is an object that represents the eventual completion or failure of an asynchronous operation and its resulting value. It is used to handle a single asynchronous event. When a promise is created, it is in one of three states: pending, fulfilled, or rejected. A pending promise is in an initial state, and it transitions to either fulfilled (resolved) or rejected (with an error) when the asynchronous operation completes. Promises are typically used with the .then() and .catch() methods to handle the fulfillment or rejection of the promise.

- Promises are a single value that is either resolved or rejected.
- Promises are eager, meaning they are executed immediately when they are created.
- Promises can only handle one value.
- Promises are not multicast, meaning they can only be subscribed to once.

Example:

```jsx
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Operation completed successfully");
  }, 1000);
});

promise
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });
```

An **Observable**, on the other hand, is a more powerful and flexible construct introduced in the RxJS library, which extends the concept of promises. Observables represent a stream of values over time, allowing multiple asynchronous events to be handled. They can emit zero or more values and also notify about errors or the completion of the stream. Observables are used with various operators and subscription mechanisms to handle these events.

- Observables are a stream of values that can be resolved, rejected, or emit values.
- Observables are lazy, meaning they are not executed until they are subscribed to.
- Observables can handle multiple values.
- Observables are multicast, meaning they can be subscribed to multiple times.

Example:

```jsx
import { Observable } from "rxjs";

const observable = new Observable(observer => {
  setTimeout(() => {
    observer.next("First value");
  }, 1000);

  setTimeout(() => {
    observer.next("Second value");
  }, 2000);

  setTimeout(() => {
    observer.next("Third value");
    observer.complete(); // Notify completion
  }, 3000);
});

const subscription = observable.subscribe(
  value => console.log(value),
  error => console.error(error),
  () => console.log("Observable completed")
);

// Later, if necessary, you can unsubscribe
subscription.unsubscribe();
```

Differences between **promises** and **observables**:

| Feature                | Promises                         | Observables                      |
| ---------------------- | -------------------------------- | -------------------------------- |
| Value Single           | value                            | Stream of values                 |
| Execution              | Eager                            | Lazy                             |
| Cancellation           | Can be canceled                  | Can be canceled                  |
| Multiple subscriptions | No                               | Yes                              |
| Error handling         | Propagates errors to subscribers | Propagates errors to subscribers |

**Promises**:

- Making an API request
- Waiting for a file to download
- Opening a dialog box

**Observables**:

- Streaming data from a server
- Handling user input events
- Listening for network events
