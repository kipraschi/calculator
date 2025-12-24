const numpad = document.querySelector(".numpad");
const display = document.querySelector(".display");

let displayContent = [];
let currentOperation;
let num1;
let num2;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const setOperation = (e) => {
    currentOperation = e.target.textContent;
    num1 = getNumberOnDisplay();
};

const getNumberOnDisplay = () => {
    let num = parseInt(displayContent.join(""));
    displayContent = [];
    return num;
}

const operate = () => {
    num2 = getNumberOnDisplay();
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
};

const updateDisplay = (str) => {
    display.textContent = str;
};

const allClear = () => {
    displayContent = [];
    currentOperation = "";
    num1 = "";
    num2 = ""
    updateDisplay(displayContent.join(""));
};

const appendValue = (e) => {
    displayContent.push(e.target.textContent);
    updateDisplay(displayContent.join(""));
};

const deleteValue = () => {
    displayContent.pop();
    updateDisplay(displayContent.join(""));
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

