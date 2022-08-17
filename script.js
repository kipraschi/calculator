//operations
function add(numbers) {
	return numbers.reduce((result, number) => (result += +number), 0);
}
function subtract(numbers) {
	return numbers.reduce((result, number) => (result -= +number));
}
function divide(numbers) {
	return parseFloat(
		numbers.reduce((result, number) => (result /= +number))
	).toFixed(4);
}
function multiply(numbers) {
	return numbers.reduce((result, number) => (result *= +number));
}

//display
let entry = [];
function displayEntry(char) {
	entry.push(char);
	document.getElementById("entry").textContent = entry.join("");
}

let allButtons = document.getElementsByClassName("key");
Array.from(allButtons).forEach((button) => {
	button.addEventListener("click", () => {
		if (isResultDisplayed) {
			clearEntry();
            if(button.className == "num")
            {
                answer = null;
                console.log(answer);
            }
			isResultDisplayed = false;
		}
		displayEntry(button.textContent);
	});
});

let isResultDisplayed = false;
function displayResult(result) {
	document.getElementById("result").textContent = result;
	isResultDisplayed = true;
}

//clear
document.getElementById("clear").addEventListener("click", clear);
function clear() {
	clearEntry();
	document.getElementById("result").textContent = "";
	answer = null;
}

function clearEntry() {
	document.getElementById("entry").textContent = "";
	entry = [];
}

//delete

//calculation
let answer = null;
document.getElementById("calc").addEventListener("click", operate);

function operate() {
	let operatorList = /[/×+\-]/;
    let prioritizedOperators = /[*/]/;
	let numbers = entry.join("").split(operatorList);
    // if entry contains * or /
    // make entrySorted that is a copy of entry 
    // but with the operator and numbers surrounded by it
    // entry[entry.indexOf(operator) - 1] and entry[entry.indexOf(operator) + 1]
    // moved to the front of the array

    let operators = entry.filter((symbol) => operatorList.test(symbol));
	// console.log(entry);
	// console.log(operators);
	// console.log(numbers);
	let pairIndex = 0;
	operators.forEach((operator) => {
		let firstNumber;
		answer === null
			? (firstNumber = numbers[pairIndex])
			: (firstNumber = answer);
		let secondNumber = numbers[pairIndex + 1];

        switch (operator) {
			case "/":
                (secondNumber == 0) ?
                alert("Can't do that!") :
				answer = divide([firstNumber, secondNumber]);
				break;
			case "×":
				answer = multiply([firstNumber, secondNumber]);
				break;
			case "-":
				answer = subtract([firstNumber, secondNumber]);
				break;
			case "+":
				answer = add([firstNumber, secondNumber]);
				break;
		}

		pairIndex++;
		console.log(
			`First: ${firstNumber} Second: ${secondNumber} Operator: ${operator} Result: ${answer}`
		);
	});
	displayResult(answer);
}
