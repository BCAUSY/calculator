
function add(num1, num2) {
  return roundToTwo(num1 + num2);
}

function subtract(num1, num2) {
  return roundToTwo(num1 - num2);
}

function multiply(num1, num2) {
  return roundToTwo(num1 * num2);
}

function divide(num1, num2) {
  return roundToTwo(num1 / num2);
}

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}


const digitOne = document.getElementById("num1");
const digitOperator = document.getElementById("operator");
const digitTwo = document.getElementById("num2");
const digitSum = document.getElementById("result");

const keyPad = document.querySelectorAll(".pad");
const deleteButton = document.getElementById("delete");
const clearButton = document.getElementById("clearButton");
const operator = document.querySelectorAll(".op");
const sum = document.getElementById("equalsButton");
const display = document.querySelector(".display");


const displaySums = document.createElement("div");
displaySums.style.height = "88%";
displaySums.style.display = "flex";
displaySums.style.flexFlow = "column";
displaySums.classList.add("dup");
displaySums.style.fontSize = "1rem";
display.appendChild(displaySums);


keyPad.forEach((pad) => {
  pad.style.transition = "filter 0.2s ease-out, background-color 0.2s ease-out";
});

operator.forEach((op) => {
  op.style.transition = "filter 0.2s ease-out, background-color 0.2s ease-out";
  op.addEventListener("pointerdown", clickedOperator);
  op.addEventListener("pointerup", clickedOperatorReset);
});

sum.addEventListener("click", getFinSum);
clearButton.addEventListener("click", clear);

keyPad.forEach((button) => {
  button.addEventListener("click", numIn);
});

keyPad.forEach((button) => {
  button.addEventListener("pointerdown", clicked);
  button.addEventListener("pointerup", clickedReset);
});


let clearTrigger = false;
let numOneTrigger = true;
let numTwoTrigger = false;
let sumTrigger = false;
let finNumOne = 0;
let finNumTwo = 0;
let finOperator = 0;
let finSum = 0;
let history = [];


function backspace() {
  if (numTwoTrigger) numOneTrigger = false;
  if (numOneTrigger) {
    digitOne.innerText = digitOne.innerText.slice(
      0,
      digitOne.innerText.length - 1
    );
    finNumOne = Number(digitOne.innerText);
  }
  if (numTwoTrigger || (numTwoTrigger && sumTrigger)) {
    digitTwo.innerText = digitTwo.innerText.slice(
      0,
      digitTwo.innerText.length - 1
    );
    finNumTwo = Number(digitTwo.innerText);
  }
}

function clear() {
  displaySums.innerText = "";
  history = [];
  console.log("CLEAR");
  finNumOne = 0;
  finNumTwo = 0;
  finOperator = 0;
  finSum = 0;
  sumTrigger = false;
  numTwoTrigger = false;

  keyPad.forEach((button) => {
    button.removeEventListener("click", numTwoIn);
  });

  digitOne.innerText = "";
  digitOperator.innerText = "";
  digitTwo.innerText = "";
  digitSum.innerText = "";

  keyPad.forEach((button) => {
    button.addEventListener("click", numIn);
  });

  if (history.length > 5) {
    result.innerText = "";
    history = history.slice(-5);
  }
}

function numIn() {
  console.log(this.value);
  deleteButton.addEventListener("click", backspace);
  if (!clearTrigger) {
    clear();
    clearTrigger = true;
  }

  const buttonValue = this.value;
  digitOne.innerText += buttonValue;
  finNumOne = Number(digitOne.innerText);

  if (sumTrigger) {
    clear();
    clearTrigger = false;
  }
  numOneTrigger = true;
}

function numTwoIn() {
  console.log(this.value);
  numTwoTrigger = true;
  const buttonValue = this.value;
  digitTwo.innerText += buttonValue;
  finNumTwo = Number(digitTwo.innerText);
}

function operIn() {
  if (clearTrigger) {
    console.log(this.value);
    finOperator = digitOperator.innerText = this.value;

    if (numOneTrigger) {
      keyPad.forEach((button) => {
        button.removeEventListener("click", numIn);
      });
      keyPad.forEach((button) => {
        button.addEventListener("click", numTwoIn);
      });
    }
    if (sumTrigger) {
      console.log("SUMTRIGGER");

      finNumOne = finSum;
      digitOne.innerText = finSum;
      finNumTwo = 0;
      digitTwo.innerText = "";
      finSum = 0;
      digitSum.innerText = "";
      sumTrigger = false;
    }
  }
}

operator.forEach((button) => {
  button.addEventListener("click", operIn);
});

function operate(num1, operator, num2) {
  if (operator === `+`) {
    finSum = add(num1, num2);
  } else if (operator === "-") {
    finSum = subtract(num1, num2);
  } else if (operator === "÷") {
    finSum = divide(num1, num2);
  } else if (operator === "×") {
    finSum = multiply(num1, num2);
  }
}

function getFinSum() {
  if (!numTwoTrigger) return;

  if (finNumOne == 0 && finNumTwo == 0) {
    digitOne.innerText = "ERROR";
    return console.log("error");
  }

  console.log(this.value);
  if (!sumTrigger) {
    operate(finNumOne, finOperator, finNumTwo);
    digitSum.innerText = finSum;
    result = [finNumOne + finOperator + finNumTwo + "=" + finSum];
    history.unshift(result);
    sumTrigger = true;

    if (numOneTrigger) {
      keyPad.forEach((button) => {
        button.removeEventListener("click", numTwoIn);
      });
      keyPad.forEach((button) => {
        button.addEventListener("click", numIn);
      });
    }
    console.log(history);
    addSpan();
  }

  if (history.length > 5) {
    isToLong();
  }
}

function addSpan() {
  const result = document.createElement("span");
  result.innerText = history[0];
  result.style.display = "block";
  result.style.textAlign = "right";
  result.style.paddingLeft = "90px";
  displaySums.prepend(result);
}

function isToLong() {
  history.pop();
  const lastSpan = displaySums.querySelector("span:last-child");
  if (lastSpan) {
    lastSpan.remove();
  }
}

function clickedOperator() {
  this.style.backgroundColor = "rgb(243, 137, 75)";
  this.style.transform = "translate3d(0px, 1px, 0px)";
}

function clickedOperatorReset() {
  this.style.backgroundColor = "rgb(228, 134, 81)";
  this.style.transform = "translate3d(0px, 0px, 0px)";
}

function clicked() {
  this.style.transform = "translate3d(0px, 1px, 0px)";
  this.style.backgroundColor = "rgba(216, 216, 204, 0.4)";
}

function clickedReset() {
  this.style.transform = "translate3d(0px, 3px, 0px)";
  this.style.backgroundColor = "#EBEBEA";
}
