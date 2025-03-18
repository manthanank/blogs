---
author: Manthan Ankolekar
pubDatetime: 2024-12-09T08:44:00Z
modDatetime: 
title: Building a Tic Tac Toe Game in Angular - A Beginner's Guide
postSlug: building-a-tic-tac-toe-game-in-angular-a-beginners-guide
featured: false
draft: false
tags:
  - Angular
ogImage: ""
description: "Learn how to build a Tic Tac Toe game in Angular v19 from scratch. This beginner-friendly guide will walk you through creating a simple yet engaging game using Angular's component-based architecture."
---

**Tic Tac Toe** is one of the simplest yet most entertaining games to build when you're learning to code. In this blog, I'll guide you through creating a **Tic Tac Toe game in Angular**, demonstrating the fundamentals of component-based architecture and reactive programming.

### Why Angular for Games?

Angular is a powerful framework for building interactive and dynamic web applications. Its component-based structure and robust state management make it an excellent choice for small games like Tic Tac Toe.

---

### Key Features of the Game

1. **Dynamic Game Board**: A 3x3 grid representing the game board.
2. **Turn-Based Play**: Players take turns as `X` and `O`.
3. **Winner Detection**: Checks for winning conditions or a draw.
4. **Reset Functionality**: Allows players to restart the game.

---

### Step-by-Step Implementation

#### 1. Set Up Your Angular App

Start by creating a new Angular project:

```bash
ng new tic-tac-toe
cd tic-tac-toe
```

#### 2. In `app.component.html` file, replace the content with the following code

```html
<div class="game">
  <h1>Tic Tac Toe</h1>
  <div class="board">
    @for (cell of board; track $index) {
    <div class="cell" (click)="makeMove($index)">
      {{ cell }}
    </div>
    }
  </div>
  @if (winner) {
  <p>{{ winner }} wins!</p>
  <button (click)="resetGame()">Play Again</button>
  }
</div>
```

#### 4. Style the Game Board

Add these styles in `game.component.css`:

```css
.game {
  text-align: center;
  font-family: Arial, sans-serif;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-gap: 5px;
  justify-content: center;
  margin: 20px auto;
}

.cell {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border: 1px solid #000;
  cursor: pointer;
}

.cell:hover {
  background-color: #f0f0f0;
}

button {
  font-size: 1rem;
  padding: 10px 20px;
  margin: 20px 0;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
}
```

---

#### 5. Implement the Game Logic in `app.component.ts`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  board: string[] = Array(9).fill('');
  currentPlayer: string = 'X';
  winner: string | null = null;

  makeMove(index: number) {
    if (!this.board[index] && !this.winner) {
      this.board[index] = this.currentPlayer;
      if (this.checkWinner()) {
        this.winner = this.currentPlayer;
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  checkWinner(): boolean {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCombinations.some((combination) => {
      const [a, b, c] = combination;
      return (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      );
    });
  }

  resetGame() {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.winner = null;
  }
}
```

---

### 6. Run the App

To see your game in action, start the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200` to play!

---

### Possible Enhancements

- **Scoreboard**: Keep track of wins for both players.
- **AI Opponent**: Implement a single-player mode with basic AI.
- **Mobile-Friendly Design**: Enhance the UI for smaller screens.

---

### Conclusion

With just a few lines of code, you’ve built a fully functional Tic Tac Toe game in Angular! This project demonstrates the power of Angular’s data binding, state management, and reusable components.

Now that you’ve mastered the basics, try enhancing the game further and share your creation with others!

Happy coding! 🚀

---

### Exploring the Code

Visit the [GitHub repository](https://github.com/manthanank/tic-tac-toe) to explore the code in detail.

---
