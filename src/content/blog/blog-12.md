---
author: Manthan Ankolekar
pubDatetime: 2023-06-22T10:44:00Z
title: CSS grid Cheatsheet.
postSlug: css-grid-cheastsheet
featured: false
draft: false
tags:
  - css
ogImage: ""
description: CSS grid Cheatsheet..
---

## Grid Container Properties

**display** - Defines a grid container.

Example:

```css
.container {
  display: grid;
}
```

**grid-template-columns** - Specifies the size of each column in the grid.

Example:

```css
.container {
  grid-template-columns: 100px 200px 150px;
}
```

**grid-template-rows** - Specifies the size of each row in the grid.

Example:

```css
.container {
  grid-template-rows: 50px 100px;
}
```

**grid-template-areas** - Defines named grid areas for the layout.

Example:

```css
.container {
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}
.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
.main {
  grid-area: main;
}
.footer {
  grid-area: footer;
}
```

**grid-template** - Shorthand property to set grid-template-rows and grid-template-columns in one declaration.

Example:

```css
.container {
  grid-template: 100px 200px / 1fr 2fr;
}
```

**grid-gap** - Sets the gap (space) between grid cells.

Example:

```css
.container {
  grid-gap: 10px 20px;
}
```

## Grid Item Properties

**grid-column-start** - Specifies the start position of a grid item along the horizontal axis.

Example:

```css
.item {
  grid-column-start: 2;
}
```

**grid-column-end** - Specifies the end position of a grid item along the horizontal axis.

Example:

```css
.item {
  grid-column-end: span 3;
}
```

**grid-row-start** - Specifies the start position of a grid item along the vertical axis.

Example:

```css
.item {
  grid-row-start: row2;
}
```

**grid-row-end** - Specifies the end position of a grid item along the vertical axis.

Example:

```css
.item {
  grid-row-end: span row3;
}
```

**grid-column** - Shorthand property for grid-column-start and grid-column-end.

Example:

```css
.item {
  grid-column: 2 / span 3;
}
```

**grid-row** - Shorthand property for grid-row-start and grid-row-end.

Example:

```css
.item {
  grid-row: row2 / span row3;
}
```

**grid-area** - Specifies a grid item's size and location within the grid.

Example:

```css
.item {
  grid-area: 2 / 1 / span 3 / span 2;
}
```

| Property               | Description                                                           |
| ---------------------- | --------------------------------------------------------------------- |
| display: grid          | Makes an element a grid container.                                    |
| grid-template-columns: | Defines the number and width of columns.                              |
| grid-template-rows:    | Defines the number and height of rows.                                |
| grid-template:         | Sets the number and size of columns and rows in a single declaration. |
| grid-template-areas:   | Defines the area of each grid item.                                   |
| grid-column:           | Specifies the column in which a grid item is placed.                  |
| grid-row:              | Specifies the row in which a grid item is placed.                     |
| grid-column-start:     | Specifies the start column for a grid item.                           |
| grid-column-end:       | Specifies the end column for a grid item.                             |
| grid-row-start:        | Specifies the start row for a grid item.                              |
| grid-row-end:          | Specifies the end row for a grid item.                                |
| grid-auto-columns:     | Specifies the default width of columns.                               |
| grid-auto-rows:        | Specifies the default height of rows.                                 |
| grid-auto-flow:        | Specifies the direction in which grid items are laid out.             |
| grid-gap:              | Specifies the gap between grid items.                                 |

**Example**:

```css
// Makes the div a grid container
div {
  display: grid;
}

// Defines the number and width of columns
div {
  grid-template-columns: 1fr 1fr;
}

// Defines the number and height of rows
div {
  grid-template-rows: 1fr 1fr;
}

// Defines the area of each grid item
div {
  grid-template-areas:
    "header header"
    "main main"
    "footer footer";
}

// Specifies the column in which a grid item is placed
div {
  grid-column: 1;
}

// Specifies the row in which a grid item is placed
div {
  grid-row: 1;
}

// Specifies the start column for a grid item
div {
  grid-column-start: 1;
}

// Specifies the end column for a grid item
div {
  grid-column-end: 2;
}

// Specifies the start row for a grid item
div {
  grid-row-start: 1;
}

// Specifies the end row for a grid item
div {
  grid-row-end: 2;
}

// Specifies the default width of columns
div {
  grid-auto-columns: 100px;
}

// Specifies the default height of rows
div {
  grid-auto-rows: 100px;
}

// Specifies the direction in which grid items are laid out
div {
  grid-auto-flow: row;
}

// Specifies the gap between grid items
div {
  grid-gap: 10px;
}
```
