"use strict";

const gameBoard = (function () {
  const setTile = (tile, symbol) => (tiles[tile] = symbol);
  const getTiles = () => tiles;
  const clearBoard = function () {
    tiles.fill("");
  };

  //array position 0 bottom left position 8 top right
  const tiles = ["", "", "", "", "", "", "", "", ""];

  return {
    setTile,
    getTiles,
    clearBoard,
  };
})();

function createPlayer(name) {
  return { name };
}

const gameController = (function () {
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

  function playerTurn(tileId) {
    if (gameRunning) {
      gameBoard.setTile(tileId, playerXTurn ? "X" : "O");
      checkIfWinner();
      if (gameRunning) {
        playerXTurn = !playerXTurn;
        turns += 1;
      }
    }
    //get updated tile
    return gameBoard.getTiles()[tileId];
  }

  function checkIfWinner() {
    const tile = gameBoard.getTiles();

    //all possible wins
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
        if (playerXTurn) {
          console.log("Player X Wins!");
        } else {
          console.log("Player O Wins!");
        }
        gameRunning = false;
      }
    });
    //check for tie
    if (turns === 8 && gameRunning != false) {
      console.log("its a tie!");
      gameRunning = false;
    }
  }
  return { playerTurn, playerTurn };
})();

const displayController = (function () {
  const tiles = document.querySelectorAll(".tile-button");
  tiles.forEach((tile) =>
    tile.addEventListener("click", function () {
      //prevent multiple clicks on same tile
      if (tile.textContent === "") {
        tile.textContent = gameController.playerTurn(tile.id);
      }
    })
  );
})();
