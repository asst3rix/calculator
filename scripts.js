/*** VARIABLES ***/

let firstNumber = false;
let secondNumber = false;
let operator = "";
let operatorFlag = false;
const displayLimit = 13;

const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const clear = document.querySelector("#clear");
const egual = document.querySelector("#egual");
const minus = document.querySelector("#minus");
const percentage = document.querySelector("#percentage");

/*** EVENT LISTENERS ***/

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        if (display.textContent.at(0) === "0") {
            display.textContent = display.textContent.slice(1);
        }

        if (operatorFlag) {
            display.textContent = "";
            operatorFlag = false;
        }

        if (display.textContent.length < displayLimit) {
            display.textContent = display.textContent + number.textContent;
        }
    })
});

operators.forEach((localOperator) => {
    localOperator.addEventListener("click", () => {
        if (firstNumber !== false) {
            display.textContent = operate(parseInt(firstNumber), parseInt(display.textContent), operator);   
        }
        firstNumber = display.textContent;
        operator = localOperator.textContent;
        operatorFlag = true;
    })
});

egual.addEventListener("click", () => {
    if (firstNumber !== false) {
        secondNumber = display.textContent;
        let result = operate(parseInt(firstNumber), parseInt(secondNumber), operator);
        display.textContent = result.toString().slice(0,displayLimit);
    }
});

clear.addEventListener("click", () => {
    display.textContent = "0";
    firstNumber = false;
    secondNumber = false;
    operator = "";
});

minus.addEventListener("click", () => {
    if (display.textContent.at(0) === "-") {
        display.textContent = display.textContent.slice(1);
    } else {
        display.textContent = "-" + display.textContent;
    }
});

percentage.addEventListener("click", () => {
    display.textContent = parseInt(display.textContent) * 0.01;
});

/*** FUNCTIONS ***/

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Nope.";
    } else {
        return a / b;
    }
}

function operate(number1, number2, operator) {
    switch (operator) {
        case "+":
            return add(number1, number2);
            break;

        case "-":
            return subtract(number1, number2);
            break;

        case "*":
            return multiply(number1, number2);
            break;

        case "/":
            return divide(number1, number2);
            break;
    }
}