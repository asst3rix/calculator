/*** VARIABLES ***/

let firstNumber = false;
let secondNumber = false;
let operator = "";
let operatorFlag = false;
let equalFlag = false;
let commaFlag = false;
let numberFlag = false;
const displayLimit = 9;

function resetValues() {
    firstNumber = false;
    secondNumber = false;
    operator = "";
    equalFlag = false;
    commaFlag = false;
    numberFlag = false;
}

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
        // For cases like "0758". We remove the 0 at the beginning.
        if (display.textContent.at(0) === "0" && display.textContent.at(1) !== ".") {
            display.textContent = display.textContent.slice(1);
        }

        // If we just press an operator we clean the display.
        // We then reset the operator and comma flags for a new number.
        if (operatorFlag) {
            display.textContent = "";
            operatorFlag = false;
            commaFlag = false;
        }

        // If we pressed equal
        if (equalFlag) {
            // and commaFlag at true, it means that the users has pressed "." right after the equal so we display "0.".
            if (commaFlag) {
                display.textContent = "0.";
                resetValues();
                commaFlag = true;
                // Else we go with a number not starting by 0.
            } else {
                display.textContent = "";
                resetValues();
            }
        }

        if (display.textContent.length < displayLimit) {
            display.textContent = display.textContent + number.textContent;
        }

        numberFlag = true;
    })
});

operators.forEach((localOperator) => {
    localOperator.addEventListener("click", () => {
        // We check that we pressed on a number.
        // This is for the case someone press a number and then press mutiples times an operator.
        if (numberFlag) {
            // If firstNumber !== false, it means that we are on a multiple operation.
            if (firstNumber !== false) {
                display.textContent = operate(firstNumber, display.textContent, operator);
            }
            firstNumber = display.textContent;
            operator = localOperator.textContent;
            operatorFlag = true;
            numberFlag = false;
        }
    })
});

equal.addEventListener("click", () => {
    if (firstNumber !== false) {
        secondNumber = display.textContent;
        let result = operate(firstNumber, secondNumber, operator);
        // To counter add(0.78,2) = 2.7800000000000002.
        result = Math.round(result * 1e10) / 1e10;
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
    display.textContent = operate(display.textContent, "0.01", "*");
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