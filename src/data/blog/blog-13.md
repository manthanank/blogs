---
author: Manthan Ankolekar
pubDatetime: 2023-06-23T10:44:00Z
title: CSS flex Cheatsheet.
postSlug: css-flex-cheastsheet
featured: false
draft: false
tags:
  - css
ogImage: ""
description: CSS flex Cheatsheet..
---

## Flex Container Properties

**display** - Defines a flex container.

```css
.container {
  display: flex;
}
```

**flex-direction** - Specifies the direction of the main axis.

```css
.container {
  flex-direction: row;
}

.container {
  flex-direction: row-reverse;
}
```

**flex-wrap** - Determines whether flex items should wrap or not.

```css
.container {
  flex-wrap: nowrap;
}

.container {
  flex-wrap: wrap;
}
```

**justify-content** - Aligns flex items along the main axis.

```css
.container {
  justify-content: flex-start;
}

.container {
  justify-content: space-between;
}
```

**align-items** - Aligns flex items along the cross axis.

```css
.container {
  align-items: flex-start;
}

.container {
  align-items: stretch;
}
```

**align-content** - Aligns multiple lines of flex items along the cross axis.

```css
.container {
  align-content: flex-start;
}

.container {
  align-content: space-around;
}
```

## Flex Item Properties

**order**: - Specifies the order of a flex item.

```css
.flex-item {
  order: 2;
}
```

**flex-grow**: - Determines how much a flex item can grow relative to other items.

```css
.flex-item {
  flex-grow: 2;
}
```

**flex-shrink**: - Specifies how much a flex item can shrink relative to other items.

```css
.flex-item {
  flex-shrink: 0.5;
}
```

**flex-basis**: - Defines the initial size of a flex item.

```css
.flex-item {
  flex-basis: 200px;
}
```

**flex**: - Shorthand property for flex-grow, flex-shrink, and flex-basis combined.

```css
.flex-item {
  flex: 1 0 auto;
}
```

**align-self**: - Overrides the align-items value for a specific flex item.

```css
.flex-item {
  align-self: center;
}
```

| Property                    | Description                                        |
| --------------------------- | -------------------------------------------------- |
| display: flex               | Makes an element a flex container.                 |
| flex-direction: row         | Sets the main axis direction.                      |
| flex-wrap: wrap             | Wraps flex items when they overflow the container. |
| justify-content: flex-start | Aligns flex items on the main axis.                |
| align-items: stretch        | Aligns flex items on the cross axis.               |
| order                       | Specifies the order of flex items.                 |
| flex-grow                   | Specifies how much a flex item can grow.           |
| flex-shrink                 | Specifies how much a flex item can shrink.         |
| flex-basis                  | Specifies the initial size of a flex item.         |

**Example**:

```css
// Makes the div a flex container
div {
  display: flex;
}

// Sets the main axis direction to row
div {
  flex-direction: row;
}

// Wraps flex items when they overflow the container
div {
  flex-wrap: wrap;
}

// Aligns flex items on the main axis to the start
div {
  justify-content: flex-start;
}

// Aligns flex items on the cross axis to stretch
div {
  align-items: stretch;
}

// Specifies the order of flex items
div {
  order: 2;
}

// Specifies how much a flex item can grow
div {
  flex-grow: 1;
}

// Specifies how much a flex item can shrink
div {
  flex-shrink: 1;
}

// Specifies the initial size of a flex item
div {
  flex-basis: 100px;
}
```
