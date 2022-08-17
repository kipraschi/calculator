//operations
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
	return parseFloat(Math.round(number + "e" + maxPrecision) + "e-" + maxPrecision);
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

//calculation
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

//display
let entry = [];
function displayEntry(char) {
    if(entry.length <= 20){
        entry.push(char);
        document.getElementById("entry").textContent = entry.join("");
    }
	else document.getElementById("entry").textContent = "Error";
}

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

let isResultDisplayed = false;
function displayResult(result) {
    if(result.toString().length <= 10){
        document.getElementById("result").textContent = result;
    }
	else document.getElementById("result").textContent = "Error";
	isResultDisplayed = true;
}

//clear
document.getElementById("clear").addEventListener("click", clear);
function clear() {
	clearEntry();
	document.getElementById("result").textContent = "";
	answer = null;
	isResultDisplayed = false;
}

function clearEntry() {
	document.getElementById("entry").textContent = "";
	entry = [];
}

//delete
