//math.random() will going to return the number which is in blw 0 and 1 like 0.123343322
//to convert this particular result to rock paper and scessors
// 0 to 1/3 ==> Rock
//1/3 to 2/3 ==> paper
//2/3 to 1  ==> scissors

let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    losses: 0,
    ties: 0,
};

printResult();

function playAGame(playerMove) {
  let computerMove = generateRandom();
  let result;
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "you lose";
    } else {
      result = "you win";
    }
  }

  if (playerMove === "paper") {
    if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "rock") {
      result = "you win";
    } else {
      result = "you lose";
    }
  }
  if (playerMove === "scissors") {
    if (computerMove === "scissors") {
      result = "Tie";
    } else if (computerMove === "rock") {
      result = "you lose";
    } else {
      result = "you win";
    }
  }

  if (result === "you win") score.wins++;
  else if (result === "you lose") score.losses++;
  else score.ties++;

  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img src=images/${playerMove}-emoji.png><img src=images/${computerMove}-emoji.png> computer`;
  printResult();
}

function removeResult() {
  document.querySelector(".js-result").innerHTML = " ";
  document.querySelector(".js-moves").innerHTML = " ";
}

function printResult() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`;
}


function generateRandom() {
  let computerMove;
  const randomNum = Math.random();
  if (randomNum >= 0 && randomNum < 1 / 3) {
    computerMove = "rock";
  } else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }
  return computerMove;
}

function reset() {
    localStorage.removeItem("score");
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    printResult();
    removeResult();
}

var isAutoPlaying = false;
var intervalId;
function playRandom() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
        playAGame(generateRandom());
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        removeResult();
    }
}


document.querySelector(".rock-move").addEventListener("click", () => {
    playAGame("rock");
});

document.addEventListener("keydown", (event) => {
    console.log(event.key);
  if(event.key === "r" || event.key === "R") {
    playAGame("rock");
  }
  else if(event.key === "p" || event.key === "P") {
    playAGame("paper");
  }
  else if(event.key === "s" || event.key === "S") {
    playAGame("scissors");
  }
  else if(event.key === "e" || event.key === "E") {
    reset();
  } else if(event.key === "a" || event.key === "A") {
    playRandom();
  }
});

document.querySelector(".paper-move").addEventListener("click", () => {
  playAGame("paper");
});

document.querySelector(".scissors-move").addEventListener("click", () => {
  playAGame("scissors");
});

document.querySelector(".reset-button").addEventListener("click", reset)


document.querySelector(".random-btn").addEventListener("click", playRandom);