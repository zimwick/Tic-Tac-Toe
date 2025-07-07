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
  let playerX = "";
  let playerO = "";
  let winner = "";

  function getPlayerXTurn() {
    return playerXTurn;
  }

  function getWinner() {
    return winner;
  }

  function resetState() {
    turns = 0;
    gameRunning = true;
    playerXTurn = null;
    playerX = "";
    playerO = "";
    winner = "";
    gameBoard.clearBoard();
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
          winner = playerX.name;
        } else {
          console.log(playerO.name, "Wins!");
          winner = playerO.name;
        }
        gameRunning = false;
      }
    });
    //check for tie
    if (turns === 8 && gameRunning != false) {
      console.log("its a tie!");
      winner = "tie";
      gameRunning = false;
    }
  }
  return {
    executeTurn,
    executeTurn,
    playerSetup,
    getPlayerXTurn,
    getWinner,
    resetState,
  };
})();

const displayController = (function () {
  const tiles = document.querySelectorAll(".tile-button");
  const startBtn = document.getElementById("form-submit");
  const playerXname = document.getElementById("playerX");
  const playerOname = document.getElementById("playerO");
  const formContainer = document.querySelector(".start-form");
  const turnDisplay = document.querySelector(".turn-score");
  const resetBtn = document.getElementById("reset");

  startBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (!playerXname.value || !playerOname.value) {
      alert("Please enter 2 player names");
    } else {
      formContainer.classList.add("hidden");
      turnDisplay.classList.remove("hidden");
      gameController.playerSetup(playerXname.value, playerOname.value);
      turnDisplay.textContent = gameController.getPlayerXTurn()
        ? `${playerXname.value}'s turn`
        : `${playerOname.value}'s turn`;
    }
  });

  resetBtn.addEventListener("click", function () {
    gameController.resetState();
    turnDisplay.textContent = "";
    turnDisplay.classList.add("hidden");
    formContainer.classList.remove("hidden");
    playerXname.value = "";
    playerOname.value = "";
    resetBtn.classList.add("hidden");
    tiles.forEach((tile) => (tile.textContent = ""));
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
          turnDisplay.textContent = gameController.getPlayerXTurn()
            ? `${playerXname.value}'s turn`
            : `${playerOname.value}'s turn`;
          if (
            gameController.getWinner() &&
            gameController.getWinner() != "tie"
          ) {
            turnDisplay.textContent = gameController.getWinner() + " Wins!";
            resetBtn.classList.remove("hidden");
          } else if (gameController.getWinner() === "tie") {
            turnDisplay.textContent = "Its a tie!";
            resetBtn.classList.remove("hidden");
          }
        }
      }
    })
  );
})();
