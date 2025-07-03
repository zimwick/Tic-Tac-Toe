"use strict";

const gameBoard = {
  //array position 0 bottom left position 8 top right
  tiles: ["", "", "", "", "", "", "", "", ""],
};

const gameflow = {};

const playerX = {};

const playerO = {};

// each player is X or O
// have a function that randomly decides which player goes first
// first player chooses 0-8 of an array that array slot goes from "" to either "X" or "O" depending on player
// function needs to be in place that checks every turn if there is a win or a tie
// possible wins: horizontal: 012,345,678, vertical: 036,147,258 diagnol: 048 246 - if no win its a tie
