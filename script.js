const numpad = document.querySelector(".numpad");
const display = document.querySelector(".display");

let lastOperator = "";
let num1 = null;
let num2 = null;
let isResultDisplayed = false;
let isOperatorClicked = false;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = () => {
    if (display.textContent == "Err") {
        allClear();
        return;
    }
    isResultDisplayed ? num1 = getNumberOnDisplay() : num2 = getNumberOnDisplay();
    if (!lastOperator || num1 === null || num2 === null || isNaN(num1) || isNaN(num2)) return;
    let result;
    switch (lastOperator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
         case "*":
            result = multiply(num1, num2);
            break;
        case "/":
            if (num2 === 0) {
                alert("You can't divide by 0!");
                updateDisplay(num1);
                num2 = null;
                return;
            }
            result = divide(num1, num2);
            break;
        default:
            updateDisplay("Err");
            break;
    }
    const maxNumber = 9999999;
    result = Math.round(result * 1000000) / 1000000;
    if (result > maxNumber || result < -maxNumber) {
        display.textContent = "Err";
        return;
    }
    updateDisplay(result);
    isResultDisplayed = true;
};

const setOperation = (e) => {
    if (lastOperator && !isResultDisplayed) {
        operate();
    }
    isResultDisplayed = false;
    lastOperator = e.target.textContent;
    num1 = getNumberOnDisplay();
    toggleOperatorButton(e);
    isOperatorClicked = true;
};

const toggleOperatorButton = (e) => {
    const previouslyClicked = document.querySelector(".clicked");
    if (previouslyClicked) previouslyClicked.classList.remove("clicked");
    if (e) e.target.classList.add("clicked");
};

const toggleSign = () => {
    if (display.textContent === "" || display.textContent === "Err") return;
    
    if (display.textContent.startsWith("-"))
        display.textContent = display.textContent.slice(1);
    else
        display.textContent = "-" + display.textContent;
};

const getNumberOnDisplay = () => {
    let num = parseFloat(display.textContent);
    return num;
};

const updateDisplay = (value) => {
    display.textContent = value;
};

const allClear = () => {
    lastOperator = null;
    num1 = null;
    num2 = null;
    updateDisplay("");
    isResultDisplayed = false;
    document.querySelector(".decimal").disabled = false;
    toggleOperatorButton();
};

const appendValue = (e) => {
    if (isOperatorClicked) {
        display.textContent = "";
        isOperatorClicked = false;
    }
    if (isResultDisplayed) allClear();
    if (display.textContent.length >= 7) return;
    display.textContent += e.target.textContent;
    if (e.target.textContent == ".") e.target.disabled = true;
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
        case "+/-":
            fn = toggleSign;
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
    }
    button.addEventListener("click", fn);
};

const addClass = (button, value) => {
    let styleClass = "";
    switch (value) {
        case "+":
        case "-":
        case "/":
        case "*":
        case "=":
            styleClass = "operator";
            break;
        case "AC":
            styleClass = "action";
            button.classList.add("doubleBtn");
            break;
        case "DEL":
            styleClass = "action";
            break;
        case ".":
            styleClass = "decimal";
            break;
        default:
            styleClass = "number";
            break;
    }
    button.classList.add(styleClass);
};

(function createButtons() {
    const buttons = 
    ["AC", "DEL", "/", 
    7, 8, 9, "*", 
    4, 5, 6, "+", 
    1, 2, 3, "-",
    "+/-", 0, ".", "="];

    buttons.forEach(value => {
    const button = document.createElement("button");
    button.textContent = value;
    addEvent(button, value);
    addClass(button, value);
    numpad.appendChild(button);
    });
})();

