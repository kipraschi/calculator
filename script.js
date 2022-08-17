//OPERATIONS
function add(numbers) {
	return numbers.reduce((result, number) => (result += +number), 0);
}
function subtract(numbers) {
	return numbers.reduce((result, number) => (result -= +number));
}
function multiply(numbers) {
	return numbers[0] * numbers[1];
	// return numbers.reduce((result, number) => (result *= +number));
}
function divide(numbers) {
	return round(
		// numbers.reduce((result, number) => (result /= +number)),
		numbers[0] / numbers[1],
		10
	);
}
function round(number, maxPrecision) {
	return parseFloat(
		Math.round(number + "e" + maxPrecision) + "e-" + maxPrecision
	);
}
function calculate(firstNumber, operator, secondNumber) {
	switch (operator) {
		case "/":
			return secondNumber == 0
				? alert("Can't do that!")
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

//CALCULATION
let answer = null;
document.getElementById("calc").addEventListener("click", operate);

function operate() {
	let operators = [/[×/]/, /[+\-]/];
	let entryGrouped = entry.join("").split(/([/×+\-])/);

	for (let j = 0; j < operators.length; j++) {
		for (let i = 0; i < entryGrouped.length; i++) {
			let firstNumber = answer === null ? entryGrouped[i - 1] : answer;
			let element = entryGrouped[i];
			let secondNumber = entryGrouped[i + 1];
			console.log(`Array: ${entryGrouped}`);
			if (operators[j].test(element)) {
				answer = calculate(firstNumber, element, secondNumber);
				entryGrouped.splice(i - 1, 3, answer);
				i = 0;
				console.log(`Result of loop: ${answer}`);
			}
		}
	}
	displayResult(answer);
}

//DISPLAY
let entry = [];
function displayEntry(char) {
	if (entry.length <= 20) {
		entry.push(char);
		document.getElementById("entry").textContent = entry.join("");
	} else document.getElementById("entry").textContent = "Error";
}

let isResultDisplayed = false;
function displayResult(result) {
	if (result.toString().length <= 10) {
		document.getElementById("result").textContent = result;
	} else document.getElementById("result").textContent = "Error";
	isResultDisplayed = true;
}

//BUTTON BEHAVIOR
let allButtons = document.getElementsByClassName("key");
Array.from(allButtons).forEach((button) => {
	button.addEventListener("click", () => {
		if (isResultDisplayed) {
			clearEntry();
			if (button.classList[1] == "num") answer = null;
			isResultDisplayed = false;
		}
		displayEntry(button.textContent);
	});
});

//disable dot button
let dotButton = document.getElementById("dot");
let opButtons = document.getElementsByClassName("key op");
let numButtons = document.getElementsByClassName("key num");

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
        console.log("disabling the one fucker");
		Array.from(enablers).forEach((enabler) =>
			enabler.addEventListener(
				"click",
				() => (disabledButtons.disabled = false)
			)
		);
	}
}

//CLEAR
document.getElementById("clear").addEventListener("click", clear);
function clear() {
	clearEntry();
	document.getElementById("result").textContent = "";
	answer = null;
	isResultDisplayed = false;
	Array.from(allButtons).forEach((button) => (button.disabled = false));
}

function clearEntry() {
	document.getElementById("entry").textContent = "";
	entry = [];
}

//DELETE
document.getElementById("delete").addEventListener("click", clear);

