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
  let playerXTurn = null;
  let playerX;
  let playerO;

  function getPlayerXTurn() {
    return playerXTurn;
  }

  function playerSetup(playerXname, playerOname) {
    playerX = createPlayer(playerXname);
    playerO = createPlayer(playerOname);
    //randomly see who goes first
    const goesFirst = Math.floor(Math.random() * 2);
    if (goesFirst === 0) {
      console.log(playerX.name, "goes first");
      playerXTurn = true;
    } else {
      console.log(playerO.name, "goes first");
      playerXTurn = false;
    }
  }

  function executeTurn(tileId) {
    if (gameRunning) {
      gameBoard.setTile(tileId, playerXTurn ? "X" : "O");
      checkIfWinner();
      if (gameRunning) {
        playerXTurn = !playerXTurn;
        turns += 1;
      }
    }
    //return updated tile
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
          console.log(playerX.name, "Wins!");
        } else {
          console.log(playerO.name, "Wins!");
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
  return { executeTurn, executeTurn, playerSetup, getPlayerXTurn };
})();

const displayController = (function () {
  const tiles = document.querySelectorAll(".tile-button");
  const startBtn = document.getElementById("form-submit");
  const playerXname = document.getElementById("playerX");
  const playerOname = document.getElementById("playerO");

  startBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (!playerXname.value || !playerOname.value) {
      alert("Please enter 2 player names");
    } else {
      gameController.playerSetup(playerXname.value, playerOname.value);
    }
  });

  tiles.forEach((tile) =>
    tile.addEventListener("click", function () {
      if (
        !playerXname.value ||
        !playerOname.value ||
        gameController.getPlayerXTurn() === null
      ) {
        alert("Please enter 2 player names");
      } else {
        //prevent multiple clicks on same tile
        if (tile.textContent === "") {
          tile.textContent = gameController.executeTurn(tile.id);
        }
      }
    })
  );
})();
