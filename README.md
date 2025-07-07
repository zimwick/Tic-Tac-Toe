# Tic Tac Toe 🎮

This is a simple browser-based **Tic Tac Toe** game built with **HTML, CSS, and JavaScript**. It was created as part of [The Odin Project](https://www.theodinproject.com/) curriculum, focusing on using **JavaScript module patterns**, specifically **factory functions** and **Immediately Invoked Function Expressions (IIFE)**.

---

[Click here to view the live site](https://zimwick.github.io/Tic-Tac-Toe/)

## 🧠 Project Focus

- **Factory Functions** to create individual player objects.
- **IIFE Modules** to encapsulate game state and DOM logic.
- Practice modular JavaScript design with separation of concerns.
- DOM manipulation and user interaction.
- Simple game logic for win/tie conditions.

---

## 🕹 Features

- Two-player mode with customizable player names.
- Randomly selects which player starts first.
- Displays current turn and game outcome.
- Responsive game board using CSS Grid.
- Reset button to start a new game.

---

## 🧩 JavaScript Architecture

➤ gameBoard (IIFE)
Handles the internal game state:

Stores the board tiles.

Exposes methods to set tiles, get current state, and reset the board.

➤ createPlayer(name) (Factory Function)
Generates a player object with a name property.

➤ gameController (IIFE)
Core game logic:

Tracks whose turn it is and overall game status.

Sets up players.

Executes turns and checks for winners or ties.

➤ displayController (IIFE)
Handles all DOM interactions:

Starts the game after both players enter their names.

Updates the UI to reflect player turns and game results.

Handles user clicks and reset button logic.
