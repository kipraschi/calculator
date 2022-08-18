//OPERATIONS
function add(numbers) {
	return numbers[0] + numbers[1];
}
function subtract(numbers) {
	return numbers[0] - numbers[1];
}
function multiply(numbers) {
	return numbers[0] * numbers[1];
}
function divide(numbers) {
	return round(numbers[0] / numbers[1], 10);
}
function round(number, maxPrecision) {
	return parseFloat(
		Math.round(number + "e" + maxPrecision) + "e-" + maxPrecision
	);
}
function calculate(firstNumber, operator, secondNumber) {
	switch (operator) {
		case "/":
			return secondNumber === 0
				? (alert("Can't do that!"), clear())
				: divide([firstNumber, secondNumber]);
			break;
		case "×":
			return multiply([firstNumber, secondNumber]);
			break;
		case "-":
			return subtract([firstNumber, secondNumber]);
			break;
		case "+":
			return add([firstNumber, secondNumber]);
			break;
	}
}
// +/- BUTTON

//NEED TO MAKE THIS SUPPORT DOUBLE-DIGIT NUMBERS;
let answer = null;
let entry = new Array();

// let negativeToggle = document.getElementById("tog");
// negativeToggle.addEventListener("click", () => {
//     let entryGrouped = entry.join("").split(/[/×+\-]/);
// 	let lastNumber = entryGrouped.pop();
// 	entry.splice(entry.indexOf(lastNumber) + 1, lastNumber.length);
// 	lastNumber *= -1;
// 	console.log(entry);
// 	console.log(entryGrouped);
// 	displayEntry(lastNumber);
// });

//CALCULATION
document.getElementById("calc").addEventListener("click", operate);

function operate() {
	let operators = [/[×/]/, /[+\-]/];
	let entryGrouped = entry.join("").split(/([/×+\-])/);
	console.log(`Array: ${entryGrouped.length}`);

	for (let j = 0; j < operators.length; j++) {
		for (let i = 0; i < entryGrouped.length; i++) {
			let firstNumber = /[×/+\-]/.test(entry[0]) ? answer : entryGrouped[i - 1];
			let element = entryGrouped[i];
			let secondNumber = entryGrouped[i + 1];
			console.log(`Array: ${entryGrouped} OpFirst? ${/[×/+-]/.test(entry[0])}`);
			if (operators[j].test(element)) {
				if (entryGrouped[i + 2] == "-") {
					secondNumber = entryGrouped[i + 3] * -1;
					entryGrouped.splice(i + 1, 2); //if the operator is follow by "-", the symbol is removed from the array
				}
				if (secondNumber === undefined) continue;
				console.log(
					`First no: ${firstNumber} Second no: ${secondNumber} Operator: ${element}`
				);
				answer = calculate(+firstNumber, element, +secondNumber);
				entryGrouped.splice(i - 1, 3, answer);
				i = 0;
				console.log(`Result of loop: ${answer}`);
			}
		}
	}
	displayResult(answer);
}

//DISPLAY
function displayEntry(char) {
	if (entry.length <= 20) {
		if (char != "") entry.push(char);
		document.getElementById("entry").textContent = entry.join("");
	} else document.getElementById("entry").textContent = "Number too long";
}

let isResultDisplayed = false;
function displayResult(result) {
	if (result.toString().length <= 12) {
		document.getElementById("result").textContent = result;
	} else {
		document.getElementById("result").textContent = "Error";
		setTimeout(() => {
			alert("Very long number you got there");
			clear();
		}, 100);
	}
	isResultDisplayed = true;
}

//BUTTON BEHAVIOR
let allButtons = document.getElementsByClassName("key");
Array.from(allButtons).forEach((button) => {
	button.addEventListener("click", () => {
		if (isResultDisplayed) {
			clearEntry();
			isResultDisplayed = false;
		}
		displayEntry(button.textContent);
	});
});

let dotButton = document.getElementById("dot");
let opButtons = document.getElementsByClassName("key op");
let numButtons = document.getElementsByClassName("key num");
let clearButton = document.getElementById("clear");

dotButton.addEventListener("click", () => (dotButton.disabled = true));
enableButton(dotButton, opButtons);

Array.from(opButtons).forEach((button) => {
	button.addEventListener("click", () => {
		Array.from(opButtons).forEach((button) => {
			button.disabled = true;
		});
		button.style.backgroundColor = "rgb(149, 124, 252)";
	});
});
enableButton(opButtons, numButtons);

function enableButton(disabledButtons, enablers) {
	if (disabledButtons.length > 1) {
		Array.from(enablers).forEach((enabler) =>
			enabler.addEventListener("click", () =>
				Array.from(disabledButtons).forEach((button) => {
					button.disabled = false;
					button.style.backgroundColor = "";
				})
			)
		);
	} else {
		Array.from(enablers).forEach((enabler) =>
			enabler.addEventListener("click", () => {
				disabledButtons.disabled = false;
				disabledButtons.style.backgroundColor = "";
			})
		);
	}
}

//CLEAR
clearButton.addEventListener("click", clear);
function clear() {
	clearEntry();
	document.getElementById("result").textContent = "";
	answer = null;
	isResultDisplayed = false;
	displayResult(0);
	Array.from(allButtons).forEach((button) => {
		button.disabled = false;
		button.style.backgroundColor = "";
	});
	console.clear();
}

function clearEntry() {
	document.getElementById("entry").textContent = "";
	entry = [];
}

//DELETE
document.getElementById("delete").addEventListener("click", deleteEntry);
function deleteEntry() {
	if (isResultDisplayed) isResultDisplayed = false;
	entry.pop();
	displayEntry("");
}

//TEXT INPUT
// window.addEventListener('keydown', function(e){
//     const key = document.querySelector(`button[data-key="${e.key}"]`);
//     if(key.classList == "key op" || key.classList == "key num" || key.id == "dot"){
//         displayEntry(key.textContent);
//         console.log(key.classList);
//     }
// });
