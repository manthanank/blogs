---
author: Manthan Ankolekar
pubDatetime: 2023-06-25T08:44:00Z
title: Difference between px vs em vs rem in CSS
postSlug: difference-between-px-vs-em-vs-rem-in-css
featured: true
draft: false
tags:
  - css
ogImage: ""
description: Difference between px vs em vs rem in CSS
---

**px**, **em**, and **rem** are units of measurement used in web development to define the size of elements such as text, margins, padding, and other layout properties. Here's the difference between them:

Pixels (px):

- The pixel is an absolute unit of measurement and is the most commonly used unit.
- 1 pixel represents a single dot on a screen.
- The size remains constant regardless of the element's context or the size of the parent element.
- Pixels are not scalable, meaning that if the user zooms in or out, the size will not adjust proportionally.

Example: Suppose you set a heading's font size to 24px. It will always appear as 24 pixels tall, regardless of the screen size or the container it is placed in.

Relative units:

Relative units are used to create more flexible and scalable designs that adapt to different screen sizes and contexts. They adjust based on the surrounding elements.

a. EM (em):

- The em unit is relative to the font size of the parent element.
- 1em is equal to the current font size of the element.
- If you set the font size of the parent element to 16px, and then set a child element's font size to 2em, it will be calculated as 2 times the parent's font size (2 \* 16px = 32px).

Example: Let's say you have a paragraph with a font size of 16px, and inside that paragraph, you have a span with a font size of 1.5em. If the parent paragraph's font size is 16px, the span's font size will be 1.5 times the parent's font size, resulting in 24px (16px \* 1.5 = 24px).

b. REM (rem):

- The rem unit is relative to the root (html) element's font size, providing a consistent baseline across the entire document.
- It is similar to em, but instead of being relative to the parent element, it's relative to the root element.
- The root element's font size is typically set to a default value (e.g., 16px).
- If you set the root element's font size to 16px and then set an element's font size to 2rem, it will be calculated as 2 times the root's font size (2 \* 16px = 32px).

Example: If the root (html) element's font size is set to 16px, and you have a heading with a font size of 2rem, it will be calculated as 2 times the root's font size, resulting in 32px (16px \* 2 = 32px).

```html
<div class="container">
  <h1>Heading</h1>
  <p>Paragraph with <span>some text</span>.</p>
</div>
```

```css
.container {
  font-size: 16px;
}

h1 {
  font-size: 24px; /* Using pixels (px) */
  margin-bottom: 1em; /* Using em */
}

p {
  font-size: 1.5rem; /* Using rem */
}

span {
  font-size: 1.2em; /* Using em */
}
```

[CodePen Link](https://codepen.io/manthanank/pen/BaGNQZe)
