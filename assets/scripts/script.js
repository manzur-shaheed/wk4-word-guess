// variables
var i;
var score = {
    wins: 0,
    losses: 0
}
var timer, timerCount = 10;
var word, letters, numLetters;
var wonGame = false;
var startButton = document.querySelector("#start");
var resetButton = document.querySelector("#reset");
var winDiv = document.querySelector("#win");
var lossDiv = document.querySelector("#loss");
var gbInputDiv = document.querySelector("#gb-input");
var timerDiv = document.querySelector(".timer");

var wordsBank = ["variable", "array", "modulus", "object", "function", "string", "boolean", "number"];
var blanks = [];

// event listeners
startButton.addEventListener("click", startGame);
reset.addEventListener("click", resetGame);
document.addEventListener("keydown", function(event) {
    // alpha numeric characters
    var chars = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
    var key, letter, found = false;

    // If the count is zero, exit function
    if (timerCount === 0) {
      return;
    }
    // Convert all keys to lower case
    key = event.key.toLowerCase();
    if (chars.includes(key)) {
      letter = event.key;
      for (i = 0; i < numLetters; i++) {
          if (word[i] == letter) {
              blanks[i] = letter;
              found = true;
          }
      }
      if (found) {
          gbInputDiv.textContent = blanks.join("");
      }
      if (word === blanks.join("")) {
          wonGame = true;
      }
    }
});


// functions
function displayScore() {
    var scoreJSON = localStorage.getItem("score");
    score = JSON.parse(scoreJSON);

    if (score.wins == undefined) {
        score.wins = 0;
    }
    if (score.losses == undefined) {
        score.losses = 0;
    }
    winDiv.innerHTML = "Wins: " + score.wins;
    lossDiv.innerHTML = "Losses: " + score.wins;
    timerDiv.textContent = timerCount;
}

// reset score
function resetGame() {
    // reset score and save
    score.wins = 0;
    score.losses = 0;
    timerCount = 10;
    score = JSON.stringify(score);
    localStorage.setItem("score", score);
    displayScore();
}

// show blanks 
function showBlanks() {
    // pick a random word from wordsBank and get letters in that word 
    word = wordsBank[Math.floor(Math.random() * wordsBank.length)];
    letters = word.split("");
    numLetters = letters.length;

    // initialize blanks array and create input field
    blanks = [];
    for (i = 0; i < numLetters; i++) {
      blanks.push("_");
    }
    gbInputDiv.textContent = blanks.join(" ");
}

// win 
function gameStatus(status) {
    if (status == 'win') {
        gbInputDiv.textContent = "Hurray!!!🏆 ";
        score.wins++;
    }
    else {
        gbInputDiv.textContent = "Game Over 😭 ";
        score.losses++;        
    }
    startButton.disabled = false;
    localStorage.setItem("score", score);
    displayScore();
}

// start the timer
function startTimer() {
    // set timer
    timer = setInterval(function() {
      timerCount--;
      timerDiv.textContent = timerCount;
      if (timerCount >= 0) {
        // win?
        if (wonGame && timerCount > 0) {
          clearInterval(timer);
          gameStatus('win');
        }
        // time has run out
        if (timerCount === 0) {
            clearInterval(timer);
            gameStatus('lost');
        }
      }
    }, 1000);
}

// start game
function startGame() {
    // console.log("game start");
    wonGame = false;
    startButton.disabled = true;
    timerCount = 10;
    showBlanks();
    startTimer();
}

// show stored score at document loading
displayScore();