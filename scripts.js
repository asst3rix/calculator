/*** VARIABLES ***/

let firstNumber = false;
let secondNumber = false;
let operator = "";
let operatorFlag = false;
let egualFlag = false;
let commaFlag = false;
const displayLimit = 13;

const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const clear = document.querySelector("#clear");
const egual = document.querySelector("#egual");
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

        if (egualFlag) {
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
        let result = operate(parseFloat(firstNumber), parseFloat(secondNumber), operator);
        display.textContent = result.toString().slice(0, displayLimit);
    }
    egualFlag = true;
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
    display.textContent = parseInt(display.textContent) * 0.01;
});

comma.addEventListener("click", () => {
    if (!commaFlag) {
        display.textContent = display.textContent + comma.textContent;
        commaFlag = true;
    }
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

function resetValues() {
    firstNumber = false;
    secondNumber = false;
    operator = "";
    egualFlag = false;
    commaFlag = false;
}