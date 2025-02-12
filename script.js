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
const digClass = document.querySelectorAll(".digit");
const deleteButton = document.getElementById("delete");
const clearButton = document.getElementById("clearButton");
const operator = document.querySelectorAll(".op");
const sum = document.getElementById("equalsButton");
let result = [];

clearButton.addEventListener("click", clear);
let clearTrigger = false;

let numOneTrigger = false;
let numTwoTrigger = false;

let finNumOne = 0;
let finNumTwo = 0;
let finOperator = 0;
let finSum = 0;
function backspace() {
  if (numTwoTrigger) numOneTrigger = false;
  if (numOneTrigger) {
    digitOne.innerText = digitOne.innerText.slice(
      0,
      digitOne.innerText.length - 1
    );
    finNumOne = Number(digitOne.innerText);
  }
  if (numTwoTrigger) {
    digitTwo.innerText = digitTwo.innerText.slice(
      0,
      digitTwo.innerText.length - 1
    );
    finNumTwo = Number(digitTwo.innerText);
  }
}
console.log(numOneTrigger);

function clear() {
  finNumOne = 0;
  finNumTwo = 0;
  finOperator = 0;
  finSum = 0;
  numOneTrigger = false;
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
}

keyPad.forEach((button) => {
  button.addEventListener("click", numIn);
});

function numIn() {
  deleteButton.addEventListener("click", backspace);
  if (!clearTrigger) {
    clear();
    clearTrigger = true;
  }
  const buttonValue = this.value;
  digitOne.innerText += buttonValue;
  numOneTrigger = true;
  finNumOne = Number(digitOne.innerText);
}

function numTwoIn() {
  numTwoTrigger = true;
  const buttonValue = this.value;
  digitTwo.innerText += buttonValue;
  finNumTwo = Number(digitTwo.innerText);
}

function operIn() {
  digitOperator.innerText = this.value;
  finOperator = digitOperator.innerText = this.value;
  if (numOneTrigger) {
    keyPad.forEach((button) => {
      button.removeEventListener("click", numIn);
    });
    keyPad.forEach((button) => {
      button.addEventListener("click", numTwoIn);
    });
  }
}
function operateMore(num1, operator, num2) {
    

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
  } else if (digitOperator.innerText === "×") {
    finSum = multiply(num1, num2);
  } 
}

let history = [];

function getFinSum() {
  deleteButton.removeEventListener("click", backspace);
  operate(finNumOne, finOperator, finNumTwo);
  digitSum.innerText = finSum;
  result = [finNumOne + finOperator + finNumTwo + "=" + finSum];
  history.push(result);
}
sum.addEventListener("click", getFinSum);
