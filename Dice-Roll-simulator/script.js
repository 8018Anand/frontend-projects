const buttonEl = document.getElementById("roll-button");
const diceEl = document.getElementById("dice");
const rollHistoryEl = document.getElementById("roll-history");
let historyList = localStorage.getItem("historyList")
  ? JSON.parse(localStorage.getItem("historyList"))
  : [];
const clearBtn = document.getElementById("reset-button");

function startingFunc() { //main aim is to load the previous history from local storage if available and update the dom by calling the updateRollHistory function
  updateRollHistory();
}
startingFunc();

function rollDice() { //main aim is to roll the dice and update the history list and local storage
  const rollResult = Math.floor(Math.random() * 6) + 1;
  const diceFace = getDiceFace(rollResult);
  diceEl.innerHTML = diceFace;
  historyList.push(rollResult);
  updateRollHistory();
  localStorage.setItem("historyList", JSON.stringify(historyList));
}

function updateRollHistory() { //main aim is to update the history on dom by clearing the previous history and adding the new history
  rollHistoryEl.innerHTML = "";
  for (let i = historyList.length - 1; i >= 0; i--) {
    const listItems = document.createElement("li");
    listItems.innerHTML = `Roll ${i + 1}: <span>${getDiceFace(
      historyList[i]
    )}</span>`;
    rollHistoryEl.appendChild(listItems);
  }
}

function getDiceFace(rollResult) { //take the number and return the corresponding dice face unicode
  switch (rollResult) {
    case 1:
      return "&#9856";
    case 2:
      return "&#9857";
    case 3:
      return "&#9858";
    case 4:
      return "&#9859";
    case 5:
      return "&#9860";
    case 6:
      return "&#9861";
    default:
      return "&#9856";
  }
}

buttonEl.addEventListener("click", () => { //main aim is to add the roll animation and call the rollDice function
  diceEl.classList.add("roll-animation");
  setTimeout(() => {
    diceEl.classList.remove("roll-animation");
    rollDice();
  }, 1000);
  // console.log("clicked");
});

clearBtn.addEventListener("click", () => { //main aim is to clear the history and update the dom by calling the updateRollHistory function
  historyList = [];
  localStorage.setItem("historyList", JSON.stringify(historyList));
  updateRollHistory();
});