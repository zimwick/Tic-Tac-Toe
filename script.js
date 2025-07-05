"use strict";

const gameBoard = (function () {
  const setTile = (tile, symbol) => (tiles[tile] = symbol);
  const getTiles = () => tiles;
  const clearBoard = function () {
    tiles.fill("");
  };

  //array position 0 bottom left position 8 top right
  const tiles = ["X", "O", "X", "O", "X", "X", "O", "X", "O"];

  return {
    setTile,
    getTiles,
    clearBoard,
  };
})();

function createPlayer(name) {
  return { name };
}

const gameFlow = (function () {
  let turns = 0;
  let gameRunning = true;
  let playerXTurn;
  const goesFirst = Math.floor(Math.random() * 2);
  const playerX = createPlayer("Jay");
  const playerO = createPlayer("Tayvia");

  if (goesFirst === 0) {
    console.log("player X goes first");
    playerXTurn = true;
  } else {
    console.log("player O goes first");
    playerXTurn = false;
  }

  while (gameRunning) {
    turns += 1;
    if (playerXTurn === true) {
      //take input here
      checkWinner();
    } else if (playerXTurn === false) {
      //take input here
      checkWinner();
    }
    //changing player turn
    playerXTurn = !playerXTurn;
  }

  function checkWinner() {
    const tile = gameBoard.getTiles();

    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    wins.forEach((win) => {
      if (
        tile[win[0]] === tile[win[1]] &&
        tile[win[1]] === tile[win[2]] &&
        tile[win[0]] !== "" &&
        tile[win[1]] !== "" &&
        tile[win[2]] !== ""
      ) {
        if (tile[win[0]] === "X") {
          console.log("Player X Wins!");
        } else if (tile[win[0]] === "O") {
          console.log("Player O Wins!");
        }
        gameRunning = false;
      }
    });
    if (turns === 9) {
      console.log("its a tie!");
      gameRunning = false;
    }
  }
})();

// each player is X or O
// have a function that randomly decides which player goes first
// first player chooses 0-8 of an array that array slot goes from "" to either "X" or "O" depending on player
// function needs to be in place that checks every turn if there is a win or a tie
// possible wins: horizontal: 012,345,678, vertical: 036,147,258 diagnol: 048 246 - if no win its a tie
