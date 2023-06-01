---
author: Manthan Ankolekar
pubDatetime: 2023-06-01T10:44:00Z
title: New Array methods in JavaScript.
postSlug: new-array-methods-in-javaScript
featured: true
draft: false
tags:
  - javascript
ogImage: ""
description: New Array methods in JavaScript..
---

**with()** method - It is used to assign an existing array to a new array

```jsx
var arr = [1, 6, 3, 4, 5];

var newArr = arr.with(1, 2);

console.log(newArr); // [1, 2, 3, 4, 5]
```

**toSorted()** method - It is used to sort the elements of an array.

```jsx
var arr = [1, 5, 3, 2, 4];

var sortedArr = arr.toSorted();

console.log(sortedArr); // [1, 2, 3, 4, 5]
```

**toReversed()** method - It is used to reverse the order of the elements of an array.

```jsx
var arr = [1, 5, 3, 2, 4];

var reversedArr = arr.toReversed();

console.log(reversedArr); // [5, 4, 3, 2, 1]
```

**toSpliced()** method - It is used to remove and/or add elements to an array.

```jsx
var arr = [1, 5, 3, 2, 4];

var newArr = arr.toSpliced(0, 2);

console.log(newArr); // [3, 2, 4]
```
