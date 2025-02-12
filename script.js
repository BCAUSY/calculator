function add(num1,num2){
    return roundToTwo(num1 + num2);
}

function subtract(num1,num2){
    return roundToTwo(num1 - num2);
}

function multiply(num1,num2){
    return roundToTwo(num1 * num2);
}

function divide(num1, num2){
    return roundToTwo(num1 / num2)
}

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

function operate(num1,operator,num2){
    if (operator === `+`){
        return add(num1, num2);
    } 
    else if (operator === "-") {
        return subtract(num1, num2);
    }
    else if (operator === "/"){
        return divide(num1, num2);
    }
    else if (operator === "*"){
        return multiply(num1, num2);
    }
}

const digitOne = document.getElementById("num1");
const digitOperator = document.getElementById("operator");
const digitTwo = document.getElementById("num2");
const digitSum = document.getElementById("result");

const keyPad = document.querySelectorAll(".pad");
const digClass = document.querySelectorAll(".digit");
const deleteButton = document.getElementById("delete")
const clearButton = document.getElementById("clearButton");
const operator = document.querySelectorAll(".op");

clearButton.addEventListener("click",clear);
let clearTrigger = false;
keyPad.forEach (button => {
    button.addEventListener("click", function(){
        if (!clearTrigger) {
            clear();
            clearTrigger = true;
        }
       const buttonValue = button.value;
       digitOne.innerText += buttonValue;
        console.log(buttonValue);
    });
})

deleteButton.addEventListener("click", function(){
        digitOne.innerText = digitOne.innerText.slice(0, (digitOne.innerText.length - 1))
    })


function clear(){
    digitOne.innerText = "";
    digitOperator.innerText = "";
    digitTwo.innerText = "";
    digitSum.innerText = "";
        
}

operator.forEach(button => {
    button.addEventListener("click", function(){
        
        const operatorValue = button.value;
        digitOperator.innerText = operatorValue
    })
})