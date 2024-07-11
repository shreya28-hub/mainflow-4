const calculatorScreen = document.getElementById('calculator-screen');
const calculatorKeys = document.querySelector('.calculator-keys');

let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;

calculatorKeys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) return;

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        return;
    }

    if (target.classList.contains('all-clear')) {
        clearCalculator();
        return;
    }

    if (target.classList.contains('equal-sign')) {
        evaluate();
        return;
    }

    inputNumber(target.value);
});

function clearCalculator() {
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
    calculatorScreen.value = '';
}

function handleOperator(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = calculatorScreen.value;
    currentOperation = operator;
    shouldResetScreen = true;
}

function inputNumber(number) {
    if (calculatorScreen.value === '0' || shouldResetScreen) {
        calculatorScreen.value = number;
        shouldResetScreen = false;
    } else {
        calculatorScreen.value += number;
    }
}

function evaluate() {
    if (currentOperation === null) return;
    if (shouldResetScreen) return;

    secondOperand = calculatorScreen.value;
    calculatorScreen.value = operate(firstOperand, secondOperand, currentOperation);
    currentOperation = null;
}

function operate(first, second, operator) {
    const firstNumber = parseFloat(first);
    const secondNumber = parseFloat(second);

    switch (operator) {
        case '+':
            return firstNumber + secondNumber;
        case '-':
            return firstNumber - secondNumber;
        case '*':
            return firstNumber * secondNumber;
        case '/':
            return firstNumber / secondNumber;
        default:
            return null;
    }
}