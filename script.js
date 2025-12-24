const numpad = document.querySelector(".numpad");
const display = document.querySelector(".display");

let currentOperation;
let num1;
let num2;
let calcFromResult = false;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = () => {
    !calcFromResult ? num2 = getNumberOnDisplay() : num1 = getNumberOnDisplay();
    switch (currentOperation) {
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
            updateDisplay(divide(num1, num2));
            break;
        default:
            updateDisplay("N/A");
            break;
    };
    calcFromResult = true;
};

const setOperation = (e) => {
    calcFromResult = false;
    currentOperation = e.target.textContent;
    num1 = getNumberOnDisplay();
};

const getNumberOnDisplay = () => {
    let num = parseFloat(display.textContent);
    display.textContent = "";
    return num;
}

const updateDisplay = (value) => {
    display.textContent = value;
};

const allClear = () => {
    currentOperation = "";
    num1 = "";
    num2 = "";
    updateDisplay("");
    calcFromResult = false;
};

const appendValue = (e) => {
    if (calcFromResult) allClear();
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

