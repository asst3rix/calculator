/*** VARIABLES ***/

let firstNumber = null;
let secondNumber = null;
let operator = "";
let operatorFlag = false;
let equalFlag = false;
let commaFlag = false;
let numberFlag = false;
const displayLimit = 8;

function resetValues() {
    firstNumber = null;
    secondNumber = null;
    operator = "";
    equalFlag = false;
    commaFlag = false;
    numberFlag = false;
}

const display = document.querySelector("#display");
const buttons = document.querySelectorAll("#panel button");

/*** EVENT LISTENERS ***/

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        handleInput(button.textContent);
    })
});

document.addEventListener("keydown", (key) => {
    handleInput(key.key);
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
    if (b === "0") {
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

function handleInput(value) {
    const testNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const testOperators = ["/", "*", "-", "+"];

    switch (true) {
        case testNumbers.includes(value):
            handleNumbers(value);
            break;

        case testOperators.includes(value):
            handleOperators(value);
            break;

        case value === ".":
            handleDecimal(value);
            break;

        case value === "=" || value === "Enter":
            handleEqual();
            break;

        case value === "<<" || value === "Backspace":
            handleBackspace();
            break;

        case value === "C":
            handleClear();
            break;

        case value === "+/-":
            handlePlusMinus();
            break;

        case value === "%":
            handlePercentage();
            break;
    }
}

function handleNumbers(value) {
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
        // We also reset the values because it's a new operation.
        if (commaFlag) {
            resetValues();
            display.textContent = "0.";
            commaFlag = true;
            // Else we go with a number not starting by 0.
        } else {
            display.textContent = "";
            resetValues();
        }
    }

    if (display.textContent.length < displayLimit) {
        display.textContent = display.textContent + value;
    }

    numberFlag = true;
}

function handleOperators(value) {
    // We check that we pressed on a number.
    // This is for the case someone press a number and then press mutiples times an operator.
    if (numberFlag) {
        // If firstNumber !== false, it means that we are on a multiple operation.
        if (firstNumber !== null) {
            display.textContent = operate(firstNumber, display.textContent, operator);
        }
    }

    firstNumber = display.textContent;
    operator = value;
    operatorFlag = true;
    numberFlag = false;
    equalFlag = false;
}

function handleDecimal(comma) {
    if (equalFlag) {
        display.textContent = "0.";
    }
    else {
        if (!commaFlag) {
            display.textContent = display.textContent + comma;
        }
    }
    commaFlag = true;
}

function handleEqual() {
    if (firstNumber !== null) {
        secondNumber = display.textContent;
        let result = operate(firstNumber, secondNumber, operator);
        if (typeof result === "number") {
            // To counter add(0.78,2) = 2.7800000000000002.
            result = Math.round(result * 1e10) / 1e10;
        }
        display.textContent = result.toString().slice(0, displayLimit);
    }
    resetValues();
    equalFlag = true;
}

function handleBackspace() {
    if (display.textContent.length === 1) {
        display.textContent = "0";
    } else {
        display.textContent = display.textContent.slice(0, display.textContent.length - 1);
    }
}

function handleClear() {
    display.textContent = "0";
    resetValues();
}

function handlePlusMinus() {
    if (display.textContent.at(0) === "-") {
        display.textContent = display.textContent.slice(1);
    } else {
        display.textContent = "-" + display.textContent;
    }
}

function handlePercentage() {
    display.textContent = operate(display.textContent, "0.01", "*");
}