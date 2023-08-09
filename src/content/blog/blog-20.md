---
author: Manthan Ankolekar
pubDatetime: 2023-08-09T08:44:00Z
title: Convert simple javascript function to typescript
postSlug: convert-simple-javascript-function-to-typescript
featured: false
draft: false
tags:
  - javascript
  - typescript
ogImage: ""
description: Convert simple javascript function to typescript
---

Here's a simple JavaScript function that calculates the square of a number:

```javascript
function calculateSquare(number) {
  return number * number;
}

// Usage example
const inputNumber = 5;
const result = calculateSquare(inputNumber);
console.log(`The square of ${inputNumber} is ${result}`);
```

Here's the same function converted to TypeScript:

```typescript
function calculateSquare(number: number): number {
  return number * number;
}

// Usage example
const inputNumber: number = 5;
const result: number = calculateSquare(inputNumber);
console.log(`The square of ${inputNumber} is ${result}`);
```

In TypeScript, you can specify the types of function parameters and return values using the : notation. In this case, we've specified that the number parameter should be of type number, and the return value of the function is also of type number. The rest of the code remains very similar to the JavaScript version.
