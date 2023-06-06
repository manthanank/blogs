---
author: Manthan Ankolekar
pubDatetime: 2023-04-28T08:44:00Z
title: Cookies vs Local Storage vs Sesssion Storage
postSlug: cookies-vs-local-storage-vs-sesssion-storage
featured: true
draft: false
tags:
  - javascript
ogImage: ""
description: Cookies vs Local Storage vs Sesssion Storage.
---

## Cookies vs Local Storage vs Sesssion Storage

### Cookies

Cookies are data, stored in small text files, on your computer.

- Cookies are small text files that are stored on the user's device by a website.
- They are primarily used for maintaining user sessions and storing user-specific information.
- Cookies have an expiration date/time, after which they are automatically deleted.
- Cookies can be set by the server and can also be accessed and modified by both the server and the client.
- They have limitations in terms of storage capacity (typically limited to a few kilobytes) and can be sent to the server with every request, increasing network traffic.

```jsx
// Create a Cookie with JavaScript
document.cookie = "username=Manthan Ankolekar";

// With expiry date (in UTC time)
document.cookie =
  "username=Manthan Ankolekar; expires=Thu, 28 Apr 2013 12:00:00 UTC";

// With a path parameter
document.cookie =
  "username=Manthan Ankolekar; expires=Thu, 28 Apr 2013 12:00:00 UTC; path=/";

// Read a Cookie with JavaScript
let data = document.cookie;

// Change a Cookie with JavaScript
document.cookie =
  "username=Manthan Ank; expires=Thu, 28 Apr 2013 12:00:00 UTC; path=/";

// Delete a Cookie with JavaScript
document.cookie = "username=; expires=Thu, 28 Apr 2013 12:00:00 UTC; path=/";
```

### Local Storage

Local storage object let you store key/value pairs in the browser.

- localStorage is an API provided by web browsers that allows websites to store larger amounts of data (typically a few megabytes) on the user's device.
- The data stored in localStorage persists even after the browser is closed and reopened.
- localStorage is scoped to the domain of the website, meaning data stored by one website cannot be accessed by another website.
- The data in localStorage can only be accessed and modified by client-side scripts running on the same website that created the data.
- localStorage is commonly used for caching data, storing user preferences, or saving application state.

**Syntax** -

```jsx
window.localStorage;
// or
localStorage;
```

```jsx
// Save Data to Local Storage
localStorage.setItem(key, value);

// Read Data from Local Storage
let data = localStorage.getItem(key);

// Remove Data from Local Storage
localStorage.removeItem(key);

// Remove All (Clear Local Storage)
localStorage.clear();
```

### Session Storage

Session storage object allows you to save key/value pairs in the browser.

- sessionStorage is similar to localStorage but with a key difference: the data stored in sessionStorage is tied to a specific browser tab or window.
- If the user opens multiple tabs or windows of the same website, each tab/window will have its own separate sessionStorage.
- Like localStorage, sessionStorage data persists as long as the tab/window is open, but it is cleared when the tab/window is closed.
- sessionStorage has the same domain scoping and client-side access restrictions as localStorage.

**Syntax** -

```jsx
window.sessionStorage;
// or
sessionStorage;
```

```jsx
// Save Data to Session Storage
sessionStorage.setItem("key", "value");

// Read Data from Session Storage
let data = sessionStorage.getItem("key");

// Remove Data from Session Storage
sessionStorage.removeItem("key");

// Remove All (Clear Session Storage)
sessionStorage.clear();
```

### Difference between Cookies vs Local Storage vs Sesssion Storage

|                      | Cookies            | Local Storage      | Session Storage       |
| -------------------- | ------------------ | ------------------ | --------------------- |
| Stoage Capacity      | 4kb                | 10mb               | 5mb                   |
| Browser Support      | HTML4 / HTML5      | HTML5              | HTML5                 |
| Accessible In        | Any Browser Window | Any Browser Window | Same Browser Tab      |
| Expiry               | Can set Manually   | Never              | On Browser Tab Closes |
| Stored In            | Browser & Server   | Browser Only       | Browser Only          |
| Sent with requests   | Yes                | No                 | No                    |
| Supported Data Types | Strings Only       | Strings Only       | Strings Only          |
| Auto Expiry          | Yes                | No                 | Yes                   |
| Edit/block           | Yes                | Yes                | Yes                   |
| SSL Support          | Yes                | No                 | No                    |
