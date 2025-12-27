const numpad = document.querySelector(".numpad");
const display = document.querySelector(".display");

let lastOperator = "";
let num1 = null;
let num2 = null;
let resultDisplayed = false;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = () => {
    !resultDisplayed ? num2 = getNumberOnDisplay() : num1 = getNumberOnDisplay();
    switch (lastOperator) {
        case "+":
            updateDisplay(add(num1, num2));
            break;
        case "-":
            updateDisplay(subtract(num1, num2));
            break;
         case "*":
            updateDisplay(multiply(num1, num2));
            break;
        case "/":
            if (num2 != 0)
                updateDisplay(divide(num1, num2));
            else {
                alert("You can't divide by 0!");
                num2 = null;
                updateDisplay(num1);
            }
            break;
        default:
            updateDisplay("N/A");
            break;
    };
    resultDisplayed = true;
    console.log(num1 + lastOperator + num2);
};

const setOperation = (e) => {
    if (lastOperator && !resultDisplayed) {
        operate();
    };
    resultDisplayed = false;
    lastOperator = e.target.textContent;
    num1 = getNumberOnDisplay();
};

const getNumberOnDisplay = () => {
    let num = parseFloat(display.textContent);
    display.textContent = "";
    return num;
}

const updateDisplay = (value) => {
    console.log(value);
    display.textContent = value;
};

const allClear = () => {
    lastOperator = null;
    num1 = null;
    num2 = null;
    updateDisplay("");
    resultDisplayed = false;
};

const appendValue = (e) => {
    if (resultDisplayed) allClear();
    display.textContent += e.target.textContent;
};

const deleteValue = () => {
    display.textContent = display.textContent.slice(0, -1);
};

const addEvent = (button, value) => {
    let fn;
    switch (value) {
        case "+":
        case "-":
        case "/":
        case "*":
            fn = setOperation;
            break;
        case "=":
            fn = operate;
            break;
        case "AC":
            fn = allClear;
            break;
        case "DEL":
            fn = deleteValue;
            break;
        default:
            fn = appendValue;
            break;
    };

    button.addEventListener("click", fn);
};

(function createButtons() {
    const buttons = 
    ["AC", "DEL", "/", 
    7, 8, 9, "*", 
    4, 5, 6, "+", 
    1, 2, 3, "-",
    0, ".", "="];

    buttons.forEach(value => {
    const button = document.createElement("button");
    button.textContent = value;
    addEvent(button, value);
    numpad.appendChild(button);
    });
})();

