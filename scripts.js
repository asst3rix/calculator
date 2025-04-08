/*** VARIABLES ***/

let firstNumber = false;
let secondNumber = false;
let operator = "";
let operatorFlag = false;
let equalFlag = false;
let commaFlag = false;
const displayLimit = 13;

const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const clear = document.querySelector("#clear");
const equal = document.querySelector("#equal");
const minus = document.querySelector("#minus");
const percentage = document.querySelector("#percentage");
const comma = document.querySelector("#comma");

/*** EVENT LISTENERS ***/

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        if (display.textContent.at(0) === "0") {
            display.textContent = display.textContent.slice(1);
        }

        if (operatorFlag) {
            display.textContent = "";
            operatorFlag = false;
            commaFlag = false;
        }

        if (equalFlag) {
            display.textContent = "";
            resetValues();
        }

        if (display.textContent.length < displayLimit) {
            display.textContent = display.textContent + number.textContent;
        }
    })
});

operators.forEach((localOperator) => {
    localOperator.addEventListener("click", () => {
        if (firstNumber !== false) {
            display.textContent = operate(firstNumber, display.textContent, operator);
        }
        firstNumber = display.textContent;
        operator = localOperator.textContent;
        operatorFlag = true;
    })
});

equal.addEventListener("click", () => {
    if (firstNumber !== false) {
        secondNumber = display.textContent;
        let result = operate(firstNumber, secondNumber, operator);
        display.textContent = result.toString().slice(0, displayLimit);
    }
    equalFlag = true;
});

clear.addEventListener("click", () => {
    display.textContent = "0";
    resetValues();
});

minus.addEventListener("click", () => {
    if (display.textContent.at(0) === "-") {
        display.textContent = display.textContent.slice(1);
    } else {
        display.textContent = "-" + display.textContent;
    }
});

percentage.addEventListener("click", () => {
    display.textContent = parseFloat(display.textContent) * 0.01;
});

comma.addEventListener("click", () => {
    if (equalFlag) {
        display.textContent = "0.";
        commaFlag = true;
    }
    else {
        if (!commaFlag) {
            display.textContent = display.textContent + comma.textContent;
            commaFlag = true;
        }
    }
});

/*** FUNCTIONS ***/

function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
    if (b === 0) {
        return "Nope.";
    } else {
        return parseFloat(a) / parseFloat(b);
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

function resetValues() {
    firstNumber = false;
    secondNumber = false;
    operator = "";
    equalFlag = false;
    commaFlag = false;
}