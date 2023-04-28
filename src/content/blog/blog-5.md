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
description:
  Cookies vs Local Storage vs Sesssion Storage.
---

## Cookies vs Local Storage vs Sesssion Storage

### Cookies

Cookies are data, stored in small text files, on your computer.

```jsx
// Create a Cookie with JavaScript
document.cookie = "username=Manthan Ankolekar";

// With expiry date (in UTC time)
document.cookie = "username=Manthan Ankolekar; expires=Thu, 28 Apr 2013 12:00:00 UTC";

// With a path parameter
document.cookie = "username=Manthan Ankolekar; expires=Thu, 28 Apr 2013 12:00:00 UTC; path=/";

// Read a Cookie with JavaScript
let data = document.cookie;

// Change a Cookie with JavaScript
document.cookie = "username=Manthan Ank; expires=Thu, 28 Apr 2013 12:00:00 UTC; path=/";

// Delete a Cookie with JavaScript
document.cookie = "username=; expires=Thu, 28 Apr 2013 12:00:00 UTC; path=/";
```

### Local Storage

Local storage object let you store key/value pairs in the browser.

**Syntax** -

```jsx
window.localStorage
// or
localStorage
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

**Syntax** -

```jsx
window.sessionStorage
// or
sessionStorage
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

| | Cookies | Local Storage| Session Storage |
|--|--|--|--|
| Stoage Capacity | 4kb | 10mb | 5mb |
| Browser Support | HTML4/HTML5 | HTML5 | HTML5 |
| Accessibility | Any Browser Window | Any Browser Window | Same Browser Tab |
| Expiry | Can set Manually | Never | On Browser Tab Closes |
| Stored In | Browser & Server | Browser Only | Browser Only |
| Sent with requests | Yes | No | No |
| Supported Data Types | Strings Only | Strings Only | Strings Only |
| Auto Expiry | Yes | No | Yes |
| Edit/block | Yes | Yes | Yes |
| SSL Support | Yes | No | No |
