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
    return a / b;
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

let firstNumber = 0;
let secondNumber = 0;
let operator = "";
let testOperator = false;

const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const clear = document.querySelector("#clear");
const egual = document.querySelector("#egual");
const minus = document.querySelector("#minus");
const percentage = document.querySelector("#percentage");

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        if (display.textContent.at(0) === "0") {
            display.textContent = display.textContent.slice(1);
        }

        if (testOperator) {
            display.textContent = "";
            testOperator = false;
        }

        display.textContent = display.textContent + number.textContent;
    })
});

operators.forEach((localOperator) => {
    localOperator.addEventListener("click", () => {
        firstNumber = display.textContent;
        operator = localOperator.textContent;
        testOperator = true;
    })
});

egual.addEventListener("click", () => {
    secondNumber = display.textContent;
    display.textContent = operate(parseInt(firstNumber), parseInt(secondNumber), operator);
});

clear.addEventListener("click", () => {
    display.textContent = "0";
    firstNumber = 0;
    secondNumber = 0;
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